// src/app.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { notFound, errorHandler } from './middlewares';
import { MessageResponse } from './types/Messages';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Root route
app.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API Gateway is running 🚀',
  });
});

// ---- API Gateway setup ----
const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY || '';

const services = [
  { route: '/api1', target: 'https://api.github.com' },
  { route: '/api2', target: 'https://jsonplaceholder.typicode.com' },
  { route: '/weather', target: 'https://api.openweathermap.org' }
];

services.forEach(({ route, target }) => {
  const isWeather = route === '/weather';

  app.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: process.env.NODE_ENV === 'production',
      pathRewrite: (pathReq: string, req: Request) => {
        if (!isWeather) {
          return pathReq.replace(new RegExp(`^${route}`), '');
        }
        // Handle weather requests
        let newPath = pathReq.replace(new RegExp(`^${route}`), '/data/2.5/weather');
        const origHasAppid = req.originalUrl.includes('appid=');
        if (!origHasAppid) {
          newPath += (newPath.includes('?') ? '&' : '?') + 'appid=' + OPENWEATHER_KEY;
        }
        return newPath;
      },
    })
  );
});

// ---- Middlewares ----
app.use(notFound);
app.use(errorHandler);

export default app;
