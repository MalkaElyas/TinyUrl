
import express from 'express' 
import cors from 'cors';
import bodyParser from 'body-parser';

import connectDB from './Data-Base/db.js';
import logMiddleware from './Middlewares/log.js';
import { verifyToken , authLink, authUser } from './Middlewares/jwt.js';
import authRouter from './Routers/authRouter.js';
import userRouter from './Routers/userRouter.js';
import linkRouter from './Routers/linkRouter.js';
import redirectRouter from './Routers/redirectRouter.js';

connectDB();

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(logMiddleware);

app.use("/user",(req,res,next) => { console.log("user"); next();} ,verifyToken, authUser, userRouter);

app.use("/link",(req,res,next) => { console.log("link"); next();} ,verifyToken, authLink, linkRouter);

app.use("/",(req,res,next) => { console.log("auth"); next();} ,authRouter);

app.use((req,res,next) => { console.log("redirect"); next();} ,redirectRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

