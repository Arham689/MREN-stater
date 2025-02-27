import express from 'express';
import dotenv from 'dotenv';
// import {dbConnect} from "./config/db"
// import authRoutes from './routes/auth.routes'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnect from './src/config/db.js';
import crudRoute from "./src/routes/crud.route.js"
import { ClassName, Medium, Subject } from './src/models/table.model.js';

const PORT = process.env.PORT || 3001;
const app = express();


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello from Express !');
});

app.get('/api/v1', (req, res) => {
    res.send("from ")
})

app.use('/api/v1', crudRoute);

app.get('/api/options', async (req, res) => {
    const classNames = await ClassName.find();
    const mediums = await Medium.find();
    const subjects = await Subject.find();
    res.json({ classNames, mediums, subjects });
});


dbConnect();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});