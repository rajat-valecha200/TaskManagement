const express = require("express");
const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createTask);
router.get("/:projectId", auth, getTasksByProject);
router.put("/:taskId", auth, updateTask);
router.delete("/:taskId", auth, deleteTask);

module.exports = router;
