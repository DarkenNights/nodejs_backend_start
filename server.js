const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');

//Middlewares
dotenv.config();
app.use(express.json());
i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(Backend)
    .init({
        fallbackLng: 'en',
        load: 'languageOnly',
        preload: ['fr', 'en'],
        ns: ['auth'],
        defaultNS: 'auth',
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['path'],
        },
        saveMissing: true,
    });
app.use(i18nextMiddleware.handle(i18next));

// Connect to DB
mongoose
    .connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .catch(
        //TODO : Envoyer un email pour alerter
        (error) => console.log(error)
    );

//Import routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

//Route Middlewares
app.use('/:lng?/user', authRoutes);
app.use('/:lng?/posts', postsRoutes);

app.listen(process.env.APP_PORT, () => console.log('Server Up and Running'));
