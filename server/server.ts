import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import DBconnect from './src/Config/Database'
import router from './src/Routes/Auth';
import {Logger} from './src/Utilities/Logger';
DBconnect()
const app = express();
app.use(bodyParser.json());
app.use(morgan(`dev`))
app.use(cors({
    origin: [process.env.ORIGIN],
    methods: [`GET`, `POST`, `DELETE`, `PUT`],
    credentials: true, 
}));
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: (60000*30) },
}))
app.use(`/api`, router)
app.listen(8000, ()=> {console.clear();Logger({type : `Server`, content: `Server Running on port ${process.env.PORT || 8000 }`})}
);

