import { User } from '../models/user.js';
import { UserContent } from '../models/content.js';
import express from 'express';
import upload from '../file_storage/storage.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentRouter = express.Router();

contentRouter.use(express.json());

/* Middleware */

contentRouter.use('/content/:userid', async (req, res, next) => {
    const userID = req.params.userid;
    const content = new UserContent(userID);
    res.locals.content = content;
    next();
});

/* Endpoints */

contentRouter.get('/content/:userid', async (req, res) => {
    const content = res.locals.content;
    const fetchedContent = await content.fetchContent();

    // const filePath = path.resolve(__dirname, `../file_storage/uploads/${fetchedContent[0].filename}`);
    // console.log(filePath);
    res.json({ response: fetchedContent });
    // res.sendFile(filePath);
});

contentRouter.get('/content/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.resolve(__dirname, `/file_storage/uploads/${filename}`);
    res.sendFile(filePath);
});

contentRouter.post('/content/:userid/upload/image', upload.single("file"), async (req, res) => {
    const content = res.locals.content;
    const newContent = req.file;
    await content.uploadContent(newContent);
    res.json({ response: "success" });
});

contentRouter.put('/content/:userid/update/:filename', async (req, res) => {
    const content = res.locals.content;
    const { x, y } = req.body.newCoords;
    const filename = req.params.filename;
    console.log(x, y, filename);
    await content.updateCoords({ x, y }, filename);
})

export default contentRouter;
