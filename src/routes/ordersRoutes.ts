import {Router} from 'express';

import {ordersController} from '../controllers/ordersController';

class OrdersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', ordersController.list);
        this.router.get('/:id', ordersController.getOne);
        this.router.post('/',ordersController.create);
    }

}

const ordersRoutes = new OrdersRoutes();
export default ordersRoutes.router;