import express from 'express';
import dotenv from 'dotenv'
import { DBconnect } from './db/connect.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import todoRoute from './routes/todoRoute.js'
dotenv.config({ path: './config/config.env' })
console.log('saas',process.env.STRIPE_SECRET_KEY)
const DATABASE_URL = "mongodb+srv://mubbashirahmad44:ahmad1122@todo.lrtr1sq.mongodb.net/?retryWrites=true&w=majority&appName=Todo"
const app = express()

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));// Parse JSON bodies
app.use(cors()) // Enable CORS
app.use(cookieParser());
app.use(express.json());
DBconnect(DATABASE_URL);
// CORS middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
  });
// Routes  
app.use("/api/users", userRoute)
app.use("/api/todo", todoRoute)
app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`);
    console.log(`MongoDB server running at ${DATABASE_URL}`);
  });