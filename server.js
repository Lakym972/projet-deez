import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import routes from './app/routes.js';
import session from 'express-session';
import Cookies from 'cookies';
import flash from 'express-flash-messages'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(session({
    secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));



/*
if(process.env.APP_ENV === 'dev') {
    app.use((request, response, next) => {
        request.session.user = {
            lastname:  'LECOMTE',
            firstname: 'Cyril',
            email: 'cyrhades76@gmail.com',
            roles: ['user', 'admin']
        };
        next();
    })
}
*/

app.use((request, response, next) => {
    response.locals.app = {
        user :  request.session.user,
        route : request._parsedUrl.pathname
    };
    next();
})



app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use(flash());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(process.env.PORT, () => {
    console.log(`server start on http://localhost:${process.env.PORT}`);
})