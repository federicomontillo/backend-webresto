const mongoose = require('mongoose');


const PlatoSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    categoria: {
        type: String,
        require: true,
        trim: true
    },
    precio: {
        type: Number,
        require: true,
        trim:true    
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Plato', PlatoSchema);