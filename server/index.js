import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

import usersRouter from './controllers/userController.js';
import contentRouter from './controllers/contentController.js';

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'file_storage', 'uploads')));
app.use('/', usersRouter);
app.use('/', contentRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app };