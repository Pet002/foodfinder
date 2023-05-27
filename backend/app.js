const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()
const mysql = require('mysql2');
const connection = mysql.createConnection({
   host: 'localhost',
   user: '<user>',
   password: '<password>',
   database: 'restaurant-test'
});

connection.connect(function (err) {
   if (err) {
      return console.error('error: ' + err.message);
   }

   console.log('Connected to the MySQL server.');
   // connection.query("SELECT * FROM restaurants WHERE idRestaurants = '1'", function (err, result, fields) {
   //    if (err) throw err;
   //    console.log(result);
   // });
});

app.use(express.json())

/**
* on this route dialogflow send the webhook request
* For the dialogflow we need POST Route.
* */
app.post('/', (req, res) => {

   // get agent from request
   const agent = new WebhookClient({ request: req, response: res })

   
   const welcome = (agent) => {

      // Get message from dialogflow
      // console.log(agent.query)
      
      const message = agent.query.split(" ")
      connection.query(`SELECT * FROM restaurants WHERE RestaurantName = '${message[1]}'`, function (err, result, fields) {
         if (err) throw err;
         data = result[0]
         console.log(data)
      });
      agent.add(`location of ${message[1]} is exist`)
   }

   // create intentMap for handle intent
   let intentMap = new Map();

   // add intent map 2nd parameter pass function
   intentMap.set('Test-dialogflow-with-express', welcome)

   // now agent is handle request and pass intent map
   agent.handleRequest(intentMap)
})


/**
* now listing the server on port number 3000 :)
* */
app.listen(3000, () => {
   console.log("Server is Running on port 3000")
})