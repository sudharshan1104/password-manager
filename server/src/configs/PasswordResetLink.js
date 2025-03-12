import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const passwordResetLink = (emailId) => {
    const seccret = process.env.EMAIL_JWT_SECRET
    const payload = {
        sub: emailId,
    }
    const options = {
        expiresIn: process.env.EMAIL_JWT_EXP
    }
    const token = jsonwebtoken.sign(payload, seccret, options);
    const link = `${process.env.CLIENT_URL}/reset-password/${emailId}/${token}`;
    return link
}
