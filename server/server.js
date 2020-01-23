require('./config/config');


const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(require('./routes/user'));

mongoose.connect('mongodb://localhost:27017/first', (err, res) => {

    if (err) throw err;

    console.log('Base de datos Online')

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto 3000');
});