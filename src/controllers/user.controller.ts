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
        console.log("Document id : "+ await this.getLastUpdateUser(user_id))
        //db.collection("users").doc(this.getLastUpdateUser(user_id).toString()).update({lastGetDate: event.toISOString()});

    }

     /**
     * Create new twitterPost object in database.
     * @param user_id
     * @returns
     */
    public getLastUpdateUser = async (user_id: string): Promise<string> => {
         const dba = getFirestore();
         const result = await dba.collection("users").where("id", "==", user_id).get();
         return result.docs[0].data().date;
     }


}
