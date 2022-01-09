const friendController = require("../controllers/friend.controller");
const jwtAuth = require("../configs/jwt.config");
const router = require("express").Router();

router.post("/requestFriend", jwtAuth, friendController.requestFriend);
router.post("/acceptFriend", jwtAuth, friendController.acceptRequest);
router.post("/rejectFriend", jwtAuth, friendController.rejectRequest);
router.get("/getFriends", jwtAuth, friendController.getFriends);
router.get("/getRequests", jwtAuth, friendController.getRequests);
router.get("/getNonFriends", jwtAuth, friendController.getNonFriends);

module.exports = router