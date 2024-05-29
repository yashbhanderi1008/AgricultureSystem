import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/db/connection";
import farmerRoute from "./src/route/farmerRoute";
import farmRoute from "./src/route/farmRoute";
import cropRoute from "./src/route/cropRoute";
import IrrigationScheduleRoute from "./src/route/irrigationScheduleRoute";

dotenv.config();
const app = express();
app.use(express.json());
connectDb();

app.use('/farmer', farmerRoute);
app.use('/farm', farmRoute);
app.use('/farm', cropRoute);
app.use('/farm', IrrigationScheduleRoute);

app.listen(process.env.PORT, () => {
    console.log("server is runnig on port no. 3000");
})