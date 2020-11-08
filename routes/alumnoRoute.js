const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} = require('../controllers/alumnoController');


const router = Router();

router.get('/', getAlumnos);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del alumno es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearAlumno);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del alumno es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarAlumno);

router.delete('/:id',
    validarJWT,
    eliminarAlumno);



module.exports = router; //para exportar