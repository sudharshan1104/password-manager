import mongoose from "mongoose"
import bcrypt from "bcrypt";
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema({

    emailId: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minlength: [6, 'Minimum lenght of password should be 6 characters']
    },
    regMobile: {
        type: Number
    },
    uname: {
        type: String,
        required: [true, 'Please enter a user name'],
        unique: true,
    },
    two_fa_status: {
        type: Boolean,
        default: false
    },
    qrCode: {
        type: String,
    },
    base32: {
        type: String
    }

}, { timestamps: true });

// If we use arrow function "this" is not accessible
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// it will look up for *"users"* collections
export const User = mongoose.model('User', userSchema);
