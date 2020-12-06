const { validationResult } = require('express-validator');



const validateResult = (req, res, next) => {

    try {
        validationResult(req).throw();

        return next();

      } catch (err) {
        console.log(err.mapped()); 
    
        return res.json( { success: false, err } );
      }
}
  
module.exports = { validateResult };
