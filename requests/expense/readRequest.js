const {query} = require("express-validator");
const readRequest = [
    query("range")
        .optional()
        .isNumeric().withMessage("El rango debe ser un numero")
        .isInt({
            min: 1,
            max: 4,
        }).withMessage("El rango no es válido"),
    query("startDate")
        .if(query("range").equals("4"))
        .notEmpty().withMessage("La fecha de inicio es obligatoria")
        .bail()
        .isDate().withMessage("La fecha de inicio debe ser una fecha valida"),
    query("endDate")
        .if(query("range").equals("4"))
        .notEmpty().withMessage("La fecha de fin es obligatoria")
        .bail()
        .isDate().withMessage("La fecha de fin debe ser una fecha valida"),
];

module.exports = readRequest;
