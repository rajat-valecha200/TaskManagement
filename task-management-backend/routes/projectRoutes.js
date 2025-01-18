const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Project routes
router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getAllProjects);
router.get('/:id', authMiddleware, getProjectById);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
