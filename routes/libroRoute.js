const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getLibros,
    crearLibro,
    actualizarLibro,
    eliminarLibro
} = require('../controllers/libroController');


const router = Router();

router.get('/', getLibros);


router.post('/', [
        validarJWT,
        check('titulo', 'El titulo del libro es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearLibro);

router.put('/:id', [
        validarJWT,
        check('titulo', 'El titulo del libro es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarLibro);

router.delete('/:id',
    validarJWT,
    eliminarLibro);



module.exports = router; //para exportar