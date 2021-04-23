/* 
    Rutas de Usuarios /Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/authController');
const { validateField } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jsw');

const router = Router();

router.post(
    '/new',
    [//middleware
        check('name')
            .not().isEmpty().withMessage('El nombre es obligatorio'),
        check('email')
            .isEmail().withMessage('El email es obligatorio'),
        check('password')
            .isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres')
            .matches(/\d/).withMessage('Debe contener números')
            .matches(/^(?=.*[A-Z])/).withMessage('Debe contener al menos una mayúscula')
            .matches(/^(?=.*[$@$!%*?&#.$($)$-$_])/).withMessage('Debe contener al menos un carácter especial'),
             /*  .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/).withMessage('No debe contener espacios') */
        validateField
    ],
    createUser);

router.post(
    '/',
    [
        check('email')
            .isEmail().withMessage('Email inválido'),
        check('password')
            .isLength({ min: 6 }).withMessage('Debe contener al menos 6 carácteres')
            .matches(/\d/).withMessage('Debe contener números'),
        validateField
    ],
    loginUser);

router.get('/renew',validateJWT, renewToken)


module.exports = router;