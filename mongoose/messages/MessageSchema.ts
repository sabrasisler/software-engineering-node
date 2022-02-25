import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    sentTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    message: String,
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;