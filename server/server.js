require('./config/config');

const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(require('./routes/index'));

app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.URLDB, {
     useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
    }, 
    (err, res) => {

    if (err) throw err;

    console.log('Base de datos Online')

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto 3000');
});