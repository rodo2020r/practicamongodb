const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const {
    getPrestamos,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
} = require('../controllers/prestamoController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getPrestamos);


router.post('/', [
        validarJWT,
        check('fecha_pres', 'La fecha del prestamo es obligatorio').not().isEmpty(),
        check('alumno', 'El id del alumno debe ser valido').isMongoId(),
        check('copia', 'El id de copia debe ser valido').isMongoId(),
        validarCampos
    ],
    crearPrestamo);

router.put('/:id', [
        validarJWT,
        check('fecha_pres', 'La fecha del prestamo es obligatorio').not().isEmpty(),
        check('alumno', 'El id del alumno debe ser valido').isMongoId(),
        check('copia', 'El id de copia debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarPrestamo);

router.delete('/:id', validarJWT, eliminarPrestamo);



module.exports = router;