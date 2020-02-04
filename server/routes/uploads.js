const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const User = require('../models/user');
const Producto = require('../models/producto');
app.use(fileUpload());
const fs = require('fs');

const path = require('path');

app.put('/uploads/:tipo/:id', (req, res)=>{
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: true,
            err: {
                message: 'No se ha susbido ningun archivo'
            }
        })
    }

    let tipos = ['productos', 'users'];
    if(tipos.indexOf(tipo) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son: ' + tipos.join(', ')
            }
        })
    }

    let archivo = req.files.archivo;
    let nombreArch = archivo.name.split('.');
    let extencion = nombreArch[nombreArch.length - 1];
    //Extenciones
    let extenciones = ['png', 'jpg', 'gif', 'jpeg'];
    if(extenciones.indexOf(extencion) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extenciones permitidas son: ' + extenciones.join(', '),
                ext: extencion 
            }
        })
    }
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extencion}`

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });
        
        if(tipo === 'users'){
            imagenUsuario(id, res, nombreArchivo);
        }else{
            imagenProducto(id, res, nombreArchivo);
        }
    });
});

function imagenUsuario(id, res, nombreArchivo){
    User.findById(id, (err, user)=>{
        if(err){
            borrarArchivo(nombreArchivo, 'users');
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!user){
            borrarArchivo(nombreArchivo, 'users');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        borrarArchivo(user.img, 'users');

        user.img = nombreArchivo;
        user.save((err, user)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                user,
                img: nombreArchivo
            });
        });
    })
}

function imagenProducto(id, res, nombreArchivo){
    Producto.findById(id, (err, producto)=>{
        if(err){
            return res.json({
                ok: false,
                err
            });
        }

        if(!producto){
            return res.json({
                ok: false,
                err: {
                    message: 'El id del producto no está registrado'
                }
            });
        }

        borrarArchivo(nombreArchivo, 'productos')
        producto.img = nombreArchivo
        producto.save((err, producto)=>{
            if(err){
                return res.json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto,
                img: nombreArchivo
            });
        })


    })
}

function borrarArchivo(nombreArch, tipo){
    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${nombreArch}`);
        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg);
        }
}

module.exports = app;