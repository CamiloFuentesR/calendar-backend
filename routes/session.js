const { Router } = require('express');
const { check } = require('express-validator');
const { sessionUpdate } = require('../controllers/sessionController');

const router = Router();

router.put('/:id',sessionUpdate);

module.exports = router;
