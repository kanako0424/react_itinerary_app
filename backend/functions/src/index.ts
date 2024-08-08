import express, { Request, Response } from "express";
import { onRequest } from "firebase-functions/v2/https";
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('request document root');
});

app.get('/hello', (req: Request, res: Response) => {
    res.send(JSON.stringify({Key: 'helloWorld'}));
});

exports.api = onRequest(app);