import express from "express";
const app = express();
const PORT = 3000;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

app.get("/quotes", async function (req, res) {
  // respond with the array of quotes
  // this function would: get quotes, respond with them
  const quotesArray = await getQuotes();
  res.json(quotesArray);
});

// when request goes to /quotes with the :id respond with the object with key of id
// the function would: use getQuoteById, take the specific id as a parameter, and return the matching object
app.get("/quotes/:id", async function (req, res) {
  let id = req.params.id;
  const idQuote = await getQuoteByID(id);
  res.json(idQuote);
});
// example url: http://localhost:3000/quotes/7fdab464-e0c4-45fb-94fe-c4dd376f6645

// listen for a post request to /quotes
// receive quote
// get the quote string from the post request
// use function addQuote to generate id and add the received quote string
//
app.post("/quotes", async function (req, res) {
  console.log(req.body);
  let quoteText = req.body.quoteText;
  let author = req.body.author;
  let newQuote = await addQuote(quoteText, author);
  res.json(newQuote);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
