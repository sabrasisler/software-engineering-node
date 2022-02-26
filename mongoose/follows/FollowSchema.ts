/**
 * @file Implements a mongoose schema that defines the shape of the document in the follows collection.
 */
import mongoose, { Schema } from "mongoose";
import Follow from "../../models/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: { type: Schema.Types.ObjectId, ref: "UserModel" },
    userFollowing: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "follows" });
export default FollowSchema;