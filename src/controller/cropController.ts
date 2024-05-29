import { Request, Response } from "express";
import { CropService } from "../service/cropService";
import { CustomRequest } from "../interface/interface";
import { Types } from "mongoose";

export class CropController {
    static async newCrop(req: Request, res: Response): Promise<void> {
        try {
            const crop = req.body;
            const farmId = (req as CustomRequest).farm?._id;

            if (farmId) {
                await CropService.addCropToFarm(crop, farmId);

                res.status(200).json({ message: "Crop added successfully" });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateCrop(req: Request, res: Response): Promise<void> {
        try {
            const crop = req.body;
            const farmId = (req as CustomRequest).farm?._id
            const cropId = new Types.ObjectId(req.params.cropId);

            if (farmId) {
                await CropService.updateCrop(crop, cropId, farmId)
            }

            res.status(200).json({ message: "Crop updated successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteCrop(req: Request, res: Response): Promise<void> {
        try {
            const cropId = new Types.ObjectId(req.params.cropId);
            const farmId = (req as CustomRequest).farm?._id;

            if(farmId){
                await CropService.deleteCrop(cropId, farmId);
            }

            res.status(200).json({ message: "Crop deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
