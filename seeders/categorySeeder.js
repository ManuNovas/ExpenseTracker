const Category = require('../models/category');

function seedCategories() {
    const categories = [
        "Comestibles",
        "Ocio",
        "Electronica",
        "Utilidades",
        "Ropa",
        "Salud",
        "Otros",
    ];
    categories.forEach((categoryName) => {
        Category.findOne({
            name: categoryName,
        }, null, {
            new: true,
        }).then(category => {
            if (!category) {
                Category.create([{
                    name: categoryName,
                }], {
                    new: true,
                });
            }
        })
    });
}

module.exports = seedCategories;
