import app from "./app.js"
import {sequelize} from "./db/db.js";
import dotenv from 'dotenv';
dotenv.config();


import './models/Post.model.js'
import './models/Categoria.model.js'


const main = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Conectado con éxito.')
        await sequelize.sync({force:false, alter:false, create:false});
        //rescatamos el valor del puerto y en caso de error dejamos por defecto el puerto 3000
        let PORT = process.env.PORT || 3000;
        app.listen(PORT , ()=>console.log('Servidor ejecutándose en http://localhost:' + PORT))
    } catch (error) {
        console.log(error)
        console.log('Ha ocurrido un error.')
    }
}

main();