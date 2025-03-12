import { issueJWT } from "../../../configs/JWT/JWTServices.js";
import { sendMail } from "../../../configs/Email/SendEmail.js";
import { User } from "../../../Models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// custom error handler
const handleErrors = (err) => {
    let errors = { emailId: '', password: '', uname: '' };

    // email not unique error
    if (err.code === 11000) {
        if (err.message.includes('uname'))
            errors.uname = 'The user name is aldeardy in use';
        if (err.message.includes('emailId'))
            errors.emailId = "The email id is aldready in use "
        return errors;
    }
    // validation stuff
    else if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// POST /api/user/signup
export const SignupAuthController = async (req, res) => {
    // console.log(req.body) *Perfectly the data is reaching*
    const { emailId, password, uname } = req.body;

    try {
        if (req.body.password === req.body.againPassword) {
            const user = await User.create({ emailId, password, uname });
            const subject = "Welcome to CredPass!!"
            sendMail(emailId, subject, " ", "Welcome", uname)
            res.status(201).json({ success: true, user: user })
        }
        else {
            res.status(400).send('Passwords Not matched!!')
        }
    } catch (err) {
        const errors = handleErrors(err);
        console.log(err)
        res.status(400).json({ success: false, errors });
    }
}

// GET /api/user/signup
export const SignupController = (req, res) => {
    res.status(201).json({ suecess: true, msg: "Hi from signup Route!" })
}

export const LoginController = (req, res) => {
    res.status(200).json({ status: true, msg: "Hi There I am from Login controller!!" })
}

//POST /api/user/login
export const LoginVerifyController = async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId })
        if (!user) {
            return res.status(201).json({ success: false, msg: "could not find user" });
        }
       
        const isValid = await bcrypt.compare(req.body.password, user.password)

        if (isValid && user) {
            if (user.two_fa_status === false) {
                const tokenObject = await issueJWT(user.uname); //from utils
                res.status(202).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, totpStatus: user.two_fa_status, superUser: user.uname });
            }
            else {
                res.status(200).json({ success: "partial", msg: "Token will be generated once the totp step is completed", totpStatus: true, superUser: user.uname })
            }

        } else {
            res.status(200).json({ success: false, msg: "you entered the wrong password" });
        }
    }
    catch (err) {
        console.error('An error occurred:', err.stack);
        res.status(404).json({ sucess: false, msg: err.message })
    }
}

// POST /api/user/only-password
export const aldreadySigninPasswordVerifier = async (req, res) => {

    try {
        const user = await User.findOne({ uname: req.user.sub })

        if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }
        const isValid = await bcrypt.compare(req.body.password, user.password)

        if (isValid && user) {
            res.status(200).json({ success: true, msg: "successfully verified!!" });
        } else {
            res.status(202).json({ success: false, msg: "you entered the wrong password" });
        }
    }
    catch (err) {
        res.status(404).json({ sucess: false, msg: err.message })
    }
}

// GET /api/user/logout
export const logout = (req, res) => {
    res.status(202).clearCookie('Authentication').json({ success: true, msg: "cookies cleared" })
}
