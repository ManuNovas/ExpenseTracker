const {body} = require("express-validator");
const User = require("../../models/user");
const registerRequest = [
    body("name")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({
            max: 128,
        }).withMessage("El nombre no puede tener mas de 128 caracteres"),
    body("email")
        .trim()
        .notEmpty().withMessage("El email es obligatorio")
        .isLength({
            max: 128,
        }).withMessage("El email no puede tener mas de 128 caracteres")
        .isEmail().withMessage("El email no es valido")
        .custom(async (email) => {
            const user = await User.findOne({
                email: email,
            }, null, {
                new: true,
            });
            if (user) {
                throw new Error("El email ya esta en uso");
            }
            return true;
        }),
    body("password")
        .trim()
        .notEmpty().withMessage("La contrasena es obligatoria")
        .isLength({
            min: 8,
            max: 64,
        }).withMessage("La contrasena debe tener entre 8 y 64 caracteres"),
    body("password_confirmation")
        .trim()
        .notEmpty().withMessage("La confirmacion de la contrasena es obligatoria")
        .custom((passwordConfirmation, {req}) => {
            if (passwordConfirmation !== req.body.password) {
                throw new Error("Las contrasenas no coinciden");
            }
            return true;
        }),
];

module.exports = registerRequest;
