import {Router} from 'express';

import {catController} from '../controllers/catController';
import JWTUtils from '../utils/jwt-utils';

class CatRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', catController.list);
        this.router.get('/child', catController.childList);
        this.router.get('/:id', catController.getOne);
        this.router.post('/', JWTUtils.authenticateAdminToken,catController.create);
        this.router.delete('/:id', JWTUtils.authenticateAdminToken,catController.delete);
        this.router.put('/:id', JWTUtils.authenticateAdminToken,catController.update);
    }

}

const catRoutes = new CatRoutes();
export default catRoutes.router;