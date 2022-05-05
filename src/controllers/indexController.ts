import {Request, Response} from 'express';

class IndexController {

    index (req : Request,res: Response) {
        res.json({text: 'API Is in /api/productos'})
    }
}

export const indexController = new IndexController;