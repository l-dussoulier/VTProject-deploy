import express from 'express';
import { TwitterController } from "../controllers";

const twitterRouter = express.Router();

/**
 * Get player information from his wallet address
 */
twitterRouter.get('/allTweet', async (req, res) => {
    const twitterController = await TwitterController.getInstance();
    const tweet = await twitterController.getAllTweet();

    if (tweet !== null) {
        res.status(200).json(tweet);
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
