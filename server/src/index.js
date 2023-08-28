import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js';
import bodyParser from 'body-parser';
import { recipeRouter } from './routes/recipes.js';

dotenv.config();
const app = express();
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

const db = process.env.MONGODB;
app.use("/auth", userRouter);
app.use("/recipes",recipeRouter);
mongoose.connect(db)

app.listen(3001,()=>{
    console.log("Server started on port 3001")
})