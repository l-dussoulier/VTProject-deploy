import { CollectionReference } from 'firebase-admin/firestore';
import { UserDatabaseManager } from '../models';
import { UserProps } from "../models";

export class UserController {

    user: CollectionReference;

    private static instance?: UserController;

    public static async getInstance(): Promise<UserController> {
        if (UserController.instance === undefined) {
            const { player } = await UserDatabaseManager.getInstance();
            UserController.instance = new UserController(player);
        }
        return UserController.instance;
    }

    private constructor(User: CollectionReference) {
        this.user = User;
    }

    /**
     * Get all tweet
     * @returns
     */
     public async getAllUsers() {
        const allTweet = await this.user.get();
        if (allTweet.docs.length <= 0) {
            return null;
        }
        return allTweet.docs.map(doc => doc.data());
    }

}