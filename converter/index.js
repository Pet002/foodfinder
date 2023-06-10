// Reply with two static messages

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios")
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/webhook", (req, res) => {
   console.log(req.headers);
   res.sendStatus(200);
   res.send("hello world");
});

app.post("/webhook", (req, res) => {
   const event = req.body.events[0]
   if (event) {
      // If LINE message type is text then send a request directly to Dialogflow
      if (req.body.events[0] && event.message.type === "text") {
         postToDialogflow(req)
         console.log(req.headers)
         console.log("=======================TEXT==========================")
      }

      // If LINE message type is location data 
      // then convert a location into text format
      else if (req.body.events[0] && req.body.events[0].message.type === 'location') {
         
         // get location (latitude and longitude) from users location
         const latitude = req.body.events[0].message.latitude;
         const longitude = req.body.events[0].message.longitude;

         // console.log(req.body.events[0].message)

         // set prompt to send location to dialogflow
         const text = `latitude is ${latitude} and longitude is ${longitude}`

         // fix content-length to real size
         const length = text.length
         req.headers["content-length"] = 390 + length;

         // set req to a good type
         req.body.events[0].message = {
            type: "text",
            id: req.body.events[0].message.id,
            text: text
         }

         // send a converted request to Dialogflow
         postToDialogflow(req)
         // console.log(req.headers);
      }
   }
   res.sendStatus(200);
});

app.listen(port, () => {
   console.log("listening in port:", port)
});

/**
 * The function sends a post request to Dialogflow's webhook integration for LINE messaging platform.
 */
const postToDialogflow = payload => {
   payload.headers.host = 'dialogflow.cloud.google.com'
   axios({
      url: "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/44eba699-15a6-4da3-8f87-fe5817eab6af",
      headers: payload.headers,
      method: "post",
      data: payload.body
   })
}

