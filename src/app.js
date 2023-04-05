import express, { json, urlencoded } from 'express';
const app = express();
// Llamamos a la biblioteca path para poder unir archivos
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtenemos una función de exhbs
import { create } from 'express-handlebars';
import cors from 'cors';
import moment from 'moment'; // Importar Moment.js
import cookieParser from 'cookie-parser';

// Importamos las rutas
import apiPosts from './routes/post.routes.js';
import vistasRoutes from './routes/vistas.routes.js';
import likeRoutes from './routes/like.routes.js';

import apiUsuario from './routes/usuario.routes.js';

// Ruta de autenticación
import authRoutes from './routes/auth.routes.js';

// En caso de utilizar envío entre servidores
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//
app.use(cookieParser());

// Unión de archivos estáticos y rutas dinámicas
app.use(express.static(join(__dirname, 'public')));

// Inicio de rutas
app.use(apiPosts);
app.use(vistasRoutes);
app.use(likeRoutes);
app.use(apiUsuario);

// Agrega las rutas de autenticación al middleware de la aplicación
app.use(authRoutes);

// Asignamos la unión de los archivos views
app.set("views", join(__dirname, "views/"));

// Configuración de motor hbs
const hbs = create({
  // Se define la página principal que contendrá todo
  defaultLayout: "main",
  // Definimos y unimos los layouts y partials
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  // Definimos la extensión a utilizar
  extname: ".handlebars",
  // Registramos la función de ayuda formatDate en Handlebars
  helpers: {
    formatDate: function (date) {
      return moment(date).format('DD/MM/YYYY');
    },
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});

app.engine(".handlebars", hbs.engine);
app.set("view engine", ".handlebars");

export default app;

