import {Request, Response} from 'express';

import pool from '../database'

class ProductsController {

    public async list (req : Request,res: Response) {
        pool.query('select * from productos where estado = 1',(err,result)=>{
            res.json(result)
        });
        
    }

    public async getProdByCat (req : Request,res: Response) {
        const { id } = req.params;
        pool.query('SELECT P.* FROM productos P, categorias C, cat_prod CP WHERE C.id=? AND C.id=CP.id_cat AND CP.id_prod=P.id AND P.estado=1 GROUP BY P.id', [id],(err,result)=>{

            if(Array.isArray(result) && result.length>0){
                res.json(result)

            }else{
                
                res.status(404).json({text:"The product doesn't exists"})
            }
        });
    }

    public async getOne (req : Request,res: Response) {
        const { id } = req.params;
        pool.query('select * from productos where id = ?', [id],(err,result)=>{

            if(Array.isArray(result) && result.length>0){
                res.json(result)

            }else{
                
                res.status(404).json({text:"The product doesn't exists"})
            }
        });
    }

    public async create (req : Request,res: Response): Promise<void>{
        await pool.promise().query('INSERT INTO productos set ?', [req.body]);
        res.json({message: 'Product saved'});
    }

    public async update (req : Request,res: Response){
        const{id}=req.params;
        await pool.promise().query('UPDATE productos set ? WHERE id =?', [req.body,id]);
        res.json({message: 'Product updated'});
    }

    public async delete (req : Request,res: Response){
        const{id}=req.params;
        await pool.promise().query('UPDATE productos set estado = 0 WHERE id =?', [id]);
        res.json({message: 'Product deleted'});
    } 

}

export const productsController = new ProductsController;