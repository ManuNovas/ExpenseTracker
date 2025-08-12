const {verify} = require("jsonwebtoken");
const User = require("../models/user");

function authenticate(request, response, next) {
    let accessToken, payload;
    try {
        accessToken = request.headers.authorization.replace("Bearer ", "");
        payload = verify(accessToken, process.env.JWT_SECRET);
        User.findById(payload.key, null, {
            new: true,
        }).then(user => {
            if (user) {
                request.user = user;
                next();
            } else {
                response.status(401).send("El token no es valido");
            }
        });
    } catch (error) {
        console.log(error);
        response.status(401).send("No estas autorizado para acceder a esta ruta");
    }
}

module.exports = authenticate;
