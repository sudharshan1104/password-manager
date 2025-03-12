import express from "express"
import { LoginController, LoginVerifyController, SignupController, SignupAuthController, aldreadySigninPasswordVerifier, toptStatus, toptShow, toptVerification, toptVerificationNoAuth, editUser, toptStatusNoauth, resetPassword, resetPasswordEmail, logout, reserPasswordCheckLink, resetPasswordSettings } from "../../controllers/index.js"
import { authentication, toptCheck } from "../../middlewares/authentication.js";


const router = express.Router();

router.get('/login', LoginController)
router.get('/register', SignupController)

router.post('/register', SignupAuthController)
router.post('/login', LoginVerifyController)
router.post('/reset-password-email', resetPasswordEmail)
router.patch('/reset-password/:emailId/:token', resetPassword)
router.patch('/reset-password-settings', authentication, toptCheck, resetPasswordSettings)
router.get('/reset-password-check-link/:token', reserPasswordCheckLink)

router.patch('/edit-user-info', authentication, toptCheck, editUser)

router.post('/only-password', authentication, toptCheck, aldreadySigninPasswordVerifier)
router.get('/totp-status', authentication, toptCheck, toptStatus)
router.post('/totp-status-noauth', toptStatusNoauth)
router.post('/totp-verification', authentication, toptCheck, toptVerification)
router.post('/totp-verification-noauth', toptVerificationNoAuth)
router.get('/totp-show', authentication, toptCheck, toptShow)

router.get('/logout', authentication, toptCheck, logout)
export default router;