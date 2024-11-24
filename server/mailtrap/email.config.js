import { MailtrapClient } from "mailtrap";
import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./email.template.js";
import dotenv from 'dotenv';

dotenv.config();

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Furry Friend - Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        });

        console.log("Verification email sent successfully:", response);
    } catch (error) {
        console.error("Error In Sending Verification Email:", error.response?.data || error);
        throw new Error("Failed to send verification email");
    }
};

export const sendWelcomeEmail = async (email, fullname, username) => {
    const recipient = [{ email }];
    const template_uuid = process.env.MAILTRAP_WELCOME_TEMPLATE_ID; 

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: template_uuid,
            template_variables: {
                name: fullname,
                company_info_name: "Furry Friend",
                company_info_address: "Furry Friend, 50th Main Road, Kumarswamy Layout, Bengaluru",
                company_info_city: "Bengaluru, KA",
                company_info_zip_code: "560078",
                company_info_country: "India"
            }
        });

        console.log("Welcome email sent successfully:", response);
    } catch (error) {
        console.error("Error In Sending Welcome Email:", error.response?.data || error);
        throw new Error("Failed to send welcome email");
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Furry Friend - Reset Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        });

        console.log("Reset Password email sent successfully:", response);
    } catch (error) {
        console.error("Error In Sending Reset Password Email:", error.response?.data || error);
        throw new Error("Failed to send Reset Password email");
    }
}

export const sendPasswordResetSuccessEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Furry Friend - Reset Password",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        });

        console.log("Password Reset Successful:", response);
    } catch (error) {
        console.error("Error In Sending Reset Password Confirmation Email:", error.response?.data || error);
        throw new Error("Failed to send Reset Password Confirmation email");
    }
}