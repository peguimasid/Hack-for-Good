import { Router } from 'express';

import NewsController from './controllers/NewsController';

const routes = new Router();

routes.get('/news', NewsController.index);
routes.post('/news', NewsController.store);
routes.delete('/news/delete/:newsId', NewsController.delete);

export default routes;
