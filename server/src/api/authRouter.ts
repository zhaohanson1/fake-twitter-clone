import {Router, Request, Response} from 'express';

// eslint-disable-next-line new-cap
export const authRouter = Router({mergeParams: true});

authRouter.post('/signup', (req: Request, res: Response)=>{
    res.redirect("http://localhost:8080");  
});

authRouter.post('/login', (req: Request, res: Response) => {
    res.send({token: 'token123'});
});


module.exports = authRouter;

