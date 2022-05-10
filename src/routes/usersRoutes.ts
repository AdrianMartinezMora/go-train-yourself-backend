import {Router} from 'express';

import {usersController} from '../controllers/usersController';

class UsersRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', usersController.list);
        this.router.get('/regOk/:nombre', usersController.registerOk);
        this.router.get('/:id', usersController.getOne);
        this.router.post('/',usersController.register);
        this.router.delete('/:id',usersController.delete);
        this.router.put('/:id',usersController.update);
        this.router.post('/login',usersController.login);
    }

}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;