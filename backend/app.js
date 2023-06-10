const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()
const db = require("./db/index");
const { ListNearStores, ShowRestuarant, addNewRestaurant } = require("./function/storesController")
const setup = require("./setup");
const { addRating, sendQuickReply, updateRating} = require('./function/ratingController');

db.Connection();
db.SyncDatabase();
// setup.addStores()

app.use(express.json())

let rating = new Map()

let rating_id = new Map()


app.post('/test', (req, res) => {

   // Create a WebhookClient instance with the incoming request and response
   const agent = new WebhookClient({ request: req, response: res })


   // create intentMap for handle intent
   let intentMap = new Map();


   // add intent map 2nd parameter pass function
   intentMap.set('find-restuarant-follow-up', async (agent) => {
      await ListNearStores(agent, req)
   })
   intentMap.set('show-restaurant-location', async (agent) => {
      await ShowRestuarant(agent, req)
   })

   intentMap.set('show-restaurant-location-by-name', async (agent) => {
      await ShowRestuarant(agent, req)
   })
   
   intentMap.set('add-restaurant', async (agent) => {
      await addNewRestaurant(agent, req)
   });

   intentMap.set('rating-store', async (agent) => {
      await sendQuickReply(agent,req,rating)
   })

   intentMap.set('rating-store-choose-score', async(agent) => {
      await addRating(agent, req, rating, rating_id)
   })

   intentMap.set('rating-store-add-review', async(agent) => {
      await updateRating(agent, req, rating_id)
   })

   // now agent is handle request and pass intent map
   agent.handleRequest(intentMap)
}

)


/**
* now listing the server on port number 3000 :)
* */
app.listen(3000, () => {
   console.log("Server is Running on port 3000")
})