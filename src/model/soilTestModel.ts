import mongoose, { Schema } from "mongoose";
import { SoilTestInterface } from "../interface/interface";

const soilTestSchema = new mongoose.Schema<SoilTestInterface>({
    cropId: {
        type: Schema.Types.ObjectId,
        ref: 'Crop'
    },
    testDate: {
        type: Date,
        required: true
    },
    pHlevel: {
        type: Number,
        required: true
    },
    nitrogenContent: {
        type: Number,
        required: true
    },
    phosphorusContent: {
        type: Number,
        required: true
    },
    potassiumContent: {
        type: Number,
        required: true
    }
});

const SoilTest = mongoose.model<SoilTestInterface>('SoilTest', soilTestSchema);

export default SoilTest;