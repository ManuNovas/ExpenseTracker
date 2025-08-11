const {Router} = require("express");
const router = Router();
const registerRequest = require("../requests/user/registerRequest");
const loginRequest = require("../requests/user/loginRequest");
const checkValidation = require("../middleware/checkValidation");
const userController = require("../controllers/userController");

router.post("/register", registerRequest, checkValidation, userController.register);
router.post("/login", loginRequest, checkValidation, userController.login);

module.exports = router;
