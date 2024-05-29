import express from 'express';
import { Middleware } from '../middleware/authentication';
import { IrrigationScheduleController } from '../controller/irrigationScheduleController';

const route = express.Router();

route.post('/:cropId/irrigationSchedule', Middleware.authorizeFarm, Middleware.isCrop, IrrigationScheduleController.newIrrigationSchedule);
route.put('/:cropId/irrigationSchedule/:id', Middleware.authorizeFarm, Middleware.isCrop, IrrigationScheduleController.updateIrrigationSchedule);
route.delete('/:cropId/irrigationSchedule/:id', Middleware.authorizeFarm, Middleware.isCrop, IrrigationScheduleController.deleteIrrigationSchedule);

export default route;