import mongoose from "mongoose"

const userSchema = mongoose.Schema({

    // User Details

    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastLoggedIn: {
        type: Date,
        default: Date.now()
    },

    // Is Verified Or Not

    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiration: {
        type: Date,
    },

    //Reset Password

    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpiration: {
        type: Date,
    },
    resetPasswordOTP: {
        type: String,
    },
})

const User = mongoose.model('User', userSchema)
export default User