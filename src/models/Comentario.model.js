import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

export const Comentario = sequelize.define(
  'Comentario',
  {
    id_comentario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    tableName: 'Comentario',
    modelName: 'Comentario',
  }
);
