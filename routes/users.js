const {Router} = require("express");
const router = Router();
const registerRequest = require("../requests/user/registerRequest");
const loginRequest = require("../requests/user/loginRequest");
const refreshTokenRequest = require("../requests/user/refreshTokenRequest");
const checkValidation = require("../middleware/checkValidation");
const userController = require("../controllers/userController");

router.post("/register", registerRequest, checkValidation, userController.register);
router.post("/login", loginRequest, checkValidation, userController.login);
router.post("/refresh-token", refreshTokenRequest, checkValidation, userController.refreshToken);

module.exports = router;
