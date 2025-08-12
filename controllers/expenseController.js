const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

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
    read: function (request, response) {
        const {user} = request;
        const range = parseInt(request.query.range);
        const {startDate, endDate} = request.query;
        const filters = {};
        try{
            filters.user = user._id;
            if(range){
                const currentDate = dayjs().format("YYYY-MM-DD");
                switch (range) {
                    // Past week
                    case 1:
                        filters.date = {
                            $gte: dayjs().subtract(7, "days").format("YYYY-MM-DD"),
                            $lte: currentDate,
                        }
                        break;
                    // Past month
                    case 2:
                        filters.date = {
                            $gte: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
                            $lte: currentDate,
                        }
                        break;
                    // Last three months
                    case 3:
                        filters.date = {
                            $gte: dayjs().subtract(3, "months").format("YYYY-MM-DD"),
                            $lte: currentDate,
                        }
                        break;
                    // Custom
                    case 4:
                        filters.date = {
                            $gte: startDate,
                            $lte: endDate,
                        }
                        break;
                }
            }
            Expense.find(filters, null, {
                new: true,
            }).then(expenses => {
                response.status(200).json(expenses);
            });
        }catch (error) {
            console.log(error);
            response.status(500).send("Ocurrio un problema al obtener los gastos");
        }
    },
};

module.exports = expenseController;
