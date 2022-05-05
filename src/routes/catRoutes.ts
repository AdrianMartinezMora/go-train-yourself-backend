import {Router} from 'express';

import {catController} from '../controllers/catController';

class CatRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', catController.list);
        this.router.get('/:id', catController.getOne);
        this.router.post('/',catController.create);
        this.router.delete('/:id',catController.delete);
        this.router.put('/:id',catController.update);
    }

}

const catRoutes = new CatRoutes();
export default catRoutes.router;