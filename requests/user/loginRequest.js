const {body} = require('express-validator');
const loginRequest = [
    body('email').notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es valido'),
    body('password')
        .notEmpty().withMessage('La contrasena es obligatoria')
];

module.exports = loginRequest;
