import { userModel } from '../Models/userModel.js'
import { postModel } from '../Models/PostModel.js'
import { adminModel } from '../Models/adminModel.js'
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jwt from "jsonwebtoken";
import { ReportModel } from '../Models/reportModel.js';
import dotenv from 'dotenv'
dotenv.config()

const bucketName = process.env.VITE_BUCKET_NAME
const bucketRegion = process.env.VITE_BUCKET_REGION
const accessKey = process.env.VITE_ACCESS_KEY
const secretAccessKey = process.env.VITE_SECRET_ACCESS_KEY


const maxAge = 3600
const createToken = (id) => {
    return jwt.sign({ id }, "jwtsecretkey", {
        expiresIn: maxAge
    })
}


const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.login(email, password);
        const token = createToken(admin._id);
        res.cookie("adminjwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 100
        })
        res.status(200).json({ admin, token });
    } catch (err) {
        if (err.message === "Incorrect password") {
            res.status(201).json({ message: "Incorrect password" });
        } else {
            res.status(201).json({ message: "Incorrect email" });
        }
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const data = await userModel.find({})
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: data[i].imageName,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
            data[i].imageName = url;
        }
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUserStatus = async (req, res, next) => {
    try {
        const data = await userModel.findById(req.params.id)
        res.send(data)
    } catch (error) {
        res.send(error)
    }

}

export const getReportedPosts = async (req, res, next) => {
    try {
        const data = await ReportModel.find({}).sort({ _id: -1 });
        if (data) {
            const updatedData = [];
            for (let i = 0; i < data.length; i++) {
                const postId = data[i].postId;
                const postData = await postModel.findById(postId);
                const status=postData.status
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: postData.imageName,
                };
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
                
                const updatedObject = {
                    ...data[i],
                    imageName: url,
                    status:status,
                };
                updatedData.push(updatedObject);
            }

            res.status(200).send(updatedData);
        }
    } catch (error) {
        console.log(error);
        // res.status(500).send(error)
    }
};

export const getPostStatus=async(req,res,next)=>{
    console.log("hii");
    try {
        const response = await postModel.find({});
        // const response = await postModel.find({ status: { $nin: ["Active", "Unblock"] } });
        console.log(response,"222");
        res.send(response)
    } catch (error) {
        console.log(error);
    }
}


export const blockAUser = async (req, res, next) => {
    try {
        if (req.body.userId) {
            const user = await userModel.findById(req.body.userId)
            if (user.status == "Block") {
                await userModel.updateOne({ _id: req.body.userId }, { $set: { status: "Active" } })
                res.status(200).send({ id: req.body.userId })
            } else {
                await userModel.updateOne({ _id: req.body.userId }, { $set: { status: "Block" } })
                res.status(200).send({ id: req.body.userId })
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


export const blockAPost = async (req, res, next) => {
    try {
        if (req.body.id) {
            const post = await postModel.findById(req.body.id)
            if (post.status == "Block") {
                await postModel.updateOne({ _id: req.body.id }, { $set: { status: "Unblock" } })
                res.status(200).send({ id: req.body.id,status:"unblocked" })
            } else {
                await postModel.updateOne({ _id: req.body.id }, { $set: { status: "Block" } })
                res.status(200).send({ id: req.body.id, status:"blocked" })
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const dailyPost = async (req, res) => {
    try {
        postModel.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ])
            .then(result => {
                const formattedResult = result.map(item => {
                    return {
                        date: item._id,
                        count: item.count,
                    };
                });
                res.status(200).send(formattedResult);
            })
            .catch(error => {
                res.status(500).send({ error: 'Failed to get posts count' });
            });
    } catch (error) {
        res.status(500).send({ error: 'Failed to get posts count' });
    }
}

export const monthlyPost = async (req, res) => {

    try {
        postModel.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ])
            .then(result => {
                const formattedResult = result.map(item => {
                    return {
                        date: item._id,
                        count: item.count,
                    };
                });
                res.status(200).send(formattedResult);
            })
            .catch(error => {
                res.status(500).send({ error: 'Failed to get posts count' });
            });
    } catch (error) {
        res.status(500).send({ error: 'Failed to get posts count' });
    }
}

export const yearlyPost = async (req, res) => {

    try {
        postModel.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y', date: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ])
            .then(result => {
                const formattedResult = result.map(item => {
                    return {
                        date: item._id,
                        count: item.count,
                    };
                });
                res.status(200).send(formattedResult);
            })
            .catch(error => {
                res.status(500).send({ error: 'Failed to get posts count' });
            });
    } catch (error) {
        res.status(500).send({ error: 'Failed to get posts count' });
    }
}

export const countAllPost = async (req, res) => {

    try {
        const data = await postModel.find({})
        const count = data.length
        res.status(200).send({ count: count });
    } catch (error) {
        res.status(200).send(error);
    }
}

export const countAllUsers = async (req, res) => {

    try {
        const data = await userModel.find({})
        const count = data.length
        res.status(200).send({ count: count });
    } catch (error) {
        res.status(200).send(error);
    }
}


