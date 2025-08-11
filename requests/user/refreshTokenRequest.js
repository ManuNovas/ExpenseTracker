const {body} = require('express-validator')
const refreshTokenRequest = [
    body('refreshToken')
        .notEmpty().withMessage('El token de refresco es requerido'),
];

module.exports = refreshTokenRequest;
