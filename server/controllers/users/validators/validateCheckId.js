const { validateResult} = require('../../../middleware/validateResult');
const { check } = require('express-validator');


const validateCheckId = [
    check('userId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({ min: 5, max:12 }),
    
        (req, res, next) => {
            validateResult(req, res, next);
        }
];

module.exports = { validateCheckId };
  