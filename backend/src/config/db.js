import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MOGODB_CONNECTIONSTRINGS);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // đóng cổng database nếu kết nối thất bại
    }
};
        
export default connectDB;