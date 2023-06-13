const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()
const db = require("./db/index");
const { ListNearStores, ShowRestuarant, addNewRestaurant } = require("./controllers/storesController")
// const setup = require("./setup");
const { addRating, sendQuickReply, updateRating, checkRestaurantHasReview, getRestaurantReview, TestMessage} = require('./controllers/ratingController');
const Store = require('./db/models/store.model');

db.Connection();
db.SyncDatabase();
// setup.addStores()

app.use(express.json())

let rating = new Map()

let rating_id = new Map()

let reviewed = new Map();

app.post('/test', (req, res) => {

   // Create a WebhookClient instance with the incoming request and response
   const agent = new WebhookClient({ request: req, response: res })

   // create intentMap for handle intent
   let intentMap = new Map();

   //  map intent "find-restaurant-follow-up" and a function list nearby store
   intentMap.set('find-restuarant-follow-up', async (agent) => {
      await ListNearStores(agent, req)
   })

   //  map intent "show-restaurant-location" and "show-restaurant-location-by-name" to a function to show restaurant
   intentMap.set('show-restaurant-location', async (agent) => {
      await ShowRestuarant(agent, req)
   })
   intentMap.set('show-restaurant-location-by-name', async (agent) => {
      await ShowRestuarant(agent, req)
   })
   
   //  map intent "add-restaurant" to a function to add new restaurant
   intentMap.set('add-restaurant', async (agent) => {
      await addNewRestaurant(agent, req)
   });

   //  map intent "rating-store" to a function to request score quick reply to LINE bot message
   intentMap.set('rating-store', async (agent) => {
      await sendQuickReply(agent,req,rating)
   })
   
   //  map intent "rating-store-choose-score" to a function to add rating score of a current restaurant
   intentMap.set('rating-store-choose-score', async(agent) => {
      await addRating(agent, req, rating, rating_id)
   })

   //  map intent "rating-store-add-review" to a function to update rating record by adding review text
   intentMap.set('rating-store-add-review', async(agent) => {
      await updateRating(agent, req, rating_id)
   })

   // map intent "show-restaurant-review"
   intentMap.set('show-restaurant-review', async (agent) => {
      await checkRestaurantHasReview(agent, req, reviewed)
   })

   intentMap.set('show-restaurant-review-by-score', async (agent) => {
      await getRestaurantReview(agent, req, reviewed)
   })

   intentMap.set('test-message-array', async (agent)=>{
      await TestMessage(agent, req)
   })

   // now agent is handle request and pass intent map
   agent.handleRequest(intentMap)
}

)

app.get("/", (req, res) => {
   res.send("hello world")
})

app.get("/testing", async (req, res) => {
   let x = await Store.findAll()

   res.send(x)
})


/**
* now listing the server on port number 3000 :)
* */
app.listen((process.env.BOT_PORT || 3000), () => {
   console.log(`Server is Running on port ${(process.env.BOT_PORT || 3000)}`)
})