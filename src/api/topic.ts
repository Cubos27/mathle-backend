import express, { Request, Response } from 'express';
import { queryToDB } from '../../db/connection';

const topicRouter = express.Router();

topicRouter.get('/:id', async( req : Request, res : Response ) => {
	try {
        const { id } = req.params;
        if (!id) res.status(400).json({ error: 'Missing ID' });

		const query = 'SELECT ID_Article, has_content, img_cover, title, type, score, description FROM Article  WHERE ID_Article = ?';
		const article = await queryToDB(query, [ id ]);
        if (article.length === 0) res.status(404).json({ error: 'No article found' });
        
        const query2 = 'SELECT ID_Article, ID_Prev_Article, has_content, title FROM Article WHERE ID_Parent = ?';
        const articles = await queryToDB(query2, [ id ]);

        const query3 = 'SELECT * FROM Article_Content WHERE ID_Article = ?';
        const content = await queryToDB(query3, [ id ]);

        const result = {
            topic: article[0],
            subtopics: articles,
            content: content
        }

		res.status(200).json( result );
	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

export default topicRouter;
