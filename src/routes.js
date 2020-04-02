import { Router } from 'express';

import NewsController from './controllers/NewsController';
import SMSController from './controllers/SMSController';
import CodeValidationController from './controllers/CodeValidationController';
import SessionController from './controllers/SessionController';

import authMiddleare from './middlewares/auth';
import HelpController from './controllers/HelpController';

const routes = new Router();

routes.get('/news', NewsController.index);
routes.post('/sms', SMSController.store);
routes.post('/code', CodeValidationController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleare);

routes.post('/news', NewsController.store);
routes.delete('/news/delete/:newsId', NewsController.delete);

routes.get('/fakenews', NewsController.index);
routes.post('/fakenews', NewsController.store);
routes.delete('/fakenews/delete/:newsId', NewsController.delete);

routes.post('/sms', SMSController.store);
routes.post('/help', HelpController.store);
routes.get('/help', HelpController.index);
routes.delete('/help/:id', HelpController.delete);

export default routes;
