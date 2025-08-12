const Expense = require("../models/expense");
const expenseController = {
    create: function (request, response) {
        const {user} = request;
        const {category_id, amount, description, date} = request.body;
        try {
            Expense.create([{
                user: user._id,
                category: category_id,
                amount: amount,
                description: description,
                date: date,
            }], {
                new: true,
            }).then(expense => {
                response.status(201).json(expense[0]);
            });
        } catch (error) {
            console.log(error);
            response.status(500).send("Ocurrio un problema al crear el gasto");
        }
    },
};

module.exports = expenseController;
