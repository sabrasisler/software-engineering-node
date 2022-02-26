/**
 * @file Implements a mongoose schema that defines the shape of the document in the likes collection.
 */

import mongoose, { Schema } from "mongoose";
import Like from "../../models/likes/Like";


const LikeSchema = new mongoose.Schema<Like>({
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "likes" });
export default LikeSchema;