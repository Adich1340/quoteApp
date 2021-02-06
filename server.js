const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

app.get("/api/quotes", (req, res) => {
  const person = req.query.person;
  if (person) {
    const filteredQuotes = quotes.filter((author) => author.person === person);
    res.send({ quotes: filteredQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

app.post("/api/quotes", (req, res) => {
  const quote = req.query.quote;
  const person = req.query.person;
  const newQuote = { quote: quote, person: person };
  if (quote && person) {
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
