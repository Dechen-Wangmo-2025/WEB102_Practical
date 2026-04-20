const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentController");

router.get("/", controller.getAllComments);
router.post("/", controller.createComment);
router.get("/:id", controller.getCommentById);
router.put("/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);

router.post("/:id/likes", controller.likeComment);
router.delete("/:id/likes", controller.unlikeComment);

module.exports = router;