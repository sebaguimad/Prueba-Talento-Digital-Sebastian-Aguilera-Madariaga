import { Post } from '../models/Post.model.js';

import { Like } from '../models/Like.model.js';

export const getAllLikes = async (req, res, next) => {
try {
const likes = await Like.findAll();
res.status(200).json(likes);
} catch (error) {
next(error);
}
};

export const createLike = async (req, res, next) => {
try {
const { postId, userId, type } = req.body;
const like = await Like.create({ postId, userId, type });
res.status(201).json(like);
} catch (error) {
next(error);
}
};


export const updateLike = async (req, res, next) => {
    try {
    const { id } = req.params;
    const { postId, userId, type } = req.body;
    const like = await Like.findOne({ where: { id } });
    if (!like) {
        res.status(404).json({ message: 'No se encontró el like con el id proporcionado.' });
      } else {
        await like.update({ postId, userId, type });
        res.status(200).json(like);
      }
    } catch (error) {
        next(error);
        }
};


export const deleteLike = async (req, res, next) => {
    try {
    const { id } = req.params;
    const like = await Like.findOne({ where: { id } });
    if (!like) {
        res.status(404).json({ message: 'No se encontró el like con el id proporcionado.' });
      } else {
        await like.destroy();
        res.status(204).end();
      }
    } catch (error) {
        next(error);
        }
};


export const getLikes = async (req, res) => {
  const id_post = req.query.id_post;

  if (!id_post) {
    res.status(400).json({ code: 400, message: "Falta el parámetro id_post" });
    return;
  }

  try {
    const likes = await Like.findAll({
      where: { id_post: id_post },
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('type')), 'count']
      ],
      group: ['type']
    });

    const response = {
      likes: 0,
      dislikes: 0
    };

    likes.forEach(like => {
      if (like.type === 'like') {
        response.likes = parseInt(like.get('count'));
      } else {
        response.dislikes = parseInt(like.get('count'));
      }
    });

    res.json({ code: 200, data: response });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Error al cargar los datos" });
  }
};


export const countLikes = async (req, res, next) => {
  const { postId } = req.body;
  try {
    // Buscar el post por su ID
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'No se encontró el post con el ID proporcionado.' });
    }

    // Contar los likes del post
    const likes = await Like.count({ where: { postId, type: 'like' } });

    // Contar los dislikes del post
    const dislikes = await Like.count({ where: { postId, type: 'dislike' } });

    // Guardar los likes y dislikes en la base de datos
    post.likes = likes;
    post.dislikes = dislikes;
    await post.save();

    // Devolver la respuesta
    res.status(200).json({ likes, dislikes });
  } catch (error) {
    next(error);
  }
};