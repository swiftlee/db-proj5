import {Request, Response, Router} from 'express';
import {db} from '../config/express';
import validateFlowerUpdate from '../validation/validateFlowerUpdate';

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
            const sql = 'SELECT * FROM SIGHTINGS AS s WHERE NAME = ? ORDER BY SIGHTED DESC LIMIT 10;';
            const params = req.query.flower;
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

    const {column, comname, value} = req.body;
    const sql = `UPDATE FLOWERS SET ${column.toUpperCase()} = ? WHERE COMNAME = ?;`;
    const params = [value, comname];
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

export default flowersRouter;
