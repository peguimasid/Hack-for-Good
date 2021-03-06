import { Router } from 'express';

import NewsController from './controllers/NewsController';
import FakeNewsController from './controllers/FakeNewsController';
import SMSController from './controllers/SMSController';
import CodeValidationController from './controllers/CodeValidationController';
import SessionController from './controllers/SessionController';

import authMiddleare from './middlewares/auth';
import HelpController from './controllers/HelpController';
import ChatTwilioController from './controllers/ChatTwilioController';

const routes = new Router();

routes.get('/news', NewsController.index);
routes.post('/sms', SMSController.store);
routes.post('/code', CodeValidationController.store);

routes.post('/sessions', SessionController.store);

routes.post('/news', NewsController.store);
routes.delete('/news/delete/:newsId', NewsController.delete);

routes.get('/fakenews', FakeNewsController.index);
routes.post('/fakenews', FakeNewsController.store);
routes.delete('/fakenews/delete/:fakeNewsId', FakeNewsController.delete);

routes.use(authMiddleare);

routes.post('/help', HelpController.store);
routes.get('/help', HelpController.index);
routes.delete('/help/:id', HelpController.delete);

routes.get('/auth', ChatTwilioController.index);

export default routes;
