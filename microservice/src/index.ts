import express, { Express, Request, Response } from 'express';
import { router } from './routes/Numbers';

const app: Express = express();

const PORT = 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \n http://localhost:${PORT}'`);
});
