import { Types, Document } from "mongoose";
import { Request } from "express";
import { GeoJSON } from "geojson";

export interface FarmerInterface extends Document{
    _id?: Types.ObjectId
    name: string
    email: string
    password: string
    phoneNumber: string
    address: string
    role: string
}

export interface FarmInterface  extends Document{
    id: Types.ObjectId
    name: string
    location: GeoJSON
    size: number
    farmerId: Types.ObjectId
}

export interface CropInterface extends Document{
    id: Types.ObjectId
    name: string
    type: string
    plantingDate: Date
    expectedHarvestDate: Date
    farmId: Types.ObjectId
}

export interface WeatherDataInterface extends Document{
    id: Types.ObjectId
    farmId: Types.ObjectId
    date: Date
    temprature: number
    humidity: number
    precipitation: number
    windSpeed: number
}

export interface HarvestReportInterface extends Document{
    id: Types.ObjectId
    cropId: Types.ObjectId
    harvestDate: Date
    yield: number
    quality: number
    notes: string
}

export interface IrrigationScheduleInterface extends Document{
    id: Types.ObjectId
    cropId: Types.ObjectId
    startTime: Date
    endTime: Date
    waterAmount: number
    frequency: string
}

export interface SoilTestInterface extends Document{
    id: Types.ObjectId
    cropId: Types.ObjectId
    testDate: Date
    pHlevel: number
    nitrogenContent: number
    phosphorusContent: number
    potassiumContent: number
}

export interface CustomRequest extends Request{
    user: FarmerInterface
}