import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    }
})

adminSchema.statics.login = async function (email, password) {
    const admin = await this.findOne({email});
    if (admin) {
        const auth = password == admin.password
        console.log(auth);
        if (auth) {
            return admin;
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect Email")
}



export const adminModel = mongoose.model("admins", adminSchema)
