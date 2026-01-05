import express from 'express';
import tasksRouter from './routes/tasksRouter.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Cách lấy đường dẫn tuyệt đối chuẩn nhất trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", tasksRouter);

if (process.env.NODE_ENV === 'production') {
    // Giải thích: Từ backend/src đi ngược ra 2 cấp sẽ tới gốc TodoX
    const frontendPath = path.join(__dirname, "..", "..", "frontend", "vite-project", "dist");
    
    app.use(express.static(frontendPath));
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});