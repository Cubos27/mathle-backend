import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { connectToDB, queryToDB } from '../db/connection';

// SETTUP
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

// RUN SERVER
app.listen( port, () => {
	console.log(`[server]: Server is running at port:${ port }`);
	connectToDB();
});
