import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import Farmer from "../model/farmerModel";
import { CustomRequest } from "../interface/interface";
import Farm from "../model/farmModel";
import Crop from "../model/cropModel";

export class Middleware {
    static async authorizeUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token: string | undefined = req.header('Authorization');

            if (!token) {
                res.status(401).json({ message: "Token Required" });
            } else {
                token = token.replace('Bearer ', '');

                const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`) as { id: Types.ObjectId };

                const user = await Farmer.findById(decodedToken.id);

                if (!user) {
                    res.status(401).json({ message: "Authorization Error" });
                } else {
                    (req as CustomRequest).user = user;
                }

                next();
            }
        } catch (error: any) {
            res.status(401).json({ message: "Invalid token" });
        }
    }

    static async authorizeFarm(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token: string | undefined = req.header('Authorization');

            if (!token) {
                res.status(401).json({ message: "Token Required" });
            } else {
                token = token.replace('Bearer ', '');

                const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`) as { farmId: Types.ObjectId, farmerId: Types.ObjectId };

                const farm = await Farm.findOne({ _id: decodedToken.farmId, farmerId: decodedToken.farmerId });

                if (!farm) {
                    res.status(401).json({ message: "Authorization Error" });
                } else {
                    (req as CustomRequest).farm = farm;
                }

                next();
            }
        } catch (error: any) {
            res.status(401).json({ message: "Invalid token" });
        }
    }

    static async isCrop(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const farm = (req as CustomRequest).farm;
            const cropId = req.params.cropId;
            const crop = await Crop.findOne({ _id: cropId, farmId: farm?._id })

            if (!crop) {
                res.status(404).json({ message: "Crop not found" });
            } else {
                (req as CustomRequest).crop = crop;
            }

            next();
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }
}