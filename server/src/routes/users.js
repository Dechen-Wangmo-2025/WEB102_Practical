const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.getAllUsers);
router.post("/", controller.createUser);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

router.get("/:id/videos", controller.getUserVideos);
router.post("/:id/followers", controller.followUser);
router.delete("/:id/followers", controller.unfollowUser);

module.exports = router;