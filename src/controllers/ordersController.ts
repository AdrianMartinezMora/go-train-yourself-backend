import {Request, Response} from 'express';

import pool from '../database'

class OrdersController {

    public async list (req : Request,res: Response) {
        pool.query('select * from pedidos ORDER by id desc',(err,result)=>{
            res.json(result)
        });
        
    }

    public async userOrderlist (req : Request,res: Response) {
        const { id } = req.params;
        pool.query('select * from pedidos where idUsuario = ? ORDER by id desc', [id],(err,result)=>{

            if(Array.isArray(result) && result.length>0){
                res.json(result)

            }else{
                
                res.status(404).json({text:"The user doesn't have orders"})
            }
        });        
    }

    public async detallePedido (req : Request,res: Response) {
        const { id } = req.params;
        pool.query('SELECT p.id as idPed,pt.id,pt.nombreProd,pt.precio,pt.foto, p.precioTotal, ROUND((dp.cantidad * pt.precio),2) AS Precio_Detalle,dp.cantidad'
        + ' FROM pedidos p, detallePedidos dp, productos pt'
        + ' WHERE dp.idPedido = p.id'
        + ' AND dp.idProducto = pt.id'
        + ' AND dp.idPedido = ?', [id],(err,result)=>{

            if(Array.isArray(result) && result.length>0){
                res.json(result)

            }else{
                
                res.status(404).json({text:"This order doesn't exist"})
            }
        });        
    }

    public async create (req : Request,res: Response): Promise<void>{
        let pedido = {
            idUsuario: req.body.idUsuario,
            locEntrega: req.body.locEntrega,
            precioTotal: req.body.precioTotal
        }
        pool.query('INSERT INTO pedidos set ?', [pedido], async (err, result: any, fields) => {
            if (err) throw err;

            for(let i = 0; i < req.body.detalle.length; i++){
                console.log(req.body.detalle[i].cantidad + '/' + req.body.detalle[i].idProducto);
                
                await pool.promise().query("UPDATE productos set stock = stock - ? WHERE id =?", [req.body.detalle[i].cantidad, req.body.detalle[i].idProducto ]);
                await pool.promise().query('INSERT INTO detallePedidos set ?', [{...req.body.detalle[i], idPedido: result.insertId}]);
            }
            res.json({message: 'Order saved'});
        });
    }

}

export const ordersController = new OrdersController;