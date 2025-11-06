import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDb from './utils/db.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

dotenv.config()

const app = express();
connectDb();

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



// apis
app.use("/api/v1/user", userRoute)
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`port is running ${port}`);

})