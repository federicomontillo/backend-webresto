const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/:id',
    menuController.obtenerPlatos
);

module.exports = router;