require('dotenv').config();
const express = require('express');
const cors = require('cors');



const { dbconection } = require('./database/config'); //no requiere la extension .js
//Crear el servidor express
const app = express();

// configurar CORS
app.use(cors());
// use es una funcion midleware que siempres se va a ejecutar siempre para todas las lineas
// que estan hacia abajo

//Lectura y parseo del body
app.use(express.json());


// conexion a base de datos
dbconection();
//console.log(process.env);


//rutas del API

app.use('/api/usuarios', require('./routes/usuariosRoute'));
app.use('/api/login', require('./routes/authRoute'));
app.use('/api/libros', require('./routes/libroRoute'));
app.use('/api/copias', require('./routes/copiaRoute'));
app.use('/api/alumnos', require('./routes/alumnoRoute'));
app.use('/api/prestamos', require('./routes/prestamoRoute'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})