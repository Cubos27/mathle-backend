import express, { Request, Response } from 'express';
import { queryToDB } from '../../../db/connection';
import { toTitleCase } from '../../utils';

const articlesRouter = express.Router();

articlesRouter.get('/', async( req : Request, res : Response ) => {
	try {
		const query = 'SELECT ID_Article, has_content, title, type FROM Article';
		const articles = await queryToDB(query, []);
        if (articles.length === 0) res.status(404).json({ error: 'No article found' });

		const articles2Send = articles.map((article) => ({
			...article,
			title: toTitleCase(article.title),
		}));
        
		res.status(200).json({ articles2Send });
	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

export default articlesRouter;
