import { Router } from "express";
import chirpsRouter from './chirps'

//apiRouter
const router = Router();


router.use('/chirps', chirpsRouter);

export default router;