import speakeasy from "speakeasy"

export const genSecret = (user) => {
    let secret = speakeasy.generateSecret({
        name: `CredPass-${user}`,
        length: 16
    })

    return {
        secret_32: secret.base32,
        secret_link: secret.otpauth_url
    }
}

export const verifyTOTP = (secret, sixdigitCode) => {

    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: sixdigitCode
    })

    return {
        verified: verified
    }
}
