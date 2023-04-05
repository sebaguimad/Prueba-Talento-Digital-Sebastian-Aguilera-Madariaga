import { Comentario } from '../models/Comentario.model.js';

const getAllComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll();
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments' });
  }
};

const createComentario = async (req, res) => {
  try {
    const { texto } = req.body;
    const comentario = await Comentario.create({ texto });
    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  }
};

const updateComentario = async (req, res) => {
  try {
    const { id_comentario } = req.params;
    const { texto } = req.body;
    await Comentario.update({ texto }, { where: { id_comentario } });
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
};

const deleteComentario = async (req, res) => {
  try {
    const { id_comentario } = req.params;
    await Comentario.destroy({ where: { id_comentario } });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

export { getAllComentarios, createComentario, updateComentario, deleteComentario };
