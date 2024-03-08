import { Router } from 'express';
import db from '../db';

//  /api/chirps
const router = Router();

//GET CHIRP /api/chirps/user_{id?}
router.get('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const chirp = await db.chirps.getChirpsFromUser(id);
        res.json(chirp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server chirp GET error', error });
    }
});

//GET CHIRP /api/chirps/{id?}
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const [chirp] = await db.chirps.getOne(id);
        res.json(chirp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server chirp GET error', error });
    }
});

//GET ALL CHIRPS /api/chirps
router.get('/', async (req, res) => {
    try {
        const chirp = await db.chirps.getAll();
        res.json(chirp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server chirps GET error', error });
    }
});

//POST CHIRP /api/chirps
router.post('/', async (req, res) => {
    try {
        const newChirp = req.body;
        console.log(newChirp.mentioned, '           ', newChirp.mentions)
        const result = await db.chirps.createChirp(newChirp.user_id, newChirp.body, newChirp.location, newChirp.mentioned);
        res.json({ message: 'Chirp Created', id: result.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server chirp POST error', error });
    }
});

//PUT CHIRP /api/chirps/edit/{id}
router.put('/edit/:id', async (req, res) => {
    try {
        const newChirp = req.body;
        const chirpId = parseInt(req.params.id, 10);
        console.log(newChirp.id);
        const result = await db.chirps.editChirp(chirpId, newChirp.body, newChirp.mentioned);
        res.json({ message: 'Chirp Edited', id: chirpId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server chirp PUT error', error });
    }
})

//DELETE CHIRP /api/chirps/delete/{id?}
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        console.log('meow meow! delete')
        await db.chirps.deleteChirp(id);
        res.json({ message: 'Chirp Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server chirp DELETE error', error });
    }
});

export default router;