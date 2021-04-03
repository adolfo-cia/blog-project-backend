import express from 'express';
import v1Router from './api/v1';
import { handleError, intializeAuth, notFound } from './middleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(intializeAuth());

app.use('/api/v1', v1Router);
app.use('*', notFound);
app.use(handleError);

const API_PORT = process.env.API_PORT || 4000;

app.listen(API_PORT, () => console.log(`App listening on port ${API_PORT}`));
