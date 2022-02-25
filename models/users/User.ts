/**
 * @file Declares User data type representing a user
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents user of the Tuiter application
 * @property {String} username unique username representing the user's account
 * @property {String} password password for the user
 * @property {String} firstName user's first name
 * @property {String} lastName user's last name
 * @property {String} email user's email
 * @property {String} profilePhoto photo of the user
 * @property {String} headerImage image to be displayed at the top of the user's page
 * @property {String} biography biography of the user
 * @property {AccountType} the type of account a user holds
 * @property {MaritalStatus} maritalStatus the marital status of the user
 * @property {Location} location the location of the user
 * @property {number} salary of the user
 */

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};