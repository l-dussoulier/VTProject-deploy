import express from 'express';
import { TwitterController } from "../controllers";

const twitterRouter = express.Router();

/**
 * Get player information from his wallet address
 */
twitterRouter.get('/getTweetById', async (req, res) => {
    //const id = req.body.accountId;

    //console.log(id)
    const twitterController = await TwitterController.getInstance();
    const tweet = await twitterController.getTweetFromUser();

    if (tweet !== null) {
        res.status(200).json(tweet);
    } else {
        res.status(204).end();
    }
});

export { twitterRouter };
