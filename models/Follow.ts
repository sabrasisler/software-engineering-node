/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows a user
 */

import User from "./users/User";

/**
 * @typedef Follow Represents follow relationship between users,
 * as in a user follows a user
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing User following another user
 */

export default interface Follow {
    userFollowed: User,
    userFollowing: User

};