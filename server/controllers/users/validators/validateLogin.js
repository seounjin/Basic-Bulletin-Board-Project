const { validateResult} = require('../../../middleware/validateResult');
const { check } = require('express-validator');


const validateLogin = [
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),

    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),

    
        (req, res, next) => {
            validateResult(req, res, next);
        }
];

module.exports = { validateLogin };
  