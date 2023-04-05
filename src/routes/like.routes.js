import express from 'express';
import {
getAllLikes,
createLike,
updateLike,
deleteLike,
getLikes,
} from '../controllers/like.controller.js';

const router = express.Router();

// GET /api/v1/likes
router.get('/api/v1/likes', getAllLikes);

// POST /api/v1/likes
router.post('/api/v1/likes', createLike);

// PUT /api/v1/likes/:id
router.put('/api/v1/likes/:id', updateLike);

// DELETE /api/v1/likes/:id
router.delete('/api/v1/likes/:id', deleteLike);

router.get('/api/v1/likes', getLikes);

export default router;