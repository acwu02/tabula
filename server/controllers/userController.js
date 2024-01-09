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
});

/* Endpoints */

usersRouter.post('/users/login', async (req, res) => {
    const user = res.locals.user;
    let userID = null;
    if (!await user.existsInDB()) {
        userID = await user.create();
    } else {
        if (!await user.validatePassword()) {
            res.json({ response: "incorrectPassword" });
            return;
        } else {
            userID = await user.login();
        }
    }
    user.setID(userID);
    res.json({ response: user });
});

usersRouter.get('/users/random', async (req, res) => {
    const user = res.locals.user;
    const randomUser = await user.getRandomUser();
    console.log(randomUser);
    res.json({ response: randomUser });
})

export default usersRouter;
