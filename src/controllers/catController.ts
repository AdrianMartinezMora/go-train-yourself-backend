import {Request, Response} from 'express';

import pool from '../database'

class CatController {

    public async list (req : Request,res: Response) {
        pool.query('select * from categorias where estado=1',(err,result)=>{
            res.json(result)
        });
        
    }

    public async childList (req : Request,res: Response) {
        pool.query('select * from categorias where primaria IS NOT True and estado=1',(err,result)=>{
            res.json(result)
        });
        
    }

    public async getOne (req : Request,res: Response) {
        const { id } = req.params;
        pool.query('select * from categorias where id = ?', [id],(err,result)=>{

            if(Array.isArray(result) && result.length>0){
                res.json(result)

            }else{
                
                res.status(404).json({text:"The category doesn't exists"})
            }
        });
    }

    public async create (req : Request,res: Response): Promise<void>{
        await pool.promise().query('INSERT INTO categorias set ?', [req.body]);
        res.json({message: 'Category saved'});
    }

    public async update (req : Request,res: Response){
        const{id}=req.params;
        await pool.promise().query('UPDATE categorias set ? WHERE id =?', [req.body,id]);
        res.json({message: 'Category updated'});
    }

    public async delete (req : Request,res: Response){
        const{id}=req.params;
        await pool.promise().query('UPDATE categorias set estado = 0 WHERE id =?', [id]);
        res.json({message: 'Category deleted'});
    } 

}

export const catController = new CatController;