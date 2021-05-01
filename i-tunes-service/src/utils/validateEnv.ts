import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    LOG_LEVEL: str({ default: 'info' }),
  });
};

export default validateEnv;
