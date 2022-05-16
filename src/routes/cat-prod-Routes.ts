import {Router} from 'express';

import { catProdController } from '../controllers/cat-prod-Controller';
import JWTUtils from '../utils/jwt-utils';

class CatRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.post('/', JWTUtils.authenticateAdminToken,catProdController.create);
    }

}

const catRoutes = new CatRoutes();
export default catRoutes.router;