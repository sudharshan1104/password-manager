import { User } from "../../../Models/user.js";


// PATCH /api/user/edit-user-info
export const editUser = async (req, res) => {
    const updates = req.body;
    const options = { new: true }

    try {
        const user = await User.findOneAndUpdate({ uname: req.user.sub }, updates, options)
        if (!user) throw err;
        res.status(200).send(user);
    } catch (err) {
        res.status(404).json({ "success": false, "msg": "No Record Found" })
    }
}
