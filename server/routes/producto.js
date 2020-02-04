const express = require('express');

const {verificaToken} = require('../middlewares/autenticacion')

let app = express();
let Producto = require('../models/producto');

app.get('/productos', (req, res) => {
    let pag = Number(req.query.pag);
    Producto.find({disponible: true})
        .populate('usuario', 'email nombre')
        .populate('categoria', 'nombre')
        .skip(pag)
        .limit(5)
        .exec((err, productos)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productos
            });
        });
});

app.get('/producto/:id', (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'email nombre')
        .populate('categoria', 'nombre')
        .exec((err, producto) =>{
            if(!producto){
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'EL id del producto no existe'
                    }
                })
            }

            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            
            res.json({
                ok: true,
                producto
            })
        })
});

app.post('/producto', verificaToken, (req, res)=>{
    let body = req.body
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoriaId,
        usuario: req.usuario._id
    });

    producto.save((err, producto)=>{
        if(!producto){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            producto
        });
    });
});

app.put('/producto/:id', verificaToken, (req, res) => {
    let body = req.body;
    let id = req.params.id;
    Producto.findById(id, (err, producto)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if(!producto){
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'EL id del producto no existe'
                }
            })
        }
        producto.nombre =  body.nombre;
        producto.precioUni = body.precioUni;
        producto.categoria =  body.categoria;
        producto.disponible =  body.disponible;
        producto.descripcion = body.descripcion;

        producto.save((err, producto)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            });
        });
        
    });
});

app.delete('/producto/:id', verificaToken, (req, res)=>{
    let id = req.params.id;
    let upProducto = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, upProducto, (err, producto)=>{
        if(!producto){
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'EL id del producto no existe'
                }
            })
        }

        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto
        })
    });
});

app.get('/producto/buscar/:prod', (req, res) => {
    let prod = req.params.prod;
    let regex = new RegExp(prod, 'i'); 
    Producto.find({ nombre: regex})
        .populate('categoria', 'nombre')
        .exec((err, productos) =>{

            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            
            res.json({
                ok: true,
                productos
            })
        })
})






module.exports = app;