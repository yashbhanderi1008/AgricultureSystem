import { Types } from "mongoose";
import { CropInterface } from "../interface/interface";
import Crop from "../model/cropModel";

export class CropService {
    static async addCropToFarm(crop: CropInterface, farmId: Types.ObjectId): Promise<void> {
        if (new Date(crop.expectedHarvestDate) < new Date(crop.plantingDate)) {
            throw new Error('Expected harvest date cannot be before the planting date.');
        }

        const existingCrop = await Crop.findOne({
            name: crop.name,
            farmId,
            $or: [
                { plantingDate: { $lte: crop.expectedHarvestDate, $gte: crop.plantingDate } },
                { expectedHarvestDate: { $lte: crop.expectedHarvestDate, $gte: crop.plantingDate } },
                {
                    $and: [
                        { plantingDate: { $lte: crop.plantingDate } },
                        { expectedHarvestDate: { $gte: crop.expectedHarvestDate } }
                    ]
                }
            ]
        });

        // const existingCrop = await Crop.aggregate([
        //     {
        //         $match: {
        //             cropName: crop.cropName, // Properly referencing cropName
        //             farmId: new Types.ObjectId(farmId),
        //             $or: [
        //                 { plantingDate: { $lte: crop.expectedHarvestDate, $gte: crop.plantingDate } },
        //                 { expectedHarvestDate: { $lte: crop.expectedHarvestDate, $gte: crop.plantingDate } },
        //                 {
        //                     $and: [
        //                         { plantingDate: { $lte: crop.plantingDate } },
        //                         { expectedHarvestDate: { $gte: crop.expectedHarvestDate } }
        //                     ]
        //                 }
        //             ]
        //         }
        //     }
        // ]);

        if (existingCrop) {
            throw new Error("Crop with the same name already exists in the given period for this farm.''Crop with the same name already exists in the given period for this farm.");
        }

        const newcrop: CropInterface = new Crop(crop);

        newcrop.farmId = farmId;

        await newcrop.save();
    }

    static async updateCrop(crop: CropInterface, cropId: Types.ObjectId, farmId: Types.ObjectId): Promise<void> {
        if (new Date(crop.expectedHarvestDate) < new Date(crop.plantingDate)) {
            throw new Error('Expected harvest date cannot be before the planting date.');
        }

        const existingCrop = await Crop.findOne({
            _id: { $ne: cropId },
            name: crop.name,
            farmId,
            $or: [
                { plantingDate: { $lte: crop.expectedHarvestDate, $gte: crop.plantingDate } },
                { expectedHarvestDate: { $lte: crop.expectedHarvestDate, $gte: crop.plantingDate } },
                {
                    $and: [
                        { plantingDate: { $lte: crop.plantingDate } },
                        { expectedHarvestDate: { $gte: crop.expectedHarvestDate } }
                    ]
                }
            ]
        });

        if (existingCrop) {
            throw new Error("Crop with the same name already exists in the given period for this farm.''Crop with the same name already exists in the given period for this farm.");
        }

        await Crop.findOneAndUpdate({ _id: cropId, farmId: farmId }, crop);
    }

    static async deleteCrop(cropId: Types.ObjectId, farmId: Types.ObjectId): Promise<void> {
        const crop = await Crop.findOne({ _id: cropId, farmId: farmId });

        if (!crop) {
            throw new Error("Crop not found");
        } else {
            await crop.deleteOne();
        }
    }
}