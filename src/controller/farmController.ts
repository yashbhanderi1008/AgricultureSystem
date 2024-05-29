import { Request, Response } from "express";
import { FarmService } from "../service/farmService";
import { Types } from "mongoose";
import { CustomRequest } from "../interface/interface";

export class FarmController {
    static async newFarm(req: Request, res: Response): Promise<void> {
        try {
            const farm = req.body;
            const farmerId = new Types.ObjectId((req as CustomRequest).user?._id);

            await FarmService.newFarm(farm, farmerId);

            res.status(200).json({ message: "Farm listed successfully" });
        } catch (error: any) {
            res.status(error.status).json({ message: error.message });
        }
    }

    static async updateFarm(req: Request, res: Response): Promise<void> {
        try {
            const farmId = req.params.farmId;
            const farm = req.body;
            const farmer = (req as CustomRequest).user;

            if (farmId && farm && farmer) {
                await FarmService.updateFarm(farmId, farm, farmer);
            }

            res.status(200).json({ message: "Farm updated successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteFarm(req: Request, res: Response): Promise<void> {
        try {
            const farmId = req.params.farmId;
            const farmer = (req as CustomRequest).user;

            if (farmId && farmer) {
                await FarmService.deleteFarm(farmId, farmer);
            }

            res.status(204).json({ message: "Farm deleted successfully" });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    static async farmList(req: Request, res: Response): Promise<void> {
        try {
            const farmerId = (req as CustomRequest).user?._id;

            if (farmerId) {
                const farms = await FarmService.allFarmsOfFarmer(farmerId);

                res.status(200).json({ data: farms })
            }
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    static async accessFarm(req: Request, res: Response): Promise<void> {
        try {
            const farmerId = (req as CustomRequest).user?._id;
            const farmId = new Types.ObjectId(req.params.farmId);

            if (farmerId && farmId) {
                const farm = await FarmService.accessFarm(farmId, farmerId);

                res.status(200).json({ data: farm.token, message: `You can acces now your Farm ${farm.farmName}` });
            }

        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }
}