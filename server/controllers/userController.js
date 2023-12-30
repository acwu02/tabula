import { User } from '../models/user.js';
import express from 'express';

const usersRouter = express.Router();

usersRouter.use(express.json());

/* Middleware */

usersRouter.use('/users', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = new User(username, password);
    res.locals.user = user;
    next();
})

/* Endpoints */

usersRouter.post('/users/login', async (req, res) => {
    const user = res.locals.user;
    if (!await user.existsInDB()) {
        await user.create();
        res.json({ response: user });
    } else {
        if (!await user.validatePassword()) {
            res.json({ response: "incorrectPassword" });
        } else {
            await user.login();
            res.json({ response: user });
        }
    }
});

export default usersRouter;
