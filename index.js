const express = require('express');
const { dbConexion } = require('./db/config');
const cors = require('cors');
require('dotenv').config();

//crear el servidor de express

const app = express();


//habilitar cors
const whiteList = [ 'http://localhost:4000'];
const corsOptions = {
    origin: (origin, callbaback) => {
        //console.log(origin);
        const existe = whiteList.some(dominio => dominio === origin);
        if (existe) {
            callbaback(null, true)
        } else {
            callbaback(new Error('No permitido por cors'))
        }
    }
}


//cors
app.use(cors())

//base de datos
dbConexion();

//Directorio público
app.use(express.static('public'))

//lecutra y aprse del body
app.use(express.json());

//rutas
//TODO:  auth / login / renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events',require('./routes/events'));


//TOD crud: eventos



//escuchcar peticiones
const host  = process.env.HOST || '0.0.0.0';

app.listen(process.env.PORT,host,()=> console.log(`Servidor corriendo en puerto ${process.env.PORT}`))