import { Site } from "../../../Models/site.js"
import { encrypt } from "../../../configs/EncryptionHandler.js"

// GET api/vault-home
export const VaultGeneral = (req, res) => {
    res.status(201).json({ sucess: true, msg: "Hi There from Vault Home" });
}

// POST api/vault-create
export const VaultCreate = async (req, res) => {
    const { siteUrl, uname, password } = req.body;

    const encryptedPassword = encrypt(password);

    const site = new Site({
        siteUrl: siteUrl,
        uname: uname,
        password: encryptedPassword
        // iv : encryptedPassword.iv
    });
    try {
        await site.save();
        await Site.findOneAndUpdate({ siteUrl: siteUrl }, { user: req.user.sub })
        res.status(200).json({ sucess: true, msg: "Added" })
    } catch (err) {
        res.status(401).json({ sucess: false, msg: "An error Ocurred!" })
        console.log(err)
    }
}

// GET api/vault-home
export const VaultCreateIndex = (req, res) => {
    res.status(201).json({ sucess: true, msg: "From Create Vault Route" })
}

// GET api/vault-data
export const VaultSiteData = async (req, res) => {

    try {
        const sites = await Site.find({ user: req.user.sub });
        res.status(200).json({ success: true, sites: sites, user: req.user.sub })
    } catch (err) {
        res.status(404).json({ success: false, msg: "An error Occured" })
    }
}



// PATCH api/record-edit
export const recordEdit = async (req, res) => {
    const siteId = req.params.siteId;
    const updates = req.body;
    const options = { new: true };
    try {
        const site = await Site.findByIdAndUpdate(siteId, updates, options);
        if (!site) throw error;
        res.status(200).send(site);
    } catch (error) {
        res.status(404).json({ "success": false, "msg": "No Record Found" })
    }
}
// DELETE api/record-delete
export const recordDelete = async (req, res) => {
    const siteId = req.params.siteId;
    const date = new Date(Date.now() + 6.048e+8).toISOString();
    const updates = {
        expireAt: date,
        favorite: false,
        deleted: true
    }
    const site = await Site.findById(siteId);
    if (site) {
        if (site.deleted !== true) {
            try {
                const site = await Site.findByIdAndUpdate(siteId, updates, { new: true })
                if (!site) throw error;
                res.status(200).json({ "success": true, "msg": "record Will be deleted in 7 days" })
            } catch (error) {
                res.status(404).json({ "success": false, "msg": "Record Not Found!" })
            }
        }
        else {
            try {
                const site = await Site.findByIdAndDelete(siteId)
                if (!site) throw error;
                res.status(200).json({ "success": true, "msg": "record is permenatly deleted" })
            }
            catch (error) {
                res.status(404).json({ "success": false, "msg": "Record Not Found!" })
            }
        }
    }

}



