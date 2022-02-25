import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface FollowDaoI {
    userMessagesUser(message: Message, uid1: string, uid2: string): Promise<Message>;
    userDeletesMessage(uid1: string): Promise<any>;
    findAllMessagesSentByUser(uid: string): Promise<Message[]>;
    findAllMessagesSentToUser(uid: string): Promise<Message[]>;
};