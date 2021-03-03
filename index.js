const { json } = require('express');
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();

//Conectar BD
conectarDB();

//Habilitar Cors
app.use(cors());

//Habilitar expreass.json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/platos', require('./routes/platos'));
app.use('/api/menu', require('./routes/menu'));

//Arrancar la app
app.listen(PORT, () => {
    console.log(`EL SERVIDOR ESTAS FUNCIONANDO EN EL PUERTO ${PORT}`);
});