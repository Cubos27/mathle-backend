import express, { Request, Response } from 'express';
import { queryToDB } from '../../db/connection';
import { toTitleCase } from '../utils';

const exploreRouter = express.Router();

exploreRouter.get('/', async( req : Request, res : Response ) => {
	try {
		const query =  `
	SELECT 
		a.ID_Article, 
		a.title AS article_title, 
		a.ID_Parent,
		a.img_cover, 
		a.type, 
		a.score, 
		p.ID_Article AS parent_id, 
		p.title AS parent_title, 
		gp.ID_Article AS grandparent_id, 
		gp.title AS grandparent_title
	FROM 
		Article a
	LEFT JOIN 
		Article p ON a.ID_Parent = p.ID_Article
	LEFT JOIN 
		Article gp ON p.ID_Parent = gp.ID_Article
`;
		const articles = await queryToDB(query, []);
		const articles2Send = articles.map((article : any) => {
			article.title = toTitleCase( article.article_title );
			article.parent_title = ( article.parent_title ) ? toTitleCase( article.parent_title ) : null;
			article.grandparent_title = ( article.grandparent_title ) ? toTitleCase( article.grandparent_title ) : null;
			return article;
		});
		
		res.status(200).json( articles2Send );
	} catch (error) {
		console.error('Error fetching articles:', error);
		res.status(500).json({ error: 'Error fetching articles' });
	}
});

exploreRouter.get('/:sample', async( req : Request, res : Response ) => {
	const { sample } = req.params;
	try {
		const query = `
    SELECT 
        a.ID_Article, 
        a.title AS article_title, 
        a.img_cover, 
        a.type, 
        a.score, 
        p.ID_Article AS parent_id, 
        p.title AS parent_title, 
        gp.ID_Article AS grandparent_id, 
        gp.title AS grandparent_title
    FROM 
        Article a
    LEFT JOIN 
        Article p ON a.ID_Parent = p.ID_Article
    LEFT JOIN 
        Article gp ON p.ID_Parent = gp.ID_Article
    WHERE 
        a.title LIKE ?
`;

		const articles = await queryToDB(query, [ `%${sample}%` ]);
		const articles2Send = articles.map((article : any) => {
			article.title = toTitleCase(article.article_title);
			article.parent_title = ( article.parent_title ) ? toTitleCase(article.parent_title) : null;
			article.grandparent_title = ( article.grandparent_title ) ? toTitleCase(article.grandparent_title) : null;
			return article;
		});

		if (articles.length === 0) res.status(404).json({ error: 'No articles found' });
		else res.status(200).json( articles2Send );

	} catch (error) {
		console.error('Error fetching articles:', error);
		res.status(500).json({ error: 'Error fetching articles' });
	}
});


export default exploreRouter;
