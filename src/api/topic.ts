import express, { Request, Response } from 'express';
import { queryToDB } from '../../db/connection';
import { toTitleCase } from '../utils';

const topicRouter = express.Router();

type TChildArticle = {
    ID_Article: number;
    ID_Prev_Article: number;
    has_content: boolean;
    img_cover: string;
    title: string;
};

topicRouter.get('/:id', async( req : Request, res : Response ) => {
	try {
        const { id } = req.params;
        if (!id) res.status(400).json({ error: 'Missing ID' });

		const query = 'SELECT ID_Article, has_content, img_cover, title, type, score, description FROM Article  WHERE ID_Article = ?';
		const article = await queryToDB(query, [ id ]);
        if (article.length === 0) res.status(404).json({ error: 'No article found' });
        
        const query2 = 'SELECT ID_Article, ID_Prev_Article, has_content, title FROM Article WHERE ID_Parent = ?';
        const articles = await queryToDB(query2, [ id ]);
        const articles2Send = articles.map((article: TChildArticle) => ({
            ...article,
            title: toTitleCase(article.title),
        }));

        const query3 = 'SELECT * FROM Article_Content WHERE ID_Article = ?';
        const content = await queryToDB(query3, [ id ]);

        const result = {
            topic: {
                ...article[0],
                title: toTitleCase(article[0].title)
            },
            subtopics: articles2Send,
            content: content
        }

		res.status(200).json( result );
	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

export default topicRouter;
