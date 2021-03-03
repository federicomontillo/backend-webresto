const Plato = require('../models/Plato');
const { validationResult } = require('express-validator');

exports.crearPlato = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        //Crear un nuevo plato
        const plato = new Plato(req.body);

        //Guardar el creador via JWT
        plato.creador = req.usuario.id

        //Guardamos el plato
        plato.save();
        res.json(plato);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtiene todos los proyectos del usuario actual
exports.obtenerPlatos = async (req, res) => {

    try {
        const platos = await Plato.find({ creador: req.usuario.id });
        res.json({ platos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


// Actualiza un plato
exports.actualizarPlato = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    //Extraer la infromacion del Plato
    const {nombre, descripcion, categoria, precio} = req.body;
    const nuevoPlato = {};

    
    nuevoPlato.nombre = nombre;
    
    nuevoPlato.descripcion = descripcion;
    
    nuevoPlato.categoria = categoria;
    
    nuevoPlato.precio = precio;
    

    try {

        //Revisar el ID
        let plato = await Plato.findById(req.params.id);

        //Si el plato existe o no
        if(!plato) {
            return res.status(404).json({msg: 'Plato no encontrado'})
        }

        //Verificar el creador del plato
        if(plato.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //Actualiza Plato
        plato = await Plato.findByIdAndUpdate({_id: req.params.id}, { $set : nuevoPlato }, {new: true });

        res.json({plato});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}

//Elimina un plato por su ID
exports.eliminarPlato = async (req, res) => {
    try {

        //Revisar el ID
        let plato = await Plato.findById(req.params.id);

        //Si el plato existe o no
        if(!plato) {
            return res.status(404).json({msg: 'Plato no encontrado'})
        }

        //Verificar el creador del plato
        if(plato.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'})
        }    

        //Eliminar plato
        await Plato.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Proyecto Eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}