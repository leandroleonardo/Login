import dotenv from 'dotenv';
import express from 'express';
import userRouter from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js'
import mongoose from 'mongoose';

const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_CONNECTION_URL,{
        useNewUrlParser:true, 
        useUnifiedTopology:true
    }
)

app.use(express.urlencoded({ extended: false }));
app.use('/admin',express.json(), adminRouter)
app.use('/user',express.json(), userRouter)
app.listen(process.env.PORT)
app.get('*', function(req, res){ res.status(404).send('404'); });