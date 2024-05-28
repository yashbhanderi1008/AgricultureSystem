import express from 'express';
import { FarmerController } from '../controller/farmerController';
import { Middleware } from '../middleware/authentication';
const route = express.Router();

route.post('/signUp', FarmerController.newFarmer);
route.post('/login', FarmerController.loginFarmer);
route.put('/update', Middleware.authorizeUser, FarmerController.updateFarmer);
route.delete('/delete', Middleware.authorizeUser, FarmerController.deleteFarmer);

export default route;