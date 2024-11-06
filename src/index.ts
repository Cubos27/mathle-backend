import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import {
  exploreRouter,
  subjectRouter,
  topicRouter,
  articleRouter,

  articlesRouter
} from './api';

// SETTUP
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    allowedHeaders: [ "Content-Type" ]
  }
));

// REFERENCES
app.use('/api/explore', exploreRouter );
app.use('/api/subject', subjectRouter );
app.use('/api/topic', topicRouter );
app.use('/api/article', articleRouter );

app.use('/api/admin/articles', articlesRouter );

// RUN SERVER
app.listen( port, () => {
	console.log(`[server]: Server is running at port:${ port }`);
});
