const User = require("../models/user");
const {hash, compare} = require("bcrypt");
const {sign, verify} = require("jsonwebtoken");

const userController = {
    generateToken: function (userKey, expiration = "1h") {
        return sign({
            key: userKey,
        }, process.env.JWT_SECRET, {
            expiresIn: expiration,
        });
    },
    register: function (request, response) {
        const {name, email, password} = request.body;
        try {
            hash(password, 10).then((hashedPassword) => {
                User.create([{
                    name: name,
                    email: email,
                    password: hashedPassword,
                }], {
                    new: true,
                }).then((users) => {
                    response.status(201).json({
                        accessToken: userController.generateToken(users[0]._id),
                        refreshToken: userController.generateToken(users[0].email, "1d"),
                    });
                });
            });
        } catch (error) {
            console.log(error);
            response.status(500).send("Ocurrio un problema al registar al usuario");
        }
    },
    login: function (request, response) {
        const {email, password} = request.body;
        try {
            User.findOne({
                email: email,
            }, null, {
                new: true,
            }).then(user => {
                if (user) {
                    compare(password, user.password).then(match => {
                        if (match) {
                            response.status(200).json({
                                accessToken: userController.generateToken(user._id),
                                refreshToken: userController.generateToken(user.email, "1d"),
                            });
                        } else {
                            response.status(401).send("Las credenciales no son correctas");
                        }
                    });
                } else {
                    response.status(404).send("el usuario no se encuentra registrado");
                }
            });
        } catch (error) {
            console.log(error);
            response.status(500).send("Ocurrio un problema al iniciar sesion");
        }
    },
    refreshToken: function (request, response) {
        const {refreshToken} = request.body;
        let payload, user;
        try {
            payload = verify(refreshToken, process.env.JWT_SECRET);
            User.findOne({
                email: payload.key,
            }, null, {
                new: true,
            }).then(user => {
                if (user) {
                    response.status(200).json({
                        accessToken: userController.generateToken(user._id),
                        refreshToken: userController.generateToken(user.email, "1d"),
                    });
                } else {
                    response.status(404).send("El usuario no se encuentra registrado");
                }
            });
        } catch (error) {
            console.log(error);
            response.status(500).send("Ocurrio un problema al refrescar el token");
        }
    }
};

module.exports = userController;
