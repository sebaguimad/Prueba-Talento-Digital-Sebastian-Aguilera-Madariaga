import { Post } from './Post.model.js';
import { Categoria } from './Categoria.model.js';
import { LikeDislike } from './LikeDislike.model.js';
import { Usuario } from './Usuario.model.js';
import { Comentario } from './Comentario.model.js';

// relaciones que funcionan:
// relación uno a muchos entre dos modelos: Categoria y Post
Categoria.hasMany(Post, { foreignKey: "id_categoria" });
Post.belongsTo(Categoria, { foreignKey: "id_categoria" });

// prueba:
// relación uno a muchos entre dos modelos: Post y LikeDislike
Post.hasMany(LikeDislike, { foreignKey: 'id_post', as: 'likesDislikes' });
LikeDislike.belongsTo(Post, { foreignKey: 'id_post', as: 'post' });

// resto de relaciones a probar

Usuario.hasMany(Post, { foreignKey: 'id_usuario' });
Post.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Usuario.hasMany(Comentario, { foreignKey: 'id_usuario' });
Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Usuario.hasMany(LikeDislike, { foreignKey: 'id_usuario' });
LikeDislike.belongsTo(Usuario, { foreignKey: 'id_usuario' });
