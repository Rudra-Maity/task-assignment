const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks');
const generateId = require('../utils/generateId');
const auth = require('../middleware/auth');

const validateTask = (data) => {
  const { title, description } = data;
  return title && description;
};

// /tasks - List with pagination, filtering, sorting
router.get('/', (req, res) => {
  let result = [...tasks];

  if (req.query.status) {
    result = result.filter(task => task.status === req.query.status);
  }

  const { sortBy = 'createdAt', order = 'desc' } = req.query;
  result.sort((a, b) => {
    const isAsc = order === 'asc';
    if (a[sortBy] < b[sortBy]) return isAsc ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return isAsc ? 1 : -1;
    return 0;
  });

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  res.status(200).json({
    page,
    total: result.length,
    tasks: paginated
  });
});

router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json(task);
});

router.post('/', auth, (req, res) => {
  const { title, description, status = 'pending' } = req.body;
  if (!validateTask(req.body)) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  const newTask = {
    id: generateId(),
    title,
    description,
    status,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id 
router.put('/:id', auth, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const { title, description, status } = req.body;
  if (!validateTask(req.body)) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  task.title = title;
  task.description = description;
  task.status = status || task.status;

  res.status(200).json(task);
});

// DELETE /tasks/:id 
router.delete('/:id', auth, (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted' });
});

module.exports = router;
