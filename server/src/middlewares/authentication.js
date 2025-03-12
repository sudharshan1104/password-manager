import jsonwebtoken from "jsonwebtoken"
import { User } from "../Models/user.js"
import dotenv from "dotenv"
dotenv.config()

export const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    const secret = Buffer.from(process.env.JWT_ACCESS_PUB, 'base64').toString(
        'ascii',
    );
    if (token) {
        jsonwebtoken.verify(token, secret, async (err, payload) => {
            if (err) return res.sendStatus(403)
            else {
                const user = await User.findOne({ uname: payload.sub })
                if (!user)
                    res.send(false)
                else
                    req.user = payload
                next();
            }
        })
    }
    else {
        res.send(false)
    }
}

export const toptCheck = async (req, res, next) => {
    try {
        const user = await User.findOne({ uname: req.user.sub })
        req._2fa = user.two_fa_status;
        next();
    } catch (err) {
        next();
    }
}
