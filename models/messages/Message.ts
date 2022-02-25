/**
 * @file Declares Message data type representing relationship between
 * users, as in user messages a user
 */

import User from "../users/User";

/**
 * @typedef Message Represents private message relationship between users,
 * as in a user messages a user
 * @property {User} sentTo User being messaged
 * @property {User} sentBy User sending the message
 * @property {String} message string with the content of the message
 * @property {Date} sentOn date in which the message was sent
 */

export default interface Message {
    sentTo: User,
    sentBy: User
    message: String,
    sentOn: Date
};