import { Router } from 'express';

import NewsController from './controllers/NewsController';
import SMSController from './controllers/SMSController';
import CodeValidationController from './controllers/CodeValidationController';
import SessionController from './controllers/SessionController';

import authMiddleare from './middlewares/auth';

const routes = new Router();

routes.get('/news', NewsController.index);
routes.post('/sms', SMSController.store);
routes.post('/code', CodeValidationController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleare);
routes.post('/news', NewsController.store);
routes.delete('/news/delete/:newsId', NewsController.delete);

export default routes;
