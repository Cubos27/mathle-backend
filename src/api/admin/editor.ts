import express, { Request, Response } from 'express';
import { queryToDB } from '../../../db/connection';

const editorRouter = express.Router();

editorRouter.post('/', async( req : Request, res : Response ) => {
	try {
		console.log(req.body);
        if (!req.body) {
            res.status(400).json({ error: 'Missing article data' });
            return;
        }

        const query = `INSERT INTO article ( ID_Parent, ID_Prev_Article, title, type, description, has_content, img_cover, parent_type, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const { 
            parent : ID_Parent,
            previousArticle : ID_Prev_Article,
            title, 
            type, 
            description, 
            hasContent : has_content, 
            imageCover : img_cover, 
            parentType : parent_type, 
            totalScore : score,
            content
        } = req.body;

        const ans = await queryToDB(query, [ ID_Parent, ID_Prev_Article, title, parseInt( type ), description, has_content, img_cover, parent_type, parseInt( score ) ]);

        if ( content.length > 0 || has_content ) {
            const query2 = `INSERT INTO article_content ( ID_Article, content ) VALUES (?, ?)`;
            const ans2 = await queryToDB(query2, [ ans.insertId, content || 'No content found' ]);

            if ( ans2.affectedRows === 0 ) {
                res.status(500).json({ error: 'Error inserting article content' });
                return;
            }

            res.status(200).json({ message: 'Article created successfully' });
            return;
        }

        res.status(200).json({ message: 'Article created successfully' });
        return;

	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

editorRouter.get('/:id', async( req : Request, res : Response ) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Missing article ID' });
            return;
        }

        const query = `SELECT * FROM article WHERE ID_Article = ?`;
        const ans1 = await queryToDB(query, [id]);
        if ( ans1.length === 0 ) {
            res.status(404).json({ error: 'Article not found' });
            return;
        }

        const article = { ...ans1[0], content: '' };
        const query2 = `SELECT content FROM article_content WHERE ID_Article = ?`;
        const ans2 = await queryToDB(query2, [id]);

        article.content = ans2.length > 0 ? ans2[0].content : 'No content found';
        console.log(article.content);

        res.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Error fetching article' });
    }
});

editorRouter.post('/:id', async( req : Request, res : Response ) => {
	try {
		console.log(req.body);
	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

export default editorRouter;
