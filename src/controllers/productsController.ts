import {Request, Response} from 'express';

import pool from '../database'

class ProductsController {

    public async list (req : Request,res: Response) {
        pool.query('select * from productos where estado = 1 ORDER BY prioridad desc',(err,result)=>{
            res.json(result)
        });
        
    }

    public async disList (req : Request,res: Response) {
        pool.query('select * from productos where estado = 0',(err,result)=>{
            res.json(result)
        });
        
    }

    public async getProdByCat (req : Request,res: Response) {
        const { id } = req.params;
        pool.query('SELECT P.* FROM productos P, categorias C, cat_prod CP WHERE C.id=? AND C.id=CP.idCat AND CP.idProd=P.id AND P.estado=1 ORDER BY prioridad desc', [id],(err,result)=>{
            res.json(result)
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


    public async create(req : Request,res: Response){
        pool.query('INSERT INTO productos set ?', [req.body],(err,result)=>{
                res.json(result)
        });
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

    public async enable (req : Request,res: Response){
        const{id}=req.params;
        await pool.promise().query('UPDATE productos set estado = 1 WHERE id =?', [id]);
        res.json({message: 'Product enabled'});
    } 

}

export const productsController = new ProductsController;