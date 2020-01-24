require('./config/config');


const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(require('./routes/user'));

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