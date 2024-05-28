import { Types } from "mongoose";
import { FarmerInterface } from "../interface/interface";
import Farmer from "../model/farmerModel";
import jwt from "jsonwebtoken";

export class FarmerService {
    static async createFarmer(farmer: FarmerInterface): Promise<void> {
        const newFarmer: FarmerInterface = new Farmer(farmer);
        await newFarmer.save();
    }

    static async login(email: string, password: string): Promise<string> {
        const farmer: FarmerInterface | null = await Farmer.findOne({ email: email, password: password });
        if (!farmer) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign({ id: farmer._id }, `${process.env.SECRET_KEY}`, { algorithm: 'HS256' });

        return token;
    }

    static async updateFarmer(farmer: FarmerInterface, farmerId: Types.ObjectId): Promise<void> {
        await Farmer.findByIdAndUpdate({ _id: farmerId }, farmer);
    }

    static async deleteFarmer(farmerId: Types.ObjectId): Promise<void> {
        const user: FarmerInterface | null = await Farmer.findById({ _id: farmerId });

        if (!user) {
            throw new Error("Farmer not found");
        } else {
            await user.deleteOne();
        }
    }
}