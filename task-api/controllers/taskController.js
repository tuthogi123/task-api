const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ user: req.user.id, title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: "Task not found" });

    task.status = req.body.status || task.status;
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: "Task not found" });

    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
