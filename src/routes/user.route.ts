import express from 'express';
import { UserController } from "../controllers";

const userRouter = express.Router();

/**
 * Get player information from his wallet address
 */
userRouter.get('/allUsers', async (req, res) => {
    const twitterController = await UserController.getInstance();
    const tweet = await twitterController.getAllUsers();

    if (tweet !== null) {
        res.status(200).json(tweet);
    } else {
        res.status(204).end();
    }
});

export { userRouter };
