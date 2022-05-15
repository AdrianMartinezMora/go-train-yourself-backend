import {Router} from 'express';

import {ordersController} from '../controllers/ordersController';
import JWTUtils from '../utils/jwt-utils';

class OrdersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', JWTUtils.authenticateToken, ordersController.list);
        this.router.get('/:id', JWTUtils.authenticateToken, ordersController.getOne);
        this.router.post('/', JWTUtils.authenticateToken, ordersController.create);
    }

}

const ordersRoutes = new OrdersRoutes();
export default ordersRoutes.router;