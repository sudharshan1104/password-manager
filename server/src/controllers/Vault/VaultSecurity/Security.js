import { encrypt, decrypt } from "../../../configs/EncryptionHandler.js"

// POST api/vault-decrypt-password
export const VaultDecrypt = (req, res) => {
    try {
        let password = req.body.siteObj.password;
        res.send(decrypt(password))
    } catch (err) {
        console.log(err)
    }
}

// POST api/vault-encrypt-password
export const VaultEncrypt = (req, res) => {
    try {
        let password = req.body.siteObj.password;
        res.send(encrypt(password))
    } catch (err) {
        console.log(err)
    }
}