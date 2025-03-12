import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import { authentication, toptCheck } from "./src/middlewares/authentication.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
//app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cors({ origin: "https://pm4.netlify.app", credentials: true }));
//app.use(cors())
 //app.use(cors({ origin: '*' }));

app.options('*', cors({ origin: "https://pm4.netlify.app", credentials: true }));

mongoose.set("strictQuery", false);
//mongoose.connect("mongodb://localhost:27017/pm4", { useNewUrlParser: true })
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => { console.log("DB connected!!") })
  .catch(() => { console.log("Check DB connection!!") })

import UserAuthRoutes from "./src/routes/User/UserAuthRoutes.js"
import VaultRoutes from "./src/routes/Vault/VaultRoutes.js"

app.get('/', (req, res) => {
  res.send("Hello From Server!!")
})

// ====User Routes====
app.use('/api/user', UserAuthRoutes)

// ====Vault Routes ====
app.use('/api', authentication, toptCheck, VaultRoutes)

app.listen(port, () => {
  console.log(`Runnning on port ${port}`);
})
