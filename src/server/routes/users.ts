import { Router } from 'express';
import db from '../db';

//  /api/users
const router = Router();

//GET USER /api/users/{id?}
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const [chirp] = await db.users.getOne(id);
        res.json(chirp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server chirp GET error', error });
    }
});

//GET ALL CHIRPS /api/users
router.get('/', async (req, res) => {
    try {
        const user = await db.users.getAll();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server chirps GET error', error });
    }
});

export default router;