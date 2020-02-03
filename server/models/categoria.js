const mongoose  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'La categoria debe tener un nombre']
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})

categoriaSchema.plugin(uniqueValidator, {message: '{PATH} ya existe'})

module.exports = mongoose.model('Categoria', categoriaSchema);