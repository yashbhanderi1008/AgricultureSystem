import { Request, Response } from "express";
import { IrrigationScheduleService } from "../service/irrigationScheduleService";
import { Types } from "mongoose";
import { CropInterface, CustomRequest } from "../interface/interface";

export class IrrigationScheduleController {
    static async newIrrigationSchedule(req: Request, res: Response): Promise<void> {
        try {
            const schedule = req.body;
            const crop: CropInterface | undefined = (req as CustomRequest).crop;
            const cropId = new Types.ObjectId(crop?._id)

            if (crop) {
                await IrrigationScheduleService.newIrrigationSchedule(schedule, crop, cropId);
            }

            res.status(201).json({ message: "Irrigation schedule created successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateIrrigationSchedule(req: Request, res: Response): Promise<void> {
        try {
            const schedule = req.body;
            const irrigationScheduleId = new Types.ObjectId(req.params.id);
            const crop: CropInterface | undefined = (req as CustomRequest).crop;

            if(crop){
                await IrrigationScheduleService.updateIrrigationSchedule(irrigationScheduleId, schedule, crop);
            }

            res.status(200).json({ message: "Irrigation schedule updated successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteIrrigationSchedule(req: Request, res: Response): Promise<void> {
        try {
            const irrigationScheduleId = new Types.ObjectId(req.params.id);

            await IrrigationScheduleService.deleteIrrigationSchedule(irrigationScheduleId);

            res.status(200).json({ message: "Irrigation schedule deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}