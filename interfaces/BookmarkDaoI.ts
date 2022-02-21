import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    userBookmarksTuit (tid: string, uid: string): Promise<any>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
};