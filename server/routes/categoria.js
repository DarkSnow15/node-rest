const express = require('express');
let {verificaToken, verificaRole} = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');


app.get('/categoria', (req, res)=>{
    Categoria.find({})
        .populate('usuario', 'nombre email')
        .exec((err, categorias)=> {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            
            res.json({
                ok:true,
                categorias
            });
        })
});

app.get('/categoria/:id', (req, res)=>{
    let id = req.params.id;
    Categoria.findById(id)
        .exec((err, categoria)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if(!categoria){
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'El id no es correcto'
                    }
                });
            }
            
            res.json({
                ok:true,
                categoria
            });
        })
});

app.post('/categoria', [verificaToken, verificaRole], (req, res)=>{
    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoria) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!categoria){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok:true,
            categoria
        });
    });
}); 

app.put('/categoria/:id', [verificaToken, verificaRole], (req, res)=>{
    let id = req.params.id;
    let body = req.body;
    let upCategoria = {
        nombre: body.nombre,
        descripcion: body.descripcion
    }
    Categoria.findByIdAndUpdate(id, upCategoria, {new: true, runValidators: true}, (err, categoria)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!categoria){
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El id no es correcto'
                }
            });
        }
        res.json({
            ok:true,
            categoria
        });
    });
});

app.delete('/categoria/:id', [verificaToken, verificaRole], (req, res)=>{
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }
    Categoria.findByIdAndUpdate(id, cambiaEstado, (err, categoriaBorrada)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(!categoriaBorrada){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }
        res.json({
            ok:true,
            Categoria: categoriaBorrada
        });
    });
});


module.exports = app;