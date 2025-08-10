const express = require('express');
const app = express();
const connectDB = require('./config/database');
const userRoutes = require("./routes/users");

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRoutes);

module.exports = app;
