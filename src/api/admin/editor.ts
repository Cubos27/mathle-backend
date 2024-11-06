import express, { Request, Response } from 'express';
import { queryToDB } from '../../../db/connection';

const editorRouter = express.Router();

editorRouter.post('/', async( req : Request, res : Response ) => {
	try {
		console.log(req.body);
	} catch (error) {
		console.error('Error fetching article:', error);
		res.status(500).json({ error: 'Error fetching article' });
	}
});

export default editorRouter;
