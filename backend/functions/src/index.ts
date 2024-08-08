/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import express, { Request, Response } from "express";
const { onRequest } = require('firebase-functions/v2/https');
// import * as logger from "firebase-functions/logger";

const app = express();

app.use((req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
})

// build multiple CRUD interfaces:
app.get('/', (req, res) => res.send(JSON.stringify({Key: 'helloWorld'})));

// Expose Express API as a single Cloud Function:
exports.widgets = onRequest(app);