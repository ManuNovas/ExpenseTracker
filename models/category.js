const {Schema, model} = require("mongoose");
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 64,
        unique: true,
    }
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
