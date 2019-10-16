import express from 'express';
import parseRecipe from './parser';

const app = express();
const port = process.env.PORT || 8081;


app.get('/api/v1/parseRecipe', (req, res) => {
  var url = req.query.url;

  if (!url) {
    res.status(400).send("Please include the url you want to parse as a parameter called 'url'.");
    return;
  }

  var recipe = parseRecipe(url);

  res.status(200).send(recipe);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});

// add eslint
// make some tests
// make it a real api
// deploy it
// add a readme