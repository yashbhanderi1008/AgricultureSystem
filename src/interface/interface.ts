import { Types, Document } from "mongoose";
import { Request } from "express";
import { GeoJSON } from "geojson";

export interface FarmerInterface extends Document {
    _id?: Types.ObjectId
    name: string
    email: string
    password: string
    phoneNumber: string
    address: string
    role: string
}

export interface FarmInterface extends Document {
    _id?: Types.ObjectId
    name: string
    location: GeoJSON
    size: number
    farmerId: Types.ObjectId
}

export interface CropInterface extends Document {
    _id?: Types.ObjectId
    name: string
    type: string
    plantingDate: Date
    expectedHarvestDate: Date
    farmId: Types.ObjectId
}

export interface HarvestReportInterface extends Document {
    _id?: Types.ObjectId
    cropId: Types.ObjectId
    harvestDate: Date
    yield: number
    quality: number
    notes: string
}

export interface IrrigationScheduleInterface extends Document {
    _id?: Types.ObjectId
    cropId: Types.ObjectId
    startTime: Date
    endTime: Date
    waterAmount: number
    frequency: string
}

export interface CustomRequest extends Request {
    user?: FarmerInterface
    farm?: FarmInterface
    crop?: CropInterface
}