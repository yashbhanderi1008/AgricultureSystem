import { Request, Response } from "express";
import { FarmerService } from "../service/farmerService";
import { CustomRequest } from "../interface/interface";
import { Types } from "mongoose";

export class FarmerController {
    static async newFarmer(req: Request, res: Response): Promise<void> {
        try {
            const farmer = req.body;

            await FarmerService.createFarmer(farmer);

            res.status(201).json({ message: "Farmer created successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }

    static async loginFarmer(req: Request, res: Response): Promise<void> {
        try {
            const loginCredential = req.body;

            const token = await FarmerService.login(loginCredential.email, loginCredential.password);

            res.status(200).json({ message: "Login Successful", data: token });
        } catch (error: any) {
            res.status(500).json({ message: "Login Failed" });
        }
    }

    static async updateFarmer(req: Request, res: Response): Promise<void> {
        try {
            const farmer = req.body;
            const farmerId = new Types.ObjectId((req as CustomRequest).user._id);

            await FarmerService.updateFarmer(farmer, farmerId);

            res.status(200).json({ message: "Farmer updated successfully" });
        } catch (error: any) {
            res.status(error.status).json({ message: error.message });
        }
    }

    static async deleteFarmer(req: Request, res: Response): Promise<void> {
        try {
            const farmerId = new Types.ObjectId((req as CustomRequest).user._id);

            await FarmerService.deleteFarmer(farmerId);

            res.status(200).json({ message: "Farmer deleted successfully" });
        } catch (error:any) {
            res.status(error.status).json({ message: error.message });
        }
    }
}