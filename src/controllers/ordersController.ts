import {Request, Response} from 'express';

import pool from '../database'

class OrdersController {

    public async list (req : Request,res: Response) {
        pool.query('select * from pedidos',(err,result)=>{
            res.json(result)
        });
        
    }

    public async getOne (req : Request,res: Response) {
        const { id } = req.params;
        pool.query('select * from pedidos where id = ?', [id],(err,result)=>{

            if(Array.isArray(result) && result.length>0){
                res.json(result)

            }else{
                
                res.status(404).json({text:"The Order doesn't exists"})
            }
        });
    }

    public async create (req : Request,res: Response): Promise<void>{
        let pedido = {
            idUsuario: req.body.idUsuario,
            locEntrega: req.body.locEntrega
        }
        pool.query('INSERT INTO pedidos set ?', [pedido], async (err, result: any, fields) => {
            if (err) throw err;

            for(let i = 0; i < req.body.detalle.length; i++){
                await pool.promise().query('INSERT INTO detallePedidos set ?', [{...req.body.detalle[i], idPedido: result.insertId}]);
            }
            res.json({message: 'Order saved'});
        });
    }

}

export const ordersController = new OrdersController;