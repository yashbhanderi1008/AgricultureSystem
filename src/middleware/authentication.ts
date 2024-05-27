import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import Farmer from "../model/farmerModel";
import { CustomRequest } from "../interface/interface";

export class Middleware {
    static async authorizeUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token: string | undefined = req.header('Authorization');

            if (!token) {
                res.status(401).json({ message: "Token is not set in Request header" });
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
}