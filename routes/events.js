const { Router } = require('express');
const { check } = require('express-validator');
const { createEvent, getEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { isDate } = require('../helpers/isDate');
const { validateField } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jsw');


const router = Router();

//se aplica este middleware a todas las rutas
router.use(validateJWT)

router.post('/',
    [
        check('title')
            .notEmpty().withMessage('El titulo es obligatorio'),
        check('start')
            .custom(isDate)
            .withMessage('Debe ingresar una fecha de inicio'),
        check('end')
            .custom(isDate)
            .withMessage('Debe ingresar una fecha de término'),
        validateField
    ],
     createEvent);

//se aplica este middleware a todas las rutas desde aqui
// router.use(validateJWT)

router.get('/', getEvent);

router.put('/:id',
[
    check('title')
        .notEmpty().withMessage('El titulo es obligatorio'),
    check('start')
        .custom(isDate)
        .withMessage('Debe ingresar una fecha de inicio'),
    check('end')
        .custom(isDate)
        .withMessage('Debe ingresar una fecha de término'),
    validateField
],
updateEvent);

router.delete('/:id',deleteEvent);

module.exports = router;