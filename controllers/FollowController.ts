/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class FollowController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /users/:uid1/follows/:uid2 to retrieve all the tuits liked by a user
  *     </li>
  *     <li>GET /tuits/:tid/likes to retrieve all users that liked a tuit
  *     </li>
  *     <li>POST /users/:uid/likes/:tid to record that a user likes a tuit
  *     </li>
  *     <li>DELETE /users/:uid/unlikes/:tid to record that a user
  *     no londer likes a tuit</li>
  * </ul>
  * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
  * @property {LikeController} LikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class FollowController implements FollowControllerI {
     private static followDao: FollowDao = FollowDao.getInstance();
     private static followController: FollowController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return FollowController
      */
     public static getInstance = (app: Express): FollowController => {
         if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
             app.get("/users/:uid/follows", FollowController.followController.findAllUsersFollowingUser);
             app.get("/users/:uid/following", FollowController.followController.findAllUsersFollowedByUser);
             app.post("/users/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
             app.delete("/users/:uid1/follows/:uid2", FollowController.followController.userUnfollowsUser);
         }
         return FollowController.followController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that follow a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user being followed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the users that are followees 
      */
     findAllUsersFollowingUser = (req: Request, res: Response) =>
         FollowController.followDao.findAllUsersFollowingUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * Retrieves all users followed by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user that is following
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the users that are being followed
      */
     findAllUsersFollowedByUser = (req: Request, res: Response) =>
         FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid1 and uid2 representing the user (uid1) that is following 
      * and the user being followed (uid2)
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new follow that was inserted in the
      * database
      */
     userFollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid1 and uid2 representing the user (uid1) that is unfollowing
      * a user(uid2)
      * @param {Response} res Represents response to client, including status
      * on whether deleting the follow was successful or not
      */
     userUnfollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
             .then(status => res.send(status));
 };