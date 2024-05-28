import mongoose, { Schema, Types } from "mongoose";
import { FarmInterface } from "../interface/interface";

const farmSchema = new mongoose.Schema<FarmInterface>({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            unique: true
        },
    },
    size: {
        type: Number,
        required: true
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    }
});

const Farm = mongoose.model<FarmInterface>('Farm', farmSchema);

export default Farm;