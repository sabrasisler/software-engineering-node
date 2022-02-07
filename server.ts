import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from './controllers/TuitController';
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://ssisler:securepassword@cluster0.q2crm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const app = express();
app.use(express.json());
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);