/**
 * @file Implements mongoose model to CRUD
 * documents in the user collection
 */

import mongoose from "mongoose";
import UserSchema from "./UserSchema";
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;