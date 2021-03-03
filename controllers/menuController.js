const Plato = require('../models/Plato');

exports.obtenerPlatos = async (req, res) => {

    try {
        const platos = await Plato.find({ creador: req.params.id });
        res.json({ platos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}