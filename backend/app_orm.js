const express = require("express");
const app = express();

const db = require("./db/index");
const Rating = require("./db/models/rating.model");
const Store = require("./db/models/store.model");
const {addStores} = require("./setup")

db.Connection();
db.SyncDatabase();

app.use(express.json());

app.post("/", async (req, res) => {
  const data = await Rating.findAll();
  res.json(data);
});

app.post("/add", async (req, res) => {
  // const test = await Store.create({
  //   store_name: "A",
  //   lat: 123,
  //   long: 456
  // })

})


app.post("/add/rating", async (req, res) => {
  const ratingTest = await Rating.create({
    point: 5,
    store_id: 1
  })
  res.json(ratingTest)
})


addStores()
app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});

