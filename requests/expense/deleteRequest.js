const {param} = require('express-validator');
const Expense = require('../../models/expense');
const deleteRequest = [
    param('id')
        .notEmpty().withMessage('El ID es requerido')
        .custom(async (id) => {
            const expense = Expense.findById(id, null, {
                new: true,
            });
            if(!expense){
                throw new Error('El gasto no existe');
            }
            return true;
        }),
];

module.exports = deleteRequest;
