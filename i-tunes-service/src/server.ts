import 'dotenv/config';
import App from './app';
import SearchRoute from './routes/search.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new SearchRoute()]);

app.listen();
