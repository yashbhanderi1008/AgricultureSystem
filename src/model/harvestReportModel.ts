import mongoose, { Schema } from "mongoose";
import { HarvestReportInterface } from "../interface/interface";

const harvestReportSchema = new mongoose.Schema<HarvestReportInterface>({
    cropId: {
        type: Schema.Types.ObjectId,
        ref: 'Crop'
    },
    harvestDate: {
        type: Date,
        required: true
    },
    yield: {
        type: Number,
        required: true
    },
    quality: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
})

const HarvestReport = mongoose.model<HarvestReportInterface>('HarvestReport', harvestReportSchema);

export default HarvestReport;