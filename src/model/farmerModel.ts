import mongoose, { Schema } from "mongoose";
import { FarmerInterface } from "../interface/interface";

const farmerSchema = new mongoose.Schema<FarmerInterface>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        validate: function (number: string) {
            return /^\d{10}$/.test(number);
        },
        message: "It is not a valid phone number"
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Farmer", "Admin"],
        default: "Farmer"
    }
})

const Farmer = mongoose.model<FarmerInterface>('Farmer', farmerSchema);

export default Farmer;