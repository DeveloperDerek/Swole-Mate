const messageController = require("../controllers/message.controller");
const router = require("express").Router();
const jwt = require("../configs/jwt.config");

router.get("/allmessages", messageController.getMessages);
router.post("/create", messageController.createMessage);
router.get("/getdms/:id", jwt, messageController.getDirectMessages);

module.exports = router;