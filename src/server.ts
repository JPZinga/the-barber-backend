
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import allRoutes from './routes';
import database from './database';
import authenticationMiddleware from './middlewares/authenticationMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(allRoutes.userRoutes);

app.use(authenticationMiddleware);
app.use(allRoutes.routes);

database.connect();

dotenv.config();

app.listen(process.env.PORT, () => console.log(`Servidor inicializado em http://localhost:${process.env.PORT}`));
