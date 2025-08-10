const {Router} = require("express");
const router = Router();
const registerRequest = require("../requests/user/registerRequest");
const userController = require("../controllers/userController");

router.post("/register", registerRequest, userController.register);

module.exports = router;
