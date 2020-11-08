const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const {
    getCopias,
    crearCopia,
    actualizarCopia,
    eliminarCopia
} = require('../controllers/copiasController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getCopias);


router.post('/', [
        validarJWT,
        check('estado', 'El estado del libro es obligatorio').not().isEmpty(),
        check('libro', 'El id del libro debe ser valido').isMongoId(),
        validarCampos
    ],
    crearCopia);

router.put('/:id', [
        validarJWT,
        check('estado', 'El estado del libro es obligatorio').not().isEmpty(),
        check('libro', 'El id del libro debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarCopia);

router.delete('/:id', validarJWT, eliminarCopia);



module.exports = router;