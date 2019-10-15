import express from 'express';

const app = express();

app.get('/api/v1/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
  })
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

// add eslint
// make some tests
// make it a real api
// deploy it
// add a readme