import { Site } from "../../../Models/site.js";
import { decrypt } from "../../../configs/EncryptionHandler.js"

// GET /api/export-vault-data
export const exportData = async (req, res) => {
    try {
        const data = await Site.find({ user: req.user.sub })
        const extractedData = data.map(obj => {
            return {
                site_name: obj.siteUrl,
                user_name: obj.uname,
                password: decrypt(obj.password),
            };
        })

        const finalData = JSON.stringify(extractedData, null, 2);
        res.status(200).send(finalData);
    } catch (err) {
        res.status(404).json({ "success": false, "message": "An Error occurred!" })
    }
}