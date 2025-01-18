const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and Description are required." });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const project = new Project({
      title,
      description,
      owner: req.user.id,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).populate(
      "owner",
      "name email"
    );
    res.status(200).json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate("owner", "name email");
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    if (project.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to access this project." });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }
      
      if (project.owner.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to update this project.' });
      }

      project.title = title || project.title;
      project.description = description || project.description;
      await project.save();
  
      res.status(200).json({
        message: 'Project updated successfully',
        project,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error. Please try again later.' });
    }
  };

  exports.deleteProject = async (req, res) => {
    const { id } = req.params;
  
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }

      if (project.owner.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to delete this project.' });
      }

      await project.remove();
  
      res.status(200).json({
        message: 'Project deleted successfully',
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error. Please try again later.' });
    }
  };
