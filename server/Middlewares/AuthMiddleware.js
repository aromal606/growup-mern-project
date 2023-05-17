import {userModel} from '../Models/userModel'
import {Jwt} from 'jsonwebtoken'
module.exports.checkUser = (req, res, next) => {
    // console.log('chechuser == ')
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,async(err,decodedToken)=>{
            if(err){
                res.json({status:false});
                next();
            }else{
                const user = await User.findById(decodedToken.id);
                if(user){
                    res.json({status:true,user:user})
                }else{
                    res.json({status:false})
                    next;
                }
            }
        })
    }else{
        res.json({status:false});
        next();
    }
}