import jsonwebtoken from "jsonwebtoken"
import { User } from "../../Models/user.js"
import dotenv from "dotenv"
dotenv.config()

export const issueJWT = async (uname) => {
    const user = await User.findOne({ uname: uname });
    const mfa_status = user.two_fa_status;
    const payload = {
        sub: uname,
        mfa_status,
    };
    const secret = Buffer.from(process.env.JWT_ACCESS_PRV, 'base64').toString('ascii')
    const options = {
        expiresIn: process.env.JWT_ACCESS_EXP,
        algorithm: 'RS256'
    }
    const token = jsonwebtoken.sign(payload, secret, options);
    return {
        token: "Bearer " + token,
        expires: process.env.JWT_ACCESS_EXP
    }
}