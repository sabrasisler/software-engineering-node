/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDAO
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() { }

    /**
     * Retrieves all Tuit documents bookmarked by a particular user from the database.
     * @param {string} uid Primary key of user who bookmarked the tuit
     * @returns Promise To be notified when the tuits are retrieved from the database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkedBy: uid })
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Adds bookmark instance to the database.
     * @param {string} uid Primary key of user who bookmarked the tuit
     * @param {string} tid Primary key of tuit to be bookmarked.
     * @returns Promise To be notified when the tuit is bookmarked by the user
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({ bookmarkedTuit: tid, bookmarkedBy: uid });

    /**
     * Removes bookmark from the database.
     * @param {string} uid Primary key of user who unbookmarked the tuit
     * @param {string} tid Primary key of tuit to be unbookmarked.
     * @returns Promise To be notified when the tuit is unbookmarked by the user.
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid });
}