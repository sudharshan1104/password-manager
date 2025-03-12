import { User } from "../../../Models/user.js";
import qrcode from "qrcode"
import { verifyTOTP, genSecret } from "../../../configs/2FAUtils.js";
import { issueJWT } from "../../../configs/JWT/JWTServices.js";

// GET /api/user/totp-show
export const toptShow = async (req, res) => {
    if (req._2fa === false) {
        try {
            const user = await User.findOne({ uname: req.user.sub })
            if (user.two_fa_status === false) {
                const { secret_32, secret_link } = genSecret(req.user.sub);
                qrcode.toDataURL(secret_link, (err, scan) => {
                    res.json({ scan: scan, code: secret_32 })
                })
            } else {
                res.json({ status: "enabled" })
            }
        } catch (err) {
            console.log(err)
        }
    } else {
        res.status(200).json({ success: true, msg: "Aldready Generated" })
    }
}

// GET /api/user/totp-status
export const toptStatus = async (req, res) => {
    // console.log(req._2fa)
    try {
        const user = await User.findOne({ uname: req.user.sub })
        if (user.two_fa_status === false) {
            res.status(200).json({ msg: "Disabled" })
        } else {
            res.status(200).json({ msg: "Enabled", base32: user.base32, qr: user.qrCode })
        }
    } catch (err) {
        console.log(err)
    }
}
// POST /api/user/totp-status-noauth
export const toptStatusNoauth = async (req, res) => {
    try {
        const user = await User.findOne({ uname: req.body.superUser })
        if (user.two_fa_status === false) {
            res.status(200).json({ msg: "Disabled" })
        } else {
            res.status(200).json({ msg: "Enabled", base32: user.base32, qr: user.qrCode })
        }
    } catch (err) {
        console.log(err)
    }
}

// POST /api/user/totp-verification
export const toptVerification = async (req, res) => {
    const { verified } = verifyTOTP(req.body.secret_32, req.body.code)
    if (verified === true) {
        await User.findOneAndUpdate({ uname: req.user.sub }, { two_fa_status: true });
    }
    res.send(verified)
}

// POST /api/user/totp-verification-noauth
export const toptVerificationNoAuth = async (req, res) => {
    const { verified } = verifyTOTP(req.body.secret_32, req.body.code)
    const { user } = req.body
    const u = await User.findOne({ uname: user });
    if (verified === true) {
        const tokenObject = await issueJWT(req.body.user); //from utils
        res.status(200).json({ success: true, msg: "Totp verified and token generated", token: tokenObject.token, expiresIn: tokenObject.expires, totpStatus: true, superUser: user, emailId: u.emailId });
    }
    else
        res.status(404).json({ success: false, msg: "Totp not verified!" })
}