import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import sqlite3 from 'sqlite3';
import flowersRouter from '../api/flowers';

// START SQLite3 setup here
export let db: any;

new Promise((resolve, reject) => {
    fs.copyFile(path.join(__dirname, '../../../database/flowers2019-copy.db'), path.join(__dirname, '../../../database/flowers2019.db'), (err) => {
        if (err) {
            reject(err);
        } else {
            console.log('Reset flowers2019.db to default state.');
            resolve(path.join(__dirname, '../../../database/flowers2019.db'));
        }
    });
}).then((filePath: string) => {
    db = new sqlite3.Database(
        filePath,
        sqlite3.OPEN_READWRITE,
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Connected to the flowers2019 database successfully!');
                // FEATURES, FLOWERS, MEMBERS, SIGHTINGS
                const tbl = 'CREATE TABLE LOGS (triggerType VARCHAR(255))';
                db.run(tbl, (error: Error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    // SIGHTINGS
                    let trig = 'CREATE TRIGGER IF NOT EXISTS insertTrigger AFTER INSERT ON SIGHTINGS BEGIN INSERT INTO LOGS VALUES("INSERTION_ON_SIGHTINGS"); END;';
                    db.run(trig);
                    trig = 'CREATE TRIGGER IF NOT EXISTS updateTrigger AFTER UPDATE ON SIGHTINGS BEGIN INSERT INTO LOGS VALUES("UPDATE_ON_SIGHTINGS"); END;';
                    db.run(trig);
                    trig = 'CREATE TRIGGER IF NOT EXISTS deleteTrigger AFTER DELETE ON SIGHTINGS BEGIN INSERT INTO LOGS VALUES("DELETE_ON_SIGHTINGS"); END;';
                    db.run(trig);
                    // FEATURES
                    trig = 'CREATE TRIGGER IF NOT EXISTS insertTrigger1 AFTER INSERT ON FEATURES BEGIN INSERT INTO LOGS VALUES("INSERTION_ON_FEATURES"); END;';
                    db.run(trig);
                    trig = 'CREATE TRIGGER IF NOT EXISTS updateTrigger1 AFTER UPDATE ON FEATURES BEGIN INSERT INTO LOGS VALUES("UPDATE_ON_FEATURES"); END;';
                    db.run(trig);
                    trig = 'CREATE TRIGGER IF NOT EXISTS deleteTrigger1 AFTER DELETE ON FEATURES BEGIN INSERT INTO LOGS VALUES("DELETE_ON_FEATURES"); END;';
                    db.run(trig);
                    // FLOWERS
                    trig = 'CREATE TRIGGER IF NOT EXISTS insertTrigger2 AFTER INSERT ON FLOWERS BEGIN INSERT INTO LOGS VALUES("INSERTION_ON_FLOWERS"); END;';
                    db.run(trig);
                    trig = 'CREATE TRIGGER IF NOT EXISTS updateTrigger2 AFTER UPDATE ON FLOWERS BEGIN INSERT INTO LOGS VALUES("UPDATE_ON_FLOWERS"); END;';
                    db.run(trig);
                    trig = 'CREATE TRIGGER IF NOT EXISTS deleteTrigger2 AFTER DELETE ON FLOWERS BEGIN INSERT INTO LOGS VALUES("DELETE_ON_FLOWERS"); END;';
                    db.run(trig);
                    // MEMBERS
                    trig = 'CREATE TRIGGER IF NOT EXISTS insertTrigger3 AFTER INSERT ON MEMBERS BEGIN INSERT INTO LOGS VALUES("INSERTION_ON_MEMBERS"); END;';
                    db.run(trig);
                    trig = 'CREATE TRIGGER IF NOT EXISTS updateTrigger3 AFTER UPDATE ON MEMBERS BEGIN INSERT INTO LOGS VALUES("UPDATE_ON_MEMBERS"); END;';
                    db.run(trig);
                    trig = 'CREATE TRIGGER IF NOT EXISTS deleteTrigger3 AFTER DELETE ON MEMBERS BEGIN INSERT INTO LOGS VALUES("DELETE_ON_MEMBERS"); END;';
                    db.run(trig);
                });
            }
        });
});

// END SQLite3 setup

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

// shutdown logic
process.on('SIGINT', () => {
    db.close();
});

export default app;
