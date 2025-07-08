const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let todos = require('./data');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET one todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST new todo
app.post('/todos', (req, res) => {
  const { title, completed = false } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    completed
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT – replace a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  const { title, completed } = req.body;
  todos[index] = { id, title, completed };
  res.json(todos[index]);
});

// PATCH – update some fields of a todo
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
