import {Router} from 'express';

import {usersController} from '../controllers/usersController';
import JWTUtils from '../utils/jwt-utils';

class UsersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', usersController.list);
        this.router.get('/dis/', usersController.disList);
        this.router.get('/userVal/:nombre', usersController.validUsername);
        this.router.get('/emailVal/:nombre', usersController.validEmail);
        this.router.get('/:id', JWTUtils.authenticateToken, usersController.getOne);
        this.router.post('/', usersController.register);
        this.router.delete('/:id', JWTUtils.authenticateAdminToken,usersController.delete);
        this.router.delete('/dis/:id', JWTUtils.authenticateToken,usersController.enable);
        this.router.put('/:id', JWTUtils.authenticateToken,usersController.update);
        this.router.post('/login', usersController.login);
    }

}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;