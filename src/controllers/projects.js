import models from '../models';

// get all projects (Javi)
const getAllProjects = async (req, res) => {
  try {
    const projects = await models.Projects.find(req.query);
    if (projects.length < 1) {
      return res.status(404).json({
        message: 'There are no projects yet',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Success!',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
// get project by id (Javi)
const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await models.Projects.findById(req.params.id);
      if (project) {
        res.status(200).json({
          message: 'Project found',
          data: project,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Project not found',
          data: undefined,
          error: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
// get project by name (Javi)
const getProjectByName = async (req, res) => {
  try {
    if (req.params.name) {
      const project = await models.Projects.find({ name: req.params.name });
      if (project.length === 0) {
        return res.status(404).json({
          message: `No project with name: ${req.params.name}`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Project found!',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Please enter a name',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
// get project by client name (Javi)
const getProjectByClientName = async (req, res) => {
  try {
    if (req.params.clientName) {
      const project = await models.Projects.find({ clientName: req.params.clientName });
      if (project.length === 0) {
        return res.status(404).json({
          message: `No project with client: ${req.params.clientName}`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Project found!',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Please enter a client name',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
// get project by status (Javi)
const getProjectByStatus = async (req, res) => {
  try {
    const project = await models.Projects.find({ active: req.params.active });
    if (project.length < 1) {
      return res.status(404).json({
        message: 'No projects found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Projects found!',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
// create new project (Javi)
const createNewProject = async (req, res) => {
  try {
    const project = new models.Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      active: req.body.active,
      devRate: req.body.devRate,
      qaRate: req.body.qaRate,
      pmRate: req.body.pmRate,
      tlRate: req.body.tlRate,
      devs: req.body.devs,
      qas: req.body.qas,
      projectManager: req.body.projectManager,
      techLeader: req.body.techLeader,
      admin: req.body.admin,
    });
    await project.save();
    return res.status(201).json({
      message: 'Project created',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};
const updateProject = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await models.Projects.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!result) {
        return res.status(404).json({
          message: 'Project not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The project has updated successfully',
        data: result,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Invalid format ID',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'Error',
      data: error.message,
      error: true,
    });
  }
};
// DELETE project By Mati
const deleteProject = async (req, res) => {
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await models.Projects.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({
          message: `Id ${req.params.id} does not exist`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The project deleted successfully',
        data: result,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'ID format is not valid',
      data: req.params.id,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      data: error.message,
      error: true,
    });
  }
};
export default {
  getAllProjects,
  createNewProject,
  getProjectById,
  getProjectByName,
  getProjectByClientName,
  getProjectByStatus,
  updateProject,
  deleteProject,
};
