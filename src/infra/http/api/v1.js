import express from 'express';
import userRouter from './routes/userRoutes';

const v1Router = express.Router();

v1Router.get('/', (req, res) => res.json({ message: "it's alive!" }));

v1Router.use('/users', userRouter);

export default v1Router;
