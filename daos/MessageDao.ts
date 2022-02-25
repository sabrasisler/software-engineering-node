/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() { }

    /**
     * Retrieves all Message documents sent by a particular user from the database.
     * @param {string} uid Primary key of the user who is the sender
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({ sentBy: uid }).exec();

    /**
     * Retrieves all Message documents sent to a particular user from the database.
     * @param {string} uid Primary key of the user who is the recipient
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findAllMessagesSentToUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({ sentTo: uid }).exec();

    /**
     * Adds message instance to the database.
     * @param {string} uid1 Primary key of user who is the sender 
     * @param {string} uid2 Primary key of user who is the recipient
     * @returns Promise To be notified when the user messages another user
     */
    userMessagesUser = async (message: Message, uid1: string, uid2: string): Promise<any> =>
        MessageModel.create({ ...message, sentBy: uid1, sentTo: uid2 });

    /**
     * Removes message from the database.
     * @param {string} uid1 Primary key of the message
     * @returns Promise To be notified when a message is removed from the database.
     */
    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: mid });
}