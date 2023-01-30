import { CollectionReference,getFirestore} from 'firebase-admin/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { DatabaseManager } from '../models';
import { UserProps } from "../models";



export class UserController {

    user: CollectionReference;


    private static instance?: UserController;

    public static async getInstance(): Promise<UserController> {
        if (UserController.instance === undefined) {
            const { user } = await DatabaseManager.getInstance();
            UserController.instance = new UserController(user);
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

    /**
     * Create new twitterPost object in database.
     * @param user_id
     * @returns
     */

    public async updateLastGetDate(user_id: string) {
        const db = getFirestore();
        const event = new Date();
        const user = await this.user.where("id", "==", user_id).get();

        const updateDate = await this.user.doc(user.docs[0].id);
        await updateDate.set({
            lastGetDate: event.toISOString()
        }, { merge: true });
    }

     /**
     * Create new twitterPost object in database.
     * @param user_id
     * @returns
     */
    public getLastUpdateUser = async (user_id: string): Promise<string> => {
         const dba = getFirestore();
         const result = await this.user.where("id", "==", user_id).get();
         return result.docs[0].data().lastGetDate;
     }


}
