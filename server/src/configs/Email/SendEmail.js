import nodemailer from "nodemailer"
import ejs from "ejs"
import { google } from "googleapis"
import dotenv from "dotenv"
dotenv.config()

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const prepareEmailPipeLine = async (recipent, subject, url, type, usr) => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    let view

    switch (type) {
      case "Password Reset":
        view = "ResetLink"
        break;
      case "Welcome":
        view = "Welcome"
        break;
    }

    const data = await ejs.renderFile(__dirname + `/templates/${view}.ejs`, { usr, url });


    const mailOptions = {
      from: process.env.EMAIL,
      to: recipent,
      subject: subject,
      html: data,
    }

    const result = await transporter.sendMail(mailOptions)
    return result;

  } catch (error) {
    return error
  }
}

export const sendMail = async (recipent, subject, url, type, usr) => {
  try {
    await prepareEmailPipeLine(recipent, subject, url, type, usr)
  }
  catch (error) {
    console.log(error)
    return error;
  }
}

