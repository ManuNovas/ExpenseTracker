const {Schema, model} = require('mongoose');
const expenseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        maxLength: 256,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (document, returnedObject) => {
            return {
                id: returnedObject._id,
                category: returnedObject.category,
                amount: returnedObject.amount,
                description: returnedObject.description,
                date: returnedObject.date,
            }
        }
    }
});

module.exports = model("Expense", expenseSchema);
