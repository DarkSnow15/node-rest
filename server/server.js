require('./config/config');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 
app.get('/', function (req, res) {
    res.json('Hello World')
});

app.get('/usuario', function (req, res) {
    res.json('get usuario')
});
 
app.post('/usuario', function (req, res) {
    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'Se requiere el nombre'
        });
    }else{
        res.json({
            body
        });    
    }
    
});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/', function (req, res) {
    res.json('Hello World')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto 3000');
});