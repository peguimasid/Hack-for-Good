import { Router } from 'express';

import NewsController from './controllers/NewsController';
import SMSController from './controllers/SMSController';
import CodeValidationController from './controllers/CodeValidationController';
import SessionController from './controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/news', NewsController.index);
routes.post('/news', NewsController.store);
routes.delete('/news/delete/:newsId', NewsController.delete);

routes.post('/sms', SMSController.store);

routes.post('/code', CodeValidationController.store);

export default routes;
