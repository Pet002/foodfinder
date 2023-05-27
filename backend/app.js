const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()
const mysql = require('mysql2');
const connection = mysql.createConnection({
   host: '34.124.160.112',
   user: 'root',
   password: 'password',
   database: 'db'
});

connection.connect(function (err) {
   if (err) {
      return console.error('error: ' + err.message);
   }

   console.log('Connected to the MySQL server.');
   connection.query("SELECT * FROM test", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
   });
});

app.use(express.json())

/**
* on this route dialogflow send the webhook request
* For the dialogflow we need POST Route.
* */


app.post('/', (req, res) => {

   // get agent from request
   const agent = new WebhookClient({ request: req, response: res })

   const getTest = () => {
      return new Promise((resolve, reject) => {
         connection.query(
            "SELECT * FROM test",
            (err, result) => {
               return err ? reject(err) : resolve(result[0]);
            }
         );
      });
   }

   const welcome = async (agent) => {

      // Get message from dialogflow

      // Call getTest to get record(s) from db
      let data = await getTest()

      console.log(data)
      agent.add(`location of ${data.name} is exist`)
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