import { Site } from "../../../Models/site.js"
import { User } from "../../../Models/user.js"

// DELETE api/delete-all-vault
export const deleteFullVault = async (req, res) => {
    try {
        const resp = await Site.deleteMany({ user: req.user.sub })
        if (resp.deletedCount !== 0) {
            res.status(200).json({ success: true, msg: "All vault data deleted" })
        }
        else {
            res.status(200).json({ success: false, msg: "No Data Found in vault" })
        }
        if (!resp) throw err
    } catch (err) {
        res.status(400).json({ success: false, msg: "error occured" })
    }
}
// DELETE api/delete-account
export const deleteAccount = async (req, res) => {
    try {
        const resp = await User.deleteOne({ uname: req.user.sub })

        if (resp.deletedCount !== 0) {
            res.status(200).json({ success: true, msg: "User deleted" })
        }
        else {
            res.status(200).json({ success: false, msg: "No User Found!!" })
        }
        if (!resp) throw err
    } catch (err) {
        res.status(400).json({ success: false, msg: "error occured" })
    }
}