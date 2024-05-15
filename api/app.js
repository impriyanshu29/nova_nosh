import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';




const app = express();

app.use(express.json());    // This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

app.use(cors()); // Cross-Origin Resource Sharing (CORS) is a security feature that restricts cross-origin HTTP requests that are initiated from scripts running in the browser. By default, JavaScript does not allow cross-origin requests, and the fetch() function enforces this policy.
// Parsing JSON: When you tell Express to use express.json(), it's like telling it, "Hey, if any requests come in with JSON data, go ahead and convert that JSON into a format I can easily work with in my code.


// import routes-------------------------------
import testRoute from './routes/test.routes.js';
import authRoute from './routes/auth.routes.js';
import addressRoute from './routes/address.routes.js';
import menuRoute from './routes/menu.routes.js';
import whistListRouter from './routes/whistList.routes.js'
import cartRoute from './routes/cart.routes.js'
import paymentRoute from './routes/payment.routes.js'
import orderRoute from './routes/order.routes.js'
import tableRoute from './routes/table.routes.js'


app.use(cookieParser());
app.use('/api/test', testRoute);
app.use('/api/auth',authRoute);
app.use('/api/add',addressRoute);
app.use('/api/menu', menuRoute)
app.use('/api/whistList', whistListRouter)
app.use('/api/cart', cartRoute)
app.use('/api/payment',paymentRoute )
app.use('/api/order',orderRoute )
app.use('/api/table',tableRoute )
export default app;














































































