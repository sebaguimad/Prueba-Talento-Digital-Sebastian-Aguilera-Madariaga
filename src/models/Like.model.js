import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const Like = sequelize.define('Like', {
type: {
type: DataTypes.ENUM('like', 'dislike'),
allowNull: false,
},
});

