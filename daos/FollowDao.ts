/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
 import FollowDaoI from "../interfaces/FollowDaoI";
 import FollowModel from "../mongoose/follows/FollowModel";
 import Follow from "../models/Follow";
 export default class FollowDao implements FollowDaoI {
     private static followDao: FollowDao | null = null;
     public static getInstance = (): FollowDao => {
         if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
         }
         return FollowDao.followDao;
     }
     private constructor() {}
     findAllUsersFollowingUser = async (userFollowed: string): Promise<Follow[]> =>
         FollowModel
             .find({userFollowed: userFollowed})
             .populate("userFollowing")
             .exec();
    findAllUsersFollowedByUser = async (userFollowing: string): Promise<Follow[]> =>
             FollowModel
                 .find({userFollowing: userFollowing})
                 .populate("userFollowed")
                 .exec();
    userFollowsUser = async (userFollowed: string, userFollowing: string): Promise<any> =>
         FollowModel.create({userFollowed: userFollowed, userFollowing: userFollowing});
     userUnfollowsUser = async (userFollowed: string, userFollowing: string): Promise<any> =>
         FollowModel.deleteOne({userFollowed: userFollowed, userFollowing: userFollowing});
 }