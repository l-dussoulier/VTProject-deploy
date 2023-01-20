import { CollectionReference } from 'firebase-admin/firestore';
import { DatabaseManager } from '../models';
import { TwitterDBProps } from "../models";


export class TwitterDBController {

    twitter: CollectionReference;

    private static instance?: TwitterDBController;

    public static async getInstance(): Promise<TwitterDBController> {
        if (TwitterDBController.instance === undefined) {
            const { player } = await DatabaseManager.getInstance();
            TwitterDBController.instance = new TwitterDBController(player);
        }
        return TwitterDBController.instance;
    }

    private constructor(Twitter: CollectionReference) {
        this.twitter = Twitter;
    }

    /**
     * Create new twitterPost object in database.
     * @param twitterPost
     * @returns
     */
    public async create(twitterPost: TwitterDBProps) {
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
