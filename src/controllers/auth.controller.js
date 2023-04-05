import { Usuario } from '../models/Usuario.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';


export const register = async (req, res) => {
    try {
      const { nombre, email, password } = req.body;
  
      // Comprueba si el correo electrónico ya está registrado
      const existingUser = await Usuario.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
      }
  
      // Cifrar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Crear el usuario
      const newUser = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: 'Registro completado', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error en el registro', error });
    }
};

// middleware para verificar si el usuario está autenticado en función del token guardado en localstorage
export const checkAuthentication = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect('/login');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};

//lógica logout
export const logout = (req, res) => {
  // Elimina el token JWT almacenado en las cookies
  res.clearCookie('jwt');
  // Redirige al usuario a la página principal o a la página de inicio de sesión
  res.redirect('/');
};
