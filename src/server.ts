
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import database from './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

database.connect();

dotenv.config();

app.listen(process.env.PORT, () => console.log(`Servidor inicializado em http://localhost:${process.env.PORT}`));
