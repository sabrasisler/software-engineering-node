/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() { }

    /**
     * Retrieves all User documents following a particular user from the database.
     * @param {string} uid Primary key of user who is being followed
     * @returns Promise To be notified when the users are retrieved from the database
     */
    findAllUsersFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ userFollowed: uid })
            .populate("userFollowing")
            .exec();

    /**
     * Retrieves all User documents followed by a particular user from the database.
     * @param {string} uid Primary key of user who is doing the following
     * @returns Promise To be notified when the users are retrieved from the database
     */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ userFollowing: uid })
            .populate("userFollowed")
            .exec();

    /**
     * Adds follow instance to the database.
     * @param {string} uid1 Primary key of user who is being followed 
     * @param {string} uid2 Primary key of user who is following another user
     * @returns Promise To be notified when the user follows another user
     */            
    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({ userFollowed: uid1, userFollowing: uid2 });

    /**
     * Removes follow from the database.
     * @param {string} uid1 Primary key of user who unfollowed a user
     * @param {string} uid2 Primary key of user to be unfollowed.
     * @returns Promise To be notified when a user is unfollowed by another user.
     */        
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({ userFollowed: uid1, userFollowing: uid2 });
}