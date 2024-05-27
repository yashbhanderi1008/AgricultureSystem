import express from 'express';
import { FarmerController } from '../controller/farmerController';
const route = express.Router();

route.post('/signUp', FarmerController.newFarmer);
route.post('/login', FarmerController.loginFarmer);

export default route;