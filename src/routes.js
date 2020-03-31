import { Router } from 'express';

import NewsController from './controllers/NewsController';
import SMSController from './controllers/SMSController';

const routes = new Router();

routes.get('/news', NewsController.index);
routes.post('/news', NewsController.store);
routes.delete('/news/delete/:newsId', NewsController.delete);

routes.get('/fakenews', NewsController.index);
routes.post('/fakenews', NewsController.store);
routes.delete('/fakenews/delete/:newsId', NewsController.delete);

routes.post('/sms', SMSController.store);

export default routes;
