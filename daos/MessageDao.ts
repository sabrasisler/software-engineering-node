/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() { }
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({ sentBy: uid }).exec();

    findAllMessagesSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({ sentTo: uid }).exec();

    userMessagesUser = async (message: Message, uid1: string, uid2: string): Promise<any> =>
        MessageModel.create({...message, sentBy: uid1, sentTo: uid2 });

    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}