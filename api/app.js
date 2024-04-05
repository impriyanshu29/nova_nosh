import express from 'express';
import testRoute from './routes/test.routes.js';

const app = express();

app.use('/api/test', testRoute);
export default app;