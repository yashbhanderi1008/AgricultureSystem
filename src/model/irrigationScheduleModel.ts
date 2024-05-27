import mongoose, { Schema } from "mongoose";
import { IrrigationScheduleInterface } from "../interface/interface";

const irrigationScheduleSchema = new mongoose.Schema<IrrigationScheduleInterface>({
    cropId: {
        type: Schema.Types.ObjectId,
        ref: 'Crop'
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    waterAmount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        required: true
    }
})

const IrrigationSchedule = mongoose.model('IrrigationSchedule', irrigationScheduleSchema);

export default IrrigationSchedule;