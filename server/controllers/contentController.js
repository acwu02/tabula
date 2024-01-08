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
    res.json({ response: fetchedContent });
});

contentRouter.get('/content/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.resolve(__dirname, `/file_storage/uploads/${filename}`);
    res.sendFile(filePath);
});

contentRouter.post('/content/:userid/upload/image', upload.single("file"), async (req, res) => {
    const content = res.locals.content;
    const newContent = req.file;
    const height = req.body.height;
    const width = req.body.width;
    await content.uploadImage(newContent, height, width);
    res.json({ response: "success" });
});

// TODO add middleware for content endpoints
// TODO update endpoint to use id instead of filename
contentRouter.put('/content/:userid/image/update-position/:filename', async (req, res) => {
    const content = res.locals.content;
    const { x, y } = req.body.newCoords;
    const filename = req.params.filename;
    await content.updateImageCoords({ x, y }, filename);
    res.json({response: "success" });
});

contentRouter.put('/content/:userid/image/update-size/:filename', async (req, res) => {
    const content = res.locals.content;
    const { height, width } = req.body.newSize;
    const filename = req.params.filename;
    await content.updateImageSize({ height, width }, filename);
    res.json({response: "success" });
});

// TODO handle coordinates for text
contentRouter.post('/content/:userid/upload/text', async (req, res) => {
    const content = res.locals.content;
    const text = req.body.text;
    await content.uploadText(text);
    res.json({ response: "success" });
});

// TODO change updateCoords
contentRouter.put('/content/:userid/text/update-position/:id', async (req, res) => {
    const content = res.locals.content;
    const { x, y } = req.body.newCoords;
    const id = req.params.id;
    await content.updateTextCoords({ x, y }, id);
    res.json({ response: "success" });
});

contentRouter.put('/content/:userid/text/update-content/:id', async (req, res) => {
    const content = res.locals.content;
    const newText = req.body.newText;
    const id = req.params.id;
    await content.updateTextContent(newText, id);
    res.json({ response: "success" });
});

contentRouter.put('/content/:userid/text/update-size/:id', async (req, res) => {
    const content = res.locals.content;
    const { height, width } = req.body.newSize;
    const id = req.params.id;
    // console.log(height, width, id);
    await content.updateTextSize({ height, width }, id);
    res.json({response: "success" });
});

export default contentRouter;
