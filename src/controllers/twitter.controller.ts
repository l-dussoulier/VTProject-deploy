import { CollectionReference } from 'firebase-admin/firestore';
import { DatabaseManager } from '../models';
import { ITwitterProps } from "../models";


export class TwitterController {

    twitter: CollectionReference;

    private static instance?: TwitterController;

    public static async getInstance(): Promise<TwitterController> {
        if (TwitterController.instance === undefined) {
            const { player } = await DatabaseManager.getInstance();
            TwitterController.instance = new TwitterController(player);
        }
        return TwitterController.instance;
    }

    private constructor(Twitter: CollectionReference) {
        this.twitter = Twitter;
    }

    /**
     * Create new twitterPost object in database.
     * @param twitterPost
     * @returns
     */
    public async create(twitterPost: ITwitterProps) {
        const twitterRef = this.twitter.doc();
        return await twitterRef.set({
            ...twitterPost
        }, { merge: true });
    }


    /**
     * Update note tweet object in database.
     * @param reference
     * @param note
     * @returns
     */
    public async updateNoteTweet(reference: string, note: number) {
        const twitterRef = this.twitter.doc(reference);
        return await twitterRef.set({
            note: note
        }, { merge: true });
    }

    /**
     * Get all tweet
     * @returns
     */
    public async getAllTweet() {
        const allTweet = await this.twitter.get();
        if (allTweet.docs.length <= 0) {
            return null;
        }
        return allTweet.docs.map(doc => doc.data());
    }

}
