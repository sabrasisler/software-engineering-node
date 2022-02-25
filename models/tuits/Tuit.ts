/**
 * @file Declares Tuit data type representing a tuit
 */

 import User from "../users/User";

 /**
  * @typedef Tuit Represents tuit posted by a users
  * @property {String} tuit Content of the tuit
  * @property {User} postedBy User that posted the Tuit
  * @property {Date} postedOn date in which the tuit was posted
  */

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};