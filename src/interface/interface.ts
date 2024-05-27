import { Types } from "mongoose";
import { Request } from "express";
import { GeoJSON } from "geojson";

export interface FarmerInterface {
    _id?: Types.ObjectId
    name: string
    email: string
    password: string
    phoneNumber: string
    address: string
    role: string
}

export interface FarmInterface {
    id: Types.ObjectId
    name: string
    location: GeoJSON
    size: number
    farmerId: Types.ObjectId
}

export interface CropInterface{
    id: Types.ObjectId
    name: string
    type: string
    plantingDate: Date
    expectedHarvestDate: Date
    farmId: Types.ObjectId
}

export interface WeatherDataInterface{
    id: Types.ObjectId
    farmId: Types.ObjectId
    date: Date
    temprature: number
    humidity: number
    precipitation: number
    windSpeed: number
}

export interface HarvestReportInterface{
    id: Types.ObjectId
    cropId: Types.ObjectId
    harvestDate: Date
    yield: number
    quality: number
    notes: string
}

export interface IrrigationScheduleInterface{
    id: Types.ObjectId
    cropId: Types.ObjectId
    startTime: Date
    endTime: Date
    waterAmount: number
    frequency: string
}

export interface SoilTestInterface{
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