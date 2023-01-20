import express from 'express';
import { TwitterController } from "../controllers";
import { UserController } from "../controllers";

const twitterRouter = express.Router();
const request = require('request');
const token = 'AAAAAAAAAAAAAAAAAAAAAHMylQEAAAAAC7%2Fgvyxuw23AFM6kvUdfRxzBUk4%3DHB3q84a6Rl9kSPv07KKKlZpI1gCFlQG3IEBySOV8wTSxQa3Znr';

/**
 * Get player information from his wallet address
 */
twitterRouter.get('/getTweetById', async (req, res) => {
    const id = req.body.accountId;

    //console.log(id)
    const twitterController = await TwitterController.getInstance();
    const tweet = await twitterController.getTweetFromUser(id);

    if (tweet !== null) {
        res.status(200).json(tweet);
    } else {
        res.status(204).end();
    }
});

twitterRouter.get('/allTweet', async (req, res) => {
    const twitterController = await TwitterController.getInstance();
    const tweet = await twitterController.getAllTweet();

    if (tweet !== null) {
        res.status(200).json(tweet);
    } else {
        res.status(204).end();
    }
});

twitterRouter.get('/allUsersTweet', async (req, res) => {
    const userController = await UserController.getInstance();
    const users = await userController.getAllUsers();

    if (users !== null) {
        for(let x in users){
            console.log("Id " + users[x].id)
            const twitterController = await TwitterController.getInstance();
            const tweet = await twitterController.getAllTweet();
            console.log(tweet)
        }
        res.status(200).json(users);
    } else {
        res.status(204).end();
    }
});


/**
 * Get player information from his wallet address
 */
/*twitterRouter.get('/allUsersTweets', async (req, res) => {
    request('http://localhost:3000/user/allUsers', async function (error, response, body) {
    if (!error && response.statusCode == 200) {
        if (body !== null) {
            let users = JSON.parse(body);
            for (let x in users) {
                var option = {
                    method: "get",
                    headers: {
                        "Authorization" : `Bearer ` + token
                    },
                    url : 'https://api.twitter.com/2/users/'+ users[x].id+'/tweets?'
                };
                request(option, async function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let tweet = JSON.parse(body);
                    for (let y in tweet.data) {
                        let userTweet = {
                            "id" : users[x].id,
                            "content" : tweet.data[y].text
                        }
                        console.log(userTweet)
                        //console.log("Id : " + users[x].id)
                        //console.log("Tweets : " + tweet.data[y].text)
                    }
                }else{
                    res.status(400).end();
                }
                })
            }
        } else {
            res.status(400).end();
        }
    }
    res.status(400).end();
    })
    res.status(200).json("");
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
