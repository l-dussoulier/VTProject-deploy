import express from 'express';
import { UserController } from "../controllers";

const userRouter = express.Router();

/**
 * Get player information from his wallet address
 */
userRouter.get('/allUsers', async (req, res) => {
    const userController = await UserController.getInstance();
    const users = await userController.getAllUsers();

    if (users !== null) {
        res.status(200).json(users);
    } else {
        res.status(204).end();
    }
});

export { userRouter };
