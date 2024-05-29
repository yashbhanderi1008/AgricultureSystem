import express from 'express';
const route = express.Router();
import { FarmController } from '../controller/farmController';
import { Middleware } from '../middleware/authentication';

route.post('/addFarm', Middleware.authorizeUser, FarmController.newFarm);
route.put('/updateFarm/:farmId', Middleware.authorizeUser, FarmController.updateFarm);
route.delete('/deleteFarm/:farmId', Middleware.authorizeUser, FarmController.deleteFarm);
route.get('/allFarm', Middleware.authorizeUser, FarmController.farmList);
route.get('/accessFarm/:farmId', Middleware.authorizeUser, FarmController.accessFarm);

export default route;