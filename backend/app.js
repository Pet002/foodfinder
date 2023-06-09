const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Payload } = require('dialogflow-fulfillment')
const app = express()
const { sequelize } = require("./db/models/sequelize.init");
const db = require("./db/index");
const Store = require('./db/models/store.model');
const { Op } = require("sequelize");

db.Connection();
db.SyncDatabase();

// import { createConnection } from 'mysql2';
// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//    host: '34.124.160.112',
//    user: 'root',
//    password: 'password',
//    database: 'db'
// });

// connection.connect(function (err) {
//    if (err) {
//       return console.error('error: ' + err.message);
//    }

//    console.log('Connected to the MySQL server.');
//    connection.query("SELECT * FROM test", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//    });
// });




app.use(express.json())

/**
* on this route dialogflow send the webhook request
* For the dialogflow we need POST Route.
* */


app.post('/test', (req, res) => {

   // get agent from request
   const agent = new WebhookClient({ request: req, response: res })

   const coord = req.body.queryResult.parameters.number

   const latitude = coord[0] 
   const longtitude = coord[1]
   
   const listNearStores = async (agent) => {
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

      console.log(JSON.stringify(res))
      // Query from database

      const payload = {
         "line":{
            "title": "test",
            "longitude": 100.2131,
            "latitude": 12.1231,
            "address": "test",
            "type": "location"
         }
      }

      // Get message from dialogflow
      // agent.add(`location is exist`)
      agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
   }

   // create intentMap for handle intent
   let intentMap = new Map();

   // add intent map 2nd parameter pass function
   intentMap.set('find-restuarant-follow-up', listNearStores)
   

   // now agent is handle request and pass intent map
   agent.handleRequest(intentMap)
})


/**
* now listing the server on port number 3000 :)
* */
app.listen(3000, () => {
   console.log("Server is Running on port 3000")
})