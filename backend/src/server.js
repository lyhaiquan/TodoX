import express from 'express'
import tasksRouter from './routes/tasksRouter.js';
import connectDB from './config/db.js';
import dotevn from 'dotenv';
import cors from 'cors';
dotevn.config();

const PORT = process.env.PORT || 5001;

const app = express();


app.use(express.json());
// Cách sửa đúng: dùng dấu hai chấm (:) bên trong dấu ngoặc nhọn {}
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/tasks", tasksRouter);
app.use(express.json())

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server log in ${PORT}`)
    });
});

