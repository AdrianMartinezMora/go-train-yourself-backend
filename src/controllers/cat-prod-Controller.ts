import {Request, Response} from 'express';

import pool from '../database'

class CatProdController {

    public async create (req : Request,res: Response): Promise<void>{
        await pool.promise().query('INSERT INTO cat_prod set ?', [req.body]);
        res.json({message: 'Product Category saved'});
    }

    public async delete (req : Request,res: Response){
        const{id}=req.params;
        await pool.promise().query('DELETE FROM cat_prod WHERE idProd = ?;', [id]);
        res.json({message: 'ProdCats deleted'});
    } 

}

export const catProdController = new CatProdController;