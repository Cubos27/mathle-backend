import express, { Request, Response } from 'express';
import { queryToDB } from '../../db/connection';

const exploreRouter = express.Router();

exploreRouter.get('/', async( req : Request, res : Response ) => {
	try {
		const query = 'SELECT ID_Article, ID_Parent, img_cover, title, type, score FROM Article';
		const articles = await queryToDB(query, []);
		res.status(200).json(articles);
	} catch (error) {
		console.error('Error fetching articles:', error);
		res.status(500).json({ error: 'Error fetching articles' });
	}
});

export default exploreRouter;
