import {Request, Response, Router} from 'express';
import isEmpty from 'is-empty';
import {db} from '../config/express';

const flowersRouter = Router();

flowersRouter.get('/', (req: Request, res: Response) => {
    new Promise((resolve, reject) => {
        db.all('SELECT * FROM FLOWERS;', [], ((err, rows) => {
            if (err) {
                console.log('Error when trying to fetch flower data!');
                console.log(err);
                reject(err);
            } else {
                resolve(rows);
            }
        }));
    }).then((resolve) => {
        return res.json(resolve);
    }).catch((err) => console.error(err));
});

flowersRouter.post('/update', (req: Request, res: Response) => {
    if (!isEmpty(req.body)) {
        db.run(`UPDATE FLOWERS SET ${req.body.column} = ? WHERE COMNAME = ?;`, [req.body.value, req.body.genus]);
    }
});

export default flowersRouter;
