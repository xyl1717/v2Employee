const express = require('express');
const app = express();
const PORT = 3000;
const employeesRouter = require('./employeesRouter');

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello employees!");
});

app.use('/employees', employeesRouter);

app.use((req, res, next) => {
  res.status(404).send("Route not found.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
