const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const createRequest = require("../requests/expense/createRequest");
const readRequest = require("../requests/expense/readRequest");
const checkValidation = require("../middleware/checkValidation");

router.post("/", createRequest, checkValidation, expenseController.create);
router.get("/", readRequest, checkValidation, expenseController.read);

module.exports = router;
