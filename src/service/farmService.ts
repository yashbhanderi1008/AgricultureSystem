import { Types } from "mongoose";
import { FarmInterface, FarmerInterface } from "../interface/interface";
import Farm from "../model/farmModel";
import jwt from "jsonwebtoken";

export class FarmService {
    static async newFarm(farm: FarmInterface, farmerId: Types.ObjectId): Promise<void> {
        const newFarm: FarmInterface = new Farm(farm);

        newFarm.farmerId = farmerId;

        await newFarm.save();
    }

    static async updateFarm(farmId: string, farm: FarmInterface, farmer: FarmerInterface): Promise<void> {
        const farms = await Farm.find({ farmerId: farmer._id });

        if (!farms.map(farm => farm._id?.toString()).includes(farmId) && farmer.role !== "Admin") {
            throw new Error("You are not allowed to update this Farm");
        } else {
            await Farm.findOneAndUpdate({ _id: farmId, farmerId: farmer._id }, farm);
        }
    }

    static async deleteFarm(farmId: string, farmer: FarmerInterface): Promise<void> {
        const farms = await Farm.find({ farmerId: farmer._id });

        if (!farms.map(farm => farm._id?.toString()).includes(farmId) && farmer.role !== "Admin") {
            throw new Error("You are not allowed to update this Farm");
        } else {
            const farm: FarmInterface | null = await Farm.findOne({ _id: farmId, farmerId: farmer._id });

            if (!farm) {
                throw new Error("Farm not found");
            } else {
                await farm.deleteOne();
            }
        }
    }

    static async allFarmsOfFarmer(farmerId: Types.ObjectId): Promise<string[]> {
        const farms = await Farm.find({ farmerId: farmerId });

        return farms.map(farm => farm.name)
    }

    static async accessFarm(farmId: Types.ObjectId, farmerId: Types.ObjectId): Promise<{ farmName: string, token: string }> {
        const farm: FarmInterface | null = await Farm.findOne({ _id: farmId, farmerId: farmerId });

        if (!farm) {
            throw new Error("Farm not found");
        }

        const token = jwt.sign({ farmId: farm._id, farmerId: farm.farmerId }, `${process.env.SECRET_KEY}`, { algorithm: 'HS256' });

        return { farmName: farm.name, token: token }
    }
}