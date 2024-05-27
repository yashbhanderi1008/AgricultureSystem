import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}`+`${process.env.DB_NAME}`);
        console.log("Database connected");
    } catch (error: any) {
        process.exit(1);
    }
}

export default connectDb;