const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Payload } = require('dialogflow-fulfillment')
const app = express()
const { sequelize } = require("./db/models/sequelize.init");
const db = require("./db/index");
const Store = require('./db/models/store.model');
const { Op } = require("sequelize");
const { templates } = require("./templates/store.template")
const { ListNearStores, ShowRestuarant } = require("./function/storesController")
const setup = require("./setup")

db.Connection();
db.SyncDatabase();
// setup.addStores()

app.use(express.json())

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
   
   // Intent map


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