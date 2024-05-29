import mongoose, { Schema } from "mongoose";
import { CropInterface } from "../interface/interface";

const cropSchema = new mongoose.Schema<CropInterface>({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Grain', 'Vagetable', 'Fruit']
    },
    plantingDate: {
        type: Date,
        required: true
    },
    expectedHarvestDate: {
        type: Date,
        required: true
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    }
})

const Crop = mongoose.model<CropInterface>('Crop', cropSchema);

export default Crop;