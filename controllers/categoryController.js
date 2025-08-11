const Category = require("../models/category");

const categoryController = {
    list: function (request, response) {
        Category.find({}, null, {
            sort: {
                name: 1,
            }
        }).then(categories => {
            if (categories) {
                response.status(200).json(categories);
            } else {
                response.status(404).send("No se encontraron categorias");
            }
        }).catch(error => {
            console.log(error);
            response.status(500).send("Ocurrio un problema al obtener las categorias");
        })
    }
};

module.exports = categoryController;
