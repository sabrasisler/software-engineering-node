/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    
    private static likeDao: LikeDao | null = null;

     /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */   
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Retrieves all User documents that liked a particular user from the database.
     * @param {string} tid Primary key of the liked tuit
     * @returns Promise To be notified when the users are retrieved from the database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Retrieves all Tuit documents that are liked by a particular user from the database.
     * @param {string} uid Primary key of user who liked the tuits
     * @returns Promise To be notified when the tuits are retrieved from the database
     */            
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Adds Like instance to the database.
     * @param {string} uid Primary key of user who liked the tuit
     * @param {string} tid Primary key of tuit to be liked.
     * @returns Promise To be notified when the tuit is liked by the user
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Removes Like from the database.
     * @param {string} uid Primary key of user who unliked the tuit
     * @param {string} tid Primary key of tuit to be unliked.
     * @returns Promise To be notified when the tuit is unliked by the user.
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}