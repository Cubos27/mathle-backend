import express, { Request, Response } from 'express';
import { queryToDB } from '../../db/connection';

const articleRouter = express.Router();

articleRouter.get('/:id', async( req : Request, res : Response ) => {
	try {
        const { id } = req.params;
        if (!id) res.status(400).json({ error: 'Missing ID' });

		const query = 'SELECT ID_Article, has_content, img_cover, title, score FROM Article  WHERE ID_Article = ?';
		const article = await queryToDB(query, [ id ]);
        if (article.length === 0) res.status(404).json({ error: 'No article found' });

        const query2 = 'SELECT content FROM Article_Content WHERE ID_Article = ?';
        const content = await queryToDB(query2, [ id ]);
        if (content.length === 0) res.status(404).json({ error: 'No content found' });

        const result = {
            ...article[0],
            content : content[ 0 ].content
        }

		res.status(200).json( result );
	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

export default articleRouter;
