import {CollectionReference} from 'firebase-admin/firestore';
import {DatabaseManager, TwitterDBProps} from '../models';

const request = require('request');

export class TwitterController {

    user: CollectionReference;
    twitter: CollectionReference;

    private static instance?: TwitterController;

    public static async getInstance(): Promise<TwitterController> {
        if (TwitterController.instance === undefined) {
            const { user, twitter } = await DatabaseManager.getInstance();
            TwitterController.instance = new TwitterController(user, twitter);
        }
        return TwitterController.instance;
    }

    private constructor(User : CollectionReference, Twitter: CollectionReference) {
        this.user = User;
        this.twitter = Twitter;
    }



    /**
     * Update note tweet object in database.
     * @param id
     * @param timestamp
     * @returns
     */
    public async getTweetFromUser(id: string, timestamp : any) {
        const options = {
            url: 'https://api.twitter.com/2/users/'+id+'/tweets?start_time='+timestamp,
            method: "get",
            headers: {
              "Authorization" : "Bearer AAAAAAAAAAAAAAAAAAAAAHMylQEAAAAAC7%2Fgvyxuw23AFM6kvUdfRxzBUk4%3DHB3q84a6Rl9kSPv07KKKlZpI1gCFlQG3IEBySOV8wTSxQa3Znr",
            }
        };
        const reference = this;
        await request(options, async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let tweets = []
                let json = JSON.parse(body);
                for(let x in json.data){
                    tweets.push({"id":json.data[x].id,"text" : json.data[x].text})
                        const username = id;
                        const description = json.data[x].text;
                        const date = new Date();
                        const note = 100;
                    await reference.create({
                        username, description, date, note
                    });
                }
                return {"success": true, "status_code": response.statusCode, "content": tweets}
            } else {
                console.log("Empty");
                return {"success": false, "status_code": response.statusCode, "error_message": "Null"}
            }
            }, { merge: true });
        }

    /**
     * Create new twitterPost object in database.
     * @param twitterPost
     * @returns
     */
    public async create (twitterPost: TwitterDBProps) {
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
