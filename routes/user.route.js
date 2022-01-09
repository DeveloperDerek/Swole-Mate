const userController = require("../controllers/user.controller");
const router = require("express").Router();
const jwtAuth = require("../configs/jwt.config");

router.post("/register", userController.register);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getuser/:id", userController.getUser);
router.get("/swole-search", jwtAuth, userController.swoleSearch);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/getLoggedInUser", userController.getLoggedInUser);
router.put("/addPic", jwtAuth, userController.addPic);
router.put("/deletePic", jwtAuth, userController.deletePic);
router.post("/update", jwtAuth, userController.update);
router.post("/setStatus", jwtAuth, userController.setStatus);

module.exports = router;