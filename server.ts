import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from './controllers/TuitController';
import LikeController from "./controllers/LikeController";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sabrasisler:securepassword@tuitera2.nghpg.mongodb.net/TuiterA2?retryWrites=true&w=majority");
const app = express();
app.use(express.json());
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);