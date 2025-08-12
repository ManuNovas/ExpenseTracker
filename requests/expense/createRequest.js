const {body} = require("express-validator");
const Category = require("../../models/category");
const createRequest = [
    body("category_id")
        .notEmpty().withMessage("La categoria es obligatoria")
        .custom(async (category_id) => {
            const category = Category.findById(category_id, null, {
                new: true,
            });
            if (!category) {
                throw new Error("La categoria no existe");
            }
            return true;
        }),
    body("amount")
        .notEmpty().withMessage("El monto es obligatorio")
        .isNumeric().withMessage("El monto debe ser un numero"),
    body("description")
        .trim()
        .notEmpty().withMessage("La descripcion es obligatoria")
        .isLength({
            max: 256,
        }).withMessage("La descripcion no puede tener mas de 256 caracteres"),
    body("date")
        .notEmpty().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe ser una fecha valida"),
];

module.exports = createRequest;
