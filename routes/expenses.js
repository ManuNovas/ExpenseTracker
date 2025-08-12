const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const createRequest = require("../requests/expense/createRequest");
const checkValidation = require("../middleware/checkValidation");

router.post("/", createRequest, checkValidation, expenseController.create);

module.exports = router;
