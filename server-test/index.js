import express  from 'express';
import dotenv from 'dotenv';
// import {dbConnect} from "./config/db"
// import authRoutes from './routes/auth.routes'
import cors from 'cors';
import cookieParser from 'cookie-parser'; 

const PORT = process.env.PORT || 3001;
const app = express();


const corsOptions = {
    origin: [ 'http://localhost:5173' , 'https://dapper-heliotrope-04078e.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 

app.get('/', (req , res) => {
    res.send('Hello from Express !');
});
  
  
// if (!process.env.MONGODB_URI) {
//     throw new Error('MONGODB_URI is not defined in environment variables');
// }

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});