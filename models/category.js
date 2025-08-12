const {Schema, model} = require("mongoose");
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 64,
        unique: true,
    },
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: "Expense",
    }],
}, {
    timestamps: true,
    toJSON: {
        transform: (document, returnedObject) => {
            return {
                id: returnedObject._id,
                name: returnedObject.name
            }
        }
    }
});

module.exports = model("Category", categorySchema);
