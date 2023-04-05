import { Post } from '../models/Post.model.js';
import { Categoria } from '../models/Categoria.model.js';

// controladores de post y categoria
export const getPosts = async (req, res) => {
  Post.findAll().then(posts => {
    res.json({ code: 200, data: posts })
  }).catch(error => {
    res.json({ code: 500, message: "Error al cargar los datos" })
  })
};

export const getPostById = async (req, res) => {
  try {
    let { id } = req.params
    let post = await Post.findByPk(id);
    res.status(200).json({code : 200 , data : post})
  } catch (error) {
    res.status(500).json({code: 500 , message : "Error al cargar los posts"})
  }
};

// Añadir un post a la base de datos
export const addPostInventory = async (req, res) => {
  try {
    let { titulo, contenido, imagen, categoria, autor } = req.body;
      
    let post = await Post.create({ 
      titulo,
      contenido,
      imagen,
      categoria,
      autor,
    });

    res.status(201).json({ code: 201, message: "Post ingresado con éxito." });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Error al guardar el post." });
  }
};

// Eliminar un post por id_post
export const deletePostById = async (req, res) => {
  try {
    const { id_post } = req.params;
    const result = await Post.destroy({ where: { id_post } });

    if (result) {
      res.status(200).json({ code: 200, message: "Post eliminado con éxito." });
    } else {
      res.status(404).json({ code: 404, message: "Post no encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Error al eliminar el post." });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const { id_post } = req.params;
    const { titulo, contenido, imagen, categoria } = req.body;

    const result = await Post.update(
      {
        titulo,
        contenido,
        imagen,
        categoria,
        autor,
      },
      {
        where: { id_post },
      }
    );

    if (result[0]) {
      res.status(200).json({ code: 200, message: "Post actualizado con éxito." });
    } else {
      res.status(404).json({ code: 404, message: "Post no encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Error al actualizar el post." });
  }
};


// controladores categorias

export const createCategory = async (req, res) => {
  try {
      const { nombre_categoria } = req.body;
      if (!nombre_categoria) {
        throw new Error("El nombre de la categoría es requerido.");
      }
      const categoria = await Categoria.create({
          nombre_categoria
      });
      res.status(201).send({
          success: true,
          message: 'Categoría creada con éxito',
          data: categoria
      });
  } catch (error) {
      res.status(400).send({
          success: false,
          message: error.message
      });
  }
};


export const getCategories = async (req, res) => {
    try {
      const categories = await Categoria.findAll();
      res.status(200).json({ code: 200, data: categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: 500, message: "Error al cargar las categorías" });
    }
};

export const getCategoryByName = async (req, res) => {
  try {
    const categoryName = decodeURIComponent(req.params.nombre_de_la_categoria);

    const category = await Categoria.findOne({ where: { nombre_categoria: categoryName } });

    if (!category) {
      return res.status(404).json({ message: `No se encontró la categoría con el nombre ${categoryName}` });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la categoría' });
  }
};



// Eliminar una categoría por id_categoria
export const deleteCategoryById = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const result = await Categoria.destroy({ where: { id_categoria } });

    if (result) {
      res.status(200).json({ code: 200, message: "Categoría eliminada con éxito." });
    } else {
      res.status(404).json({ code: 404, message: "Categoría no encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Error al eliminar la categoría." });
  }
};


export const updateCategoryById = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const { nombre_categoria } = req.body;

    const result = await Categoria.update(
      {
        nombre_categoria,
      },
      {
        where: { id_categoria },
      }
    );

    if (result[0]) {
      res.status(200).json({ code: 200, message: "Categoría actualizada con éxito." });
    } else {
      res.status(404).json({ code: 404, message: "Categoría no encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Error al actualizar la categoría." });
  }
};



