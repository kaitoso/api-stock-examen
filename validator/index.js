exports.userSignupValidator = (req, res, next) =>{
    req.check("name", "Name is required").notEmpty();
    req.check("lastname", "Lastname is required").notEmpty();
    req.check("username", "Username is required").notEmpty();
    req.check("email", "Email mus be between 3 to 32 characters").matches(/.+\@.+\..+/)
        .withMessage("Email must contain @").isLength({min: 4, max: 32});
    req.check("password", "Password is required").notEmpty();
    req.check("password").isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters").matches(/\d/)
        .withMessage("Password must contain a number");
    req.check("address","Address is required").notEmpty();
    req.check("rut", "RUT is required").matches(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/)
        .withMessage("El rut debe ser ingresado en formato xx.xxx.xxx-x")
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map( error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
    
};