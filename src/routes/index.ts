import { Router, Request, Response } from 'express';

const router = Router();
router.get('/', renderIndex);

function renderIndex(req: Request, res: Response) {
    res.render('index');
}

export default router;