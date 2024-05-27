import mongoose, { Schema } from "mongoose";
import { WeatherDataInterface } from "../interface/interface";

const weatherDataSchema = new mongoose.Schema<WeatherDataInterface>({
    farmId: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    },
    date: {
        type: Date,
        required: true
    },
    temprature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    precipitation: {
        type: Number,
        required: true
    },
    windSpeed: {
        type: Number,
        required: true
    }
})

const weatherData = mongoose.model<WeatherDataInterface>('WeatherData', weatherDataSchema);

export default weatherData;