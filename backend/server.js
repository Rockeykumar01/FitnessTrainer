import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import trainerRouter from "./routes/trainerRoute.js"
import userRouter from './routes/userRoute.js'
import chatRouter from './routes/chat.route.js';

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints 
app.use("/api/admin", adminRouter)
app.use("/api/trainer", trainerRouter)
app.use("/api/user", userRouter)
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
    res.send("FitConnect - Your Fitness Trainer Platform")
});

app.listen(port, () => console.log(`FitConnect Server started on PORT:${port}`))
