import express from 'express';
import parseRecipe from './parser';

const app = express();
const port = process.env.PORT || 8081;


app.get('/api/v1/parseRecipe', (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).send("Please include the url you want to parse as a parameter called 'url'.");
    return;
  }

  const recipe = parseRecipe(url);

  res.status(200).send(recipe);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`); // eslint-disable-line no-console
});

// make some tests
// make it a real api
// deploy it
// add a readme
// swagger docs
