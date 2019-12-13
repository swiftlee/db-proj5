import {Request, Response, Router} from 'express';
import {db} from '../config/express';
import validateFlowerUpdate from '../validation/validateFlowerUpdate';
import validateSightingInsert from '../validation/validateSightingInsert';

const flowersRouter = Router();

flowersRouter.get('/', (req: Request, res: Response) => {
    db.serialize(() => {
        new Promise((resolve, reject) => {
            db.all('SELECT * FROM FLOWERS;', [], (err: any, rows: any) => {
                if (err) {
                    console.log('Error when trying to fetch flower data!');
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }).then((resolve) => {
            return res.status(200).json(resolve);
        }).catch((err) => {
            console.error(err);
            return res.status(400).json({success: false});
        });
    });
});

flowersRouter.get('/:flower', (req: Request, res: Response) => {
    db.serialize(() => {
        new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SIGHTINGS WHERE NAME=? ORDER BY SIGHTED DESC LIMIT 10;';
            console.log('param', req.params.flower);
            const params = req.params.flower;
            db.all(sql, params, (err: any, rows: any) => {
                if (err) {
                    console.log('Error when trying to fetch flower data!');
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }).then((rows) => {
            return res.status(200).json(rows);
        }).catch((err) => {
            console.error(err);
            return res.status(400).json({success: false});
        });
    });
});

flowersRouter.post('/update', (req: Request, res: Response) => {
    const {valid, errors} = validateFlowerUpdate(req.body);

    if (!valid) {
        return res.status(400).json(errors);
    }

    const {column, entry, value} = req.body;
    console.log(...entry.split(',').map((str: string) => str.trim()));
    const sql = `UPDATE SIGHTINGS SET ${column.toUpperCase()} = ?
                 WHERE NAME=?
                 AND PERSON=?
                 AND LOCATION=?
                 AND SIGHTED=DATE(?);`;
    // SELECT * FROM SIGHTINGS
    // WHERE NAME='California flannelbush'
    // AND PERSON='Jennifer'
    // AND LOCATION='Scodie Mountains'
    // AND SIGHTED=DATE('2006-06-26')
    const params = [value, ...entry.split(',').map((str: string) => str.trim())];
    db.serialize(() => {
        db.run(sql, params, (err: Error) => {
            if (err) {
                console.error(err);
                return res.status(400).json({success: false});
            } else {
                return res.status(200).json({success: true});
            }
        });
    });

});

flowersRouter.post('/insert', (req: Request, res: Response) => {
    const {valid, errors} = validateSightingInsert(req.body);
    const {flower, member, location, date} = req.body;
    // console.log("Flower: " + flower + "\n");
    // console.log("Member: " + member + "\n");
    // console.log("Location: " + location + "\n");
    // console.log("Date: " + date + "\n");
    if (!valid) {
        return res.status(400).json(errors);
    }

    // console.log(...entry.split(',').map((str: string) => str.trim()));
    // const sql = `INSERT INTO SIGHTINGS VALUES(
    //              NAME=?,
    //              PERSON=?,
    //              LOCATION=?,
    //              SIGHTED=DATE(?);)`;
    // INSERT INTO langs(name) VALUES(?)`, ['C'], function(err)

    const info = [flower, member, location, date];
// construct the insert statement with multiple placeholders
// based on the number of rows
    // let placeholders = languages.map((language) => '(?)').join(',');
// let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;

    const sql = `INSERT INTO SIGHTINGS(name, person, location, sighted)
                 VALUES (?, ?, ?, ?)`;
    // const params = [...entry.split(',').map((str: string) => str.trim())];
    // console.log('---------------------')
    // console.log(params)
    // console.log('---------------------')

    db.serialize(() => {
        db.run(sql, info, (err: Error) => {
            if (err) {
                console.error(err);
                return res.status(400).json({success: false});
            } else {
                return res.status(200).json({success: true});
            }
        });
    });
    // db.serialize(() => {
    //     db.run(sql, params, (err: Error) => {
    //         if (err) {
    //             console.error(err);
    //             return res.status(400).json({success: false});
    //         } else {
    //             return res.status(200).json({success: true});
    //         }
    //     });
    // });
});

export default flowersRouter;
