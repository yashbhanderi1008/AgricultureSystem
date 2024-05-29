import { Types } from "mongoose";
import { CropInterface, CustomRequest, IrrigationScheduleInterface } from "../interface/interface";
import IrrigationSchedule from "../model/irrigationScheduleModel";

export class IrrigationScheduleService {
    static async newIrrigationSchedule(irrigationSchedule: IrrigationScheduleInterface, crop: CropInterface, cropId: Types.ObjectId): Promise<void> {

        const plantingDate = new Date(crop.plantingDate);
        const expectedHarvestDate = new Date(crop.expectedHarvestDate);

        const startTime = new Date(irrigationSchedule.startTime);
        const endTime = new Date(irrigationSchedule.endTime);

        const isStartTimeValid = startTime >= plantingDate && startTime <= expectedHarvestDate;
        const isEndTimeValid = endTime >= plantingDate && endTime <= expectedHarvestDate;

        if (startTime >= endTime) {
            throw new Error("Start time must be before end time");
        } else if (!isStartTimeValid || !isEndTimeValid) {
            throw new Error("Start time and End time must be between the crop's planting date and expected harvest date");
        } else {
            const newIrrigationSchedule: IrrigationScheduleInterface = new IrrigationSchedule(irrigationSchedule);
            newIrrigationSchedule.cropId = new Types.ObjectId(crop._id);
            await newIrrigationSchedule.save();
        }
    }

    static async updateIrrigationSchedule(irrigationScheduleId: Types.ObjectId, irrigationSchedule: IrrigationScheduleInterface, crop: CropInterface): Promise<void> {
        const plantingDate = new Date(crop.plantingDate);
        const expectedHarvestDate = new Date(crop.expectedHarvestDate);

        const startTime = new Date(irrigationSchedule.startTime);
        const endTime = new Date(irrigationSchedule.endTime);

        const isStartTimeValid = startTime >= plantingDate && startTime <= expectedHarvestDate;
        const isEndTimeValid = endTime >= plantingDate && endTime <= expectedHarvestDate;

        if (startTime >= endTime) {
            throw new Error("Start time must be before end time");
        } else if (!isStartTimeValid || !isEndTimeValid) {
            throw new Error("Start time and End time must be between the crop's planting date and expected harvest date");
        } else {
            await IrrigationSchedule.findOneAndUpdate({ _id: irrigationScheduleId }, irrigationSchedule);
        }
    }

    static async deleteIrrigationSchedule(irrigationScheduleId: Types.ObjectId): Promise<void> {
        const schedule = await IrrigationSchedule.findById({ _id: irrigationScheduleId });

        if (!schedule) {
            throw new Error("Irrigation schedule not found");
        } else {
            await schedule.deleteOne();
        }
    }
}