import express, { Request, Response } from 'express';
import { queryToDB } from '../../../db/connection';

import { toLowerCase, toTitleCase } from '../../utils';

const editorRouter = express.Router();

editorRouter.post('/', async( req : Request, res : Response ) => {
	try {
        if (!req.body) {
            res.status(400).json({ error: 'Missing article data' });
            return;
        }

        const query = `INSERT INTO article ( 
            ID_Parent, 
            ID_Prev_Article, 
            title, 
            type, 
            description, 
            has_content, 
            img_cover, 
            parent_type, 
            score
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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

        const ans = await queryToDB(query, [ 
            ID_Parent, 
            ID_Prev_Article, 
            toLowerCase( title ), 
            parseInt( type ), 
            description, 
            has_content, 
            img_cover, 
            parent_type, 
            parseInt( score ) 
        ]);
        if ( ans.affectedRows === 0 ) {
            res.status(500).json({ error: 'Error inserting article' });
            return;
        }

        if ( ( content && content.length > 0 ) || has_content ) {
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

        const article = { ...ans1[0], title : toTitleCase( ans1[0].title ) ,content: '' };
        const query2 = `SELECT content FROM article_content WHERE ID_Article = ?`;
        const ans2 = await queryToDB(query2, [id]);

        article.content = ans2.length > 0 ? ans2[0].content : 'No content found';

        res.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Error fetching article' });
    }
});

editorRouter.put('/:id', async( req : Request, res : Response ) => {
	try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Missing article ID' });
            return;
        }

		if (!req.body) {
            res.status(400).json({ error: 'Missing article data' });
            return;
        }

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
        const query = `
            UPDATE article 
            SET 
                ID_Parent = ?, 
                ID_Prev_Article = ?, 
                title = ?, 
                type = ?, 
                description = ?, 
                has_content = ?, 
                img_cover = ?, 
                parent_type = ?, 
                score = ?
            WHERE ID_Article = ?`;

        const ans = await queryToDB(query, [ 
            ID_Parent, 
            ID_Prev_Article, 
            toLowerCase( title ), 
            parseInt( type ), 
            description, 
            has_content, 
            img_cover, 
            parent_type, 
            parseInt( score ),
            id
        ]);
        if (ans.affectedRows === 0) {
            res.status(404).json({ error: 'Article not found or failed to update' });
            return;
        }

        if ( ( content && content.length ) > 0 || has_content) {
            const contentQuery = `SELECT * FROM article_content WHERE ID_Article = ?`;
            const existingContent = await queryToDB(contentQuery, [id]);

            if ( existingContent.length > 0 ) {// TODO: Allow Article_Content table to have ID primary key
                const updateContentQuery = `UPDATE article_content SET content = ? WHERE ID_Article = ?`;
                const ans2 = await queryToDB(updateContentQuery, [ content, id ]);

                if (ans2.affectedRows === 0) {
                    res.status(500).json({ error: 'Error updating article content' });
                    return;
                }
            } else { // if there's no content, insert it
                const insertContentQuery = `INSERT INTO article_content (ID_Article, content) VALUES (?, ?)`;
                const ans2 = await queryToDB(insertContentQuery, [id, content || 'No content found']);

                if (ans2.affectedRows === 0) {
                    res.status(500).json({ error: 'Error inserting article content' });
                    return;
                }
            }
        }

        res.status(200).json({ message: 'Article updated successfully' });
        return;
	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

export default editorRouter;
