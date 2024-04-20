import express from 'express';
import cookieParser from 'cookie-parser'

// import routes-------------------------------
import testRoute from './routes/test.routes.js';
import authRoute from './routes/auth.routes.js';


const app = express();

app.use(express.json());    // This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

// Parsing JSON: When you tell Express to use express.json(), it's like telling it, "Hey, if any requests come in with JSON data, go ahead and convert that JSON into a format I can easily work with in my code.

app.use(cookieParser());
app.use('/api/test', testRoute);
app.use('/api/auth',authRoute);
export default app;














































































