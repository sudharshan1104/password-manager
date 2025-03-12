import mongoose from "mongoose"

const siteSchema = new mongoose.Schema({
    siteUrl: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    expireAt: {
        type: Date,
    },
    user: { type: mongoose.Schema.Types.String, ref: `User` }

}, { timestamps: true });
siteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
// it will loockup for *"sites"* collections
export const Site = mongoose.model('Site', siteSchema);
