import User from "../models/Users.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookeies } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail } from "../mailtrap/email.config.js";
import crypto from "crypto";
import { verifyToken } from "../middlewares/verifyToken.js";


// Register new user    
export const register = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "User already exists. Please sign in with the same credentials.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user
        const newUser = new User({
            username,
            fullname,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiration: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            lastLoggedIn: Date.now(),
        });

        // Save the new user to the database
        await newUser.save();

        // Send verification email
        try {
            await sendVerificationEmail(newUser.email, verificationToken);
        } catch (emailError) {
            console.error("Error sending verification email:", emailError.message);
            return res.status(500).json({
                success: false,
                msg: "User registered, but failed to send verification email. Please try again later.",
            });
        }

        // Generate JWT and set cookies
        generateTokenAndSetCookeies(res, newUser._id);

        // Respond with success message
        res.status(200).json({
            success: true,
            msg: "User registered successfully. Please check your email for verification.",
        });
    } catch (error) {
        console.error("Server error during registration:", error.message);
        res.status(500).json({ success: false, msg: "Server error. Please try again later." });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user) {
            return res.status(400).json({ msg: "User Doesnot Exist. Please register." })
        } else if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Password. Please Try Again." })
        } else {
            user.lastLoggedIn = Date.now();
            generateTokenAndSetCookeies(res, user._id);
            await user.save();
            return res.status(200).json({ msg: "User loggedin Successfully" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something Went Wrong" })
    }
}

// Verify user's email address
export const verifyMail = async (req, res) => {
    try {
        // Log incoming body

        const { verificationToken } = req.body;

        // Check if the code exists and is not expired
        const user = await User.findOne({
            verificationToken: verificationToken,
            verificationTokenExpiration: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ msg: "Invalid or Expired Verification Code" });
        }

        // Update user status to verified
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiration = undefined;

        await user.save();

        // Send Welcome Email
        await sendWelcomeEmail(user.email, user.fullname, user.username);

        return res.status(200).json({ msg: "Email verified and welcome email sent" });
    } catch (error) {
        console.error("Error in verification:", error);
        return res.status(500).json({ msg: "Couldn't verify email" });
    }
};

// Logout user
export const logout = (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ msg: "Logged Out Successfully" });
}

//Forgot Password sent reset link
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist." });
        }

        //Generate Reset Token
        const resetToken = await crypto.randomBytes(24).toString("hex");;
        const resetPasswordExpiration = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiration = resetPasswordExpiration;

        await user.save();

        //Send Password Reset Email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URI}/resetPassword/${user.resetPasswordToken}`)

        return res.status(200).json({ "Reset Password Token Generated Successfully": true });

    } catch (error) {
        console.error("Error in generating reset password token", error);
    }
}

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { resetPasswordToken } = req.params;
        const { newPassword } = req.body;

        // Find user with the provided reset token and valid expiration
        const user = await User.findOne({ 
            resetPasswordToken, 
            resetPasswordTokenExpiration: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid or expired reset password token." });
        }

        // Hash the new password
        const saltRounds = 10;  
        const setNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update user's password and remove reset token fields
        user.password = setNewPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiration = undefined;

        await user.save();

        // Optionally, send a success email
        await sendPasswordResetSuccessEmail(user.email);

        // Respond with success
        return res.status(200).json({ msg: "Password Reset Successfully." });

    } catch (error) {
        console.error("Error in resetting password", error);
        return res.status(500).json({ msg: "Internal Server Error" }); // Ensure to send a response
    }
}
export const checkAuth = async (req, res) => {
    try {
        // Ensure req.userId is available
        if (!req.userId) {
            return res.status(401).json({ msg: "Unauthorized: User ID not found." });
        }

        // Fetch the user and convert it to a plain JS object
        const user = await User.findById(req.userId).lean();
        
        if (!user) {
            return res.status(404).json({ msg: "User Not Found." });
        }

        // Explicitly remove the password before sending the response
        const { password, ...userWithoutPassword } = user;

        // Return success and the user object without the password
        return res.status(200).json({
            success: true,
            msg: "User Found Successfully.",
            user: userWithoutPassword
        });

    } catch (error) {
        console.log("Error in Check Auth Module:", error.message); // Log the error message for better clarity
        return res.status(500).json({ msg: "Error in Check Auth Module", error: error.message });
    }
};
