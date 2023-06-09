const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Payload } = require('dialogflow-fulfillment')
const app = express()
const { sequelize } = require("./db/models/sequelize.init");
const db = require("./db/index");
const Store = require('./db/models/store.model');
const { Op } = require("sequelize");
const {templates} = require("./templates/store.template")

const setup = require("./setup")

db.Connection();
db.SyncDatabase();
// setup.addStores()

app.use(express.json())

app.post('/test', (req, res) => {

   // Create a WebhookClient instance with the incoming request and response
   const agent = new WebhookClient({ request: req, response: res })

   // Get user coordinates from req.body.queryResult.parameters.number
   
   const intentName = req.body.queryResult.intent.displayName
   
   console.log(intentName)
   
   if (intentName === "find-restuarant-follow-up") {
      
      const coord = req.body.queryResult.parameters.number
      const latitude = coord[0] 
      const longtitude = coord[1]
   
   
      // Define an asynchronous function to find nearby stores
      const listNearStores = async (agent) => {
   
         // Query the database for stores within a certain range of coordinates
         const res = await Store.findAll({
            where:{
               lat: {
                  [Op.between]: [latitude-0.2, latitude+0.2]
               },
               long: {
                  [Op.between]: [longtitude-0.2, longtitude+0.2]
               },
            }
         })
   
         // Extract the data values from the query results
         const storeResults = [res[0].dataValues, res[1].dataValues]
   
         // Create a payload with the store results
         const payload = {
            "line": templates(storeResults)
         } 
         
         // Add the payload to the agent's response
         agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
      }
   
      // create intentMap for handle intent
      let intentMap = new Map();
   
      // add intent map 2nd parameter pass function
      intentMap.set('find-restuarant-follow-up', listNearStores)
      // now agent is handle request and pass intent map
      agent.handleRequest(intentMap)   

   } else if (intentName === "show-restaurant-location") {

      const response = async (agent) => {
         console.log("===================")
         console.log("test response show restau")
         console.log("===================")

         agent.add("UUEIEJFIIOJEFOI")
      }
      // create intentMap for handle intent
      let intentMap = new Map();
   
      // add intent map 2nd parameter pass function
      intentMap.set('show-restaurant-location', response)

      agent.handleRequest(intentMap)
   }
   
})


/**
* now listing the server on port number 3000 :)
* */
app.listen(3000, () => {
   console.log("Server is Running on port 3000")
})