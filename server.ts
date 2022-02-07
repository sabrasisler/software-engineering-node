import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import mongoose from "mongoose";


mongoose.connect('mongodb://localhost:27017/cs1234');
const app = express();
app.use(express.json());
const userController = UserController.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);