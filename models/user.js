const {Schema, model} = require("mongoose");
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 64,
    },
    email: {
        type: String,
        required: true,
        maxLength: 128,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 128,
    },
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: "Expense",
    }],
}, {
    timestamps: true,
});

module.exports = model("User", userSchema);
