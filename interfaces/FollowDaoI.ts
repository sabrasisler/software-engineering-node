import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersFollowingUser(uid: string): Promise<Follow[]>;
    findAllUsersFollowedByUser(uid: string): Promise<Follow[]>;
    userFollowsUser(uid1: string, uid2: string): Promise<Follow>;
    userUnfollowsUser(uid1: string, uid2: string): Promise<any>;
};