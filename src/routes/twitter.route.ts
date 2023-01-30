import express from 'express';
import { TwitterController } from "../controllers";
import { UserController } from "../controllers";

const twitterRouter = express.Router();
const request = require('request');
const token = 'AAAAAAAAAAAAAAAAAAAAAHMylQEAAAAAC7%2Fgvyxuw23AFM6kvUdfRxzBUk4%3DHB3q84a6Rl9kSPv07KKKlZpI1gCFlQG3IEBySOV8wTSxQa3Znr';

/**
 * Get player information from his wallet address
 */
/*twitterRouter.get('/getTweetById', async (req, res) => {
    const id = req.body.accountId;

    //console.log(id)
    const twitterController = await TwitterController.getInstance();
    const tweet = await twitterController.getTweetFromUser(id);

    if (tweet !== null) {
        res.status(200).json(tweet);
    } else {
        res.status(204).end();
    }
});*/

twitterRouter.get('/allTweet', async (req, res) => {
    console.log("1");
    const twitterController = await TwitterController.getInstance();
    console.log(twitterController);
    const tweet = await twitterController.getAllTweet();
    console.log(tweet);
    if (tweet !== null) {
        res.status(200).json(tweet);
    } else {
        res.status(204).end();
    }
});

twitterRouter.get('/allUsersTweet', async (req, res) => {
    const userController = await UserController.getInstance();
    const users = await userController.getAllUsers();
    var tweets = []
    if (users !== null) {
        for(let x in users){
            const twitterController = await TwitterController.getInstance();
            const lastGetDate = await userController.getLastUpdateUser(users[x].id);
            const tweet = await twitterController.getTweetFromUser(users[x].id, "2023-01-24T20:36:15.775Z");
            tweets.push({"user": users[x].id, "tweets": tweet})
            await userController.updateLastGetDate(users[x].id);
        }
        res.status(200).json(tweets);
    } else {
        res.status(204).end();
    }
});

/**
 * Creation new tweet save
 */
twitterRouter.post('/create', async (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = new Date();
    const note = req.body.note;

    if (username === undefined ||
        description === undefined ||
        date === undefined ||
        note === undefined
    ) {
        res.status(400).end();
        return;
    }

    const twitterController = await TwitterController.getInstance();
    const tweet = await twitterController.create({
        username, description, date, note
    });

    if (tweet !== null) {
        res.status(201).json(tweet);
    } else {
        res.status(409).end();
    }
});

export { twitterRouter };
