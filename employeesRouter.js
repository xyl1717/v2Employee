const express = require('express');
const router = express.Router();
const employees = require('./employees');

router.get('/', (req, res) => {
  res.json(employees);
});

router.get('/random', (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).send("Name is required and must be a string.");
  }

  const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
  const newEmployee = { id: newId, name };
  employees.push(newEmployee);

  res.status(201).json(newEmployee);
});

module.exports = router;
