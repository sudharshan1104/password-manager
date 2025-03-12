import Cryptr from "cryptr"
import dotenv from "dotenv"
dotenv.config()

const key = process.env.CRYPTO_SECRET
const cryptr = new Cryptr(key);

export const encrypt = inputPassword => {

    return cryptr.encrypt(inputPassword);
}

export const decrypt = outputPassword => {

    return cryptr.decrypt(outputPassword);
}

