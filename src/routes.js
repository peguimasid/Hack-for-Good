import { Router } from 'express';

import NewsController from './controllers/NewsController';
import FakeNewsController from './controllers/FakeNewsController';

const routes = new Router();

routes.get('/news', NewsController.index);
routes.post('/news', NewsController.store);
routes.delete('/news/delete/:newsId', NewsController.delete);

routes.post('/fakenews', FakeNewsController.store);
routes.get('/fakenews', FakeNewsController.index);

export default routes;
