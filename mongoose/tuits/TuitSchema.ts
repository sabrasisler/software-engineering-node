
/**
 * @file Implements a mongoose schema that defines the shape of the document in the tuits collection.
 */

import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;