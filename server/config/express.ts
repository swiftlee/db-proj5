import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import sqlite3 from 'sqlite3';
import flowersRouter from '../api/flowers';

// setup SQLite3 here
export const db = new sqlite3.Database(
    path.join(__dirname, '../../../database/flowers2019.db'),
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Connected to the flower\'s database');
        }
    });

// initialize app
const app = express();

// enable request logging for development debugging
app.use(morgan('dev'));

// body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// test
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../../../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../client/build', 'index.html'));
    });
}

// routes
app.use('/api/flowers', flowersRouter);

export default app;
