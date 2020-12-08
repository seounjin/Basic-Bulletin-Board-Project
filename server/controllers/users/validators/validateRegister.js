const { validateResult} = require('../../../middleware/validateResult');
const { check } = require('express-validator');


const validateRegister = [
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

    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),

        (req, res, next) => {
            validateResult(req, res, next);
        }
];

module.exports = { validateRegister };
  