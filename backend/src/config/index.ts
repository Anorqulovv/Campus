import { config } from 'dotenv';
config();

export const envConfig = {
  PORT: Number(process.env.PORT),
  DB_URL: String(process.env.DB_URL),
  TOKEN_KEY: String(process.env.TOKEN_KEY),
  TOKEN_TIME: Number(process.env.TOKEN_TIME),
  UPLOAD_PATH: String(process.env.UPLOAD_PATH),
  BASE_URL: String(process.env.BASE_URL),
  SUPERADMIN: {
    USERNAME: String(process.env.SUPERADMIN_USERNAME),
    PASSWORD: String(process.env.SUPERADMIN_PASSWORD),
    EMAIL: String(process.env.SUPERADMIN_EMAIL),
  },
};
