import {Router, Request, Response} from 'express';
import path from 'path';

// eslint-disable-next-line new-cap
export const router = Router();

router.get('/*', (req: Request, res: Response) => {
  const indexPath = path.resolve(__dirname + '../../../public/index.html');
  res.sendFile(indexPath), (err: any) => {
    if (err) {
      res.status(500).send(err);
    }
  };
});

module.exports = router;
