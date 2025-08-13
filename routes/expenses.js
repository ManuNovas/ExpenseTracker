const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const createRequest = require("../requests/expense/createRequest");
const readRequest = require("../requests/expense/readRequest");
const updateRequest = require("../requests/expense/updateRequest");
const deleteRequest = require("../requests/expense/deleteRequest");
const checkValidation = require("../middleware/checkValidation");

router.post("/", createRequest, checkValidation, expenseController.create);
router.get("/", readRequest, checkValidation, expenseController.read);
router.put("/:id", updateRequest, checkValidation, expenseController.update);
router.delete("/:id", deleteRequest, checkValidation, expenseController.delete);

module.exports = router;
