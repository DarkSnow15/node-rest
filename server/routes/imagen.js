const express = require('express');
const {verificaTokenImg} = require('../middlewares/autenticacion')
const fs = require('fs');
const path = require('path');
let app = express();

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res)=>{
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    let noPathImg = path.resolve(__dirname, '../assets/no-image.png');

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        res.sendFile(noPathImg);
    }
    

    
})


module.exports = app;