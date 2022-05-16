import {Request, Response} from 'express';

import pool from '../database'

class CatProdController {

    public async create (req : Request,res: Response): Promise<void>{
        await pool.promise().query('INSERT INTO cat_prod set ?', [req.body]);
        res.json({message: 'Product Category saved'});
    }

}

export const catProdController = new CatProdController;