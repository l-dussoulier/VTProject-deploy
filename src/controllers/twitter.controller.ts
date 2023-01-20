import { CollectionReference } from 'firebase-admin/firestore';
import { TwitterProps } from '../models';
const request = require('request');

export class TwitterController {

    twitter: CollectionReference;

    private static instance?: TwitterController;

    public static async getInstance(): Promise<TwitterController> {
        return TwitterController.instance;
    }

    private constructor(Twitter: CollectionReference) {
        this.twitter = Twitter;
    }

    /**
     * Update note tweet object in database.
     * @param id
     * @returns
     */
    public async getTweetFromUser(id: string) {
        console.log("test" + id)
        await  request('https://api.twitter.com/2/users/'+id+'/tweets', async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
                let message = {"success":true,"status_code":response.statusCode,"content":body}
                return message
            }else{
                let message = {"success":false,"status_code":response.statusCode,"error_message":error.message}
                return message
            }}, { merge: true });
    }

}
