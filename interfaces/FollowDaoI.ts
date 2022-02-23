import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersFollowingUser(uid: string): Promise<Follow[]>;
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    userFollowsUser (tid: string, uid: string): Promise<any>;
    userUnfollowsUser (tid: string, uid: string): Promise<Follow>;
};