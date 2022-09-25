const express = require("express");
const request = require("request-promise");
const helmet = require("helmet");

const app = express();

app.use(helmet());

const PORT = process.env.PORT || 5000;
const generateScraperUrl = (api_key) =>
  `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME TO AMAZON_SCRAPPER API");
});

// GET PRODUCT DETAILS
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.send(error.message);
  }
});

// GET PRODUCT REVIEWS
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.send(error.message);
  }
});

// GET PRODUCT OFFERS
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.send(error.message);
  }
});

// GET SEARCH RESULTS
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`THE SERVER IS RUNNING ON http://localhost:${PORT}`);
});
