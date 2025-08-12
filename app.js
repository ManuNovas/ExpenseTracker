const express = require('express');
const app = express();
const connectDB = require('./config/database');
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const expenseRoutes = require("./routes/expenses");
const authenticate = require('./middleware/authenticate');

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/expenses", authenticate, expenseRoutes);

module.exports = app;
