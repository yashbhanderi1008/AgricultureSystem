import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/db/connection";
import farmerRoute from "./src/route/farmerRoute";

dotenv.config();
const app = express();
app.use(express.json());
connectDb();

app.use('/farmer', farmerRoute);

app.listen(process.env.PORT, () => {
    console.log("server is runnig on port no. 3000");
})
