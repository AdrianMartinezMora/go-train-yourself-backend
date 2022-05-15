import {Router} from 'express';

import {productsController} from '../controllers/productsController';
import JWTUtils from '../utils/jwt-utils';

class ProductsRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/catMenu/:id', productsController.getProdByCat);
        this.router.get('/search/:search', productsController.getProdBySearch);
        this.router.get('/', productsController.list);
        this.router.get('/:id', productsController.getOne);
        this.router.post('/', JWTUtils.authenticateAdminToken, productsController.create);
        this.router.delete('/:id', JWTUtils.authenticateAdminToken, productsController.delete);
        this.router.put('/:id', JWTUtils.authenticateAdminToken, productsController.update);
    }

}

const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;