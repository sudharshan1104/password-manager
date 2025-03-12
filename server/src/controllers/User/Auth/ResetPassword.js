import { User } from "../../../Models/user.js";
import { sendMail } from "../../../configs/Email/SendEmail.js";
import { passwordResetLink } from "../../../configs/PasswordResetLink.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

// POST /api/user/reset-password-email
export const resetPasswordEmail = async (req, res) => {
    const { emailId } = req.body;
    // send link via email
    try {
        const user = await User.findOne({ emailId: emailId })
        if (!user)
            res.status(404).json({ success: false, msg: "User not Found!!" })
        else {
            const url = passwordResetLink(emailId);
            const subject = "Password reset from CredPass"
            const type = "Password Reset"
            const usr = user.uname;
            sendMail(emailId, subject, url, type, usr)
            res.status(200).json({ success: true, msg: "Message sent!!" })
        }
    } catch (err) {
        res.status(404).json({ success: false, msg: "An error occured" })
    }
}

// PATCH /api/user/reset-password/:id/:token
export const resetPassword = async (req, res) => {
    const { token, emailId } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
        res.status(200).json({ success: false, msg: "Passwords Doesn't match" })

    const options = { new: true }

    const secret = process.env.EMAIL_JWT_SECRET

    jsonwebtoken.verify(token, secret, async (err, verifyResp) => {
        if (err) {
            res.status(403).json({ success: false, msg: "Token not verified!" });
        }
        else if (verifyResp) {
            try {
                const user = await User.findOneAndUpdate({ emailId: emailId }, { password: password }, options)
                user.save()
                res.status(200).json({ success: true, msg: "password changed" })
            }
            catch (err) {
                res.status(404).json({ success: false, msg: "Unsuccesful" });
            }
        }
    });

}

//GET /api/user/reset-password-check-link/:token
export const reserPasswordCheckLink = (req, res) => {
    const { token } = req.params;
    const secret = process.env.EMAIL_JWT_SECRET

    jsonwebtoken.verify(token, secret, async (err, payload) => {
        if (err) {
            res.status(204).json({ success: false, msg: "Token Expired!" });
        }
        else {
            const user = await User.findOne({ emailId: payload.sub })
            if (!user)
                res.status(200).json({ success: false, msg: "No User" })
            else
                res.status(200).json({ success: true, msg: "Token Verified!" })
        }
    });
}

// PATCH /api/user/reset-password-settings/
export const resetPasswordSettings = async (req, res) => {
    const { password } = req.body;
    try {
        const user = await User.findOneAndUpdate({ uname: req.user.sub }, { password: password }, { new: true })
        user.save()
        res.status(200).json({ success: true, msg: "password changed" })
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ success: false, msg: "Unsuccesful" });
    }
}