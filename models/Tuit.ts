import { Types } from "mongoose";
import User from "./User";

export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: Types.ObjectId | null = null;
}