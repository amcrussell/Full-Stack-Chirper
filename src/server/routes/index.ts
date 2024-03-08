import { Router } from "express";
import chirpsRouter from './chirps';
import usersRouter from './users';

//apiRouter
const router = Router();


router.use('/chirps', chirpsRouter);
router.use('/users', usersRouter)

export default router;