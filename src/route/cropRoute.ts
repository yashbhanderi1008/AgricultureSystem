import express from 'express';
import { Middleware } from '../middleware/authentication';
import { CropController } from '../controller/cropController';

const route = express.Router();

route.post('/crop', Middleware.authorizeFarm, CropController.newCrop);
route.put('/crop/:cropId', Middleware.authorizeFarm, CropController.updateCrop);
route.delete('/crop/:cropId', Middleware.authorizeFarm, CropController.deleteCrop);

export default route;