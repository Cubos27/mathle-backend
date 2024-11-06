import express, { Request, Response } from 'express';
import { queryToDB } from '../../../db/connection';

const articlesRouter = express.Router();

articlesRouter.get('/', async( req : Request, res : Response ) => {
	try {
		const query = 'SELECT ID_Article, has_content, title, type FROM Article';
		const articles = await queryToDB(query, []);
        if (articles.length === 0) res.status(404).json({ error: 'No article found' });
        
		res.status(200).json({ articles });
	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

export default articlesRouter;
