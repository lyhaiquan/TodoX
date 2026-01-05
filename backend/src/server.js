import express from 'express';
import tasksRouter from './routes/tasksRouter.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5001;
// path.resolve() sẽ trỏ về thư mục gốc (TodoX) khi chạy lệnh từ ngoài
const __dirname = path.resolve();

const app = express();

app.use(express.json());

// Kiểm tra môi trường bằng process.env
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: "http://localhost:5173" }));
}

// Routes API
app.use("/api/tasks", tasksRouter);

// Cấu hình phục vụ Frontend trong môi trường Production
if (process.env.NODE_ENV === 'production') {
    // Đường dẫn đi từ gốc dự án TodoX vào thư mục dist của frontend
    const frontendPath = path.join(__dirname, "frontend", "vite-project", "dist");
    
    app.use(express.static(frontendPath));
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

// Kết nối Database và chạy Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});