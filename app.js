const express = require('express');
const app = express();
const connectDB = require('./config/database');
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);

module.exports = app;
