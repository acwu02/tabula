import { User } from '../models/user.js';
import { UserContent } from '../models/content.js';
import express from 'express';

const contentRouter = express.Router();

contentRouter.use(express.json());

/* Middleware */

contentRouter.use('/content/:id', async (req, res, next) => {
    const id = req.params.id;
    const content = new UserContent(id);
    res.locals.user = content;
    next();
});

/* Endpoints */

contentRouter.get('/content/:id/', async (req, res) => {
    const content = res.locals.user;
    const fetchedContent = await content.fetchContent();
    res.json({ response: fetchedContent });
});

contentRouter.post('/content/:id', async (req, res) => {
    const newContent = req.body.content;
    await content.uploadContent(newContent);
    res.json({ response: "success" });
})

