const {param, body} = require('express-validator');
const Expense = require('../../models/expense');
const updateRequest = [
    param("id")
        .notEmpty().withMessage("El ID es requerido")
        .custom(async (id) => {
            const expense = Expense.findById(id, null, {
                new: true,
            });
            if(!expense){
                throw new Error("El gasto no existe");
            }
            return true;
        }),
    body("amount")
        .notEmpty().withMessage("El monto es requerido")
        .isNumeric().withMessage("El monto debe ser un numero"),
    body("description")
        .trim()
        .notEmpty().withMessage("La descripcion es obligatoria")
        .isLength({
            max: 256,
        }).withMessage("La descripcion no puede tener mas de 256 caracteres"),
    body("date")
        .notEmpty().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe tener un formato válido"),
];

module.exports = updateRequest;
