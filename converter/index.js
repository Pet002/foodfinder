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
   let event = req.body.events[0]
   if (event) {
      if (req.body.events[0] && event.message.type === "text") {
         postToDialogflow(req)
         console.log(req.headers)
         console.log("=======================TEXT==========================")
      }
      else if (req.body.events[0] && req.body.events[0].message.type === 'location') {
         // get location from users location
         let latitude = req.body.events[0].message.latitude;
         let longitude = req.body.events[0].message.longitude;
         // set prompt to send location to dialogflow
         let text = `${latitude} ${longitude}`
         // 
         // fix content-length to real size
         let length = text.length
         req.headers["content-length"] = 390 + length;
         // 
         // set req to a good type
         req.body.events[0].message = {
            type: "text",
            id: req.body.events[0].message.id,
            text: text
         }
         // req.body.events[0].message.text = `lat:${latitude}, long:${longitude}`

         // console.log(req.body.events[0].message)
         postToDialogflow(req)

         // let reply_token = req.body.events[0].replyToken;
         console.log(req.headers);


         // reply(reply_token, latitude, longitude);
      }
      // else if(req.body.events[0].message.type === 'text'){
      //   console.log(req.body.events[0].message);
      // }
   }

   res.sendStatus(200);
});

app.listen(port, () => {
   console.log("listening in port:", port)
});

const changeReqLocationToText = payload => {

}

const postToDialogflow = payload => {
   payload.headers.host = 'dialogflow.cloud.google.com'
   axios({
      url: "https://dialogflow.cloud.google.com/v1/integrations/line/webhook/44eba699-15a6-4da3-8f87-fe5817eab6af",
      headers: payload.headers,
      method: "post",
      data: payload.body
   })
}

function reply(reply_token, latitude, longitude) {
   let headers = {
      "Content-Type": "application/json",
      Authorization:
         "Bearer FJH/Or1tQCMKVLDCUyIyHMQu6JPy9psCxpPzqZwxKNOS55XoBxAiN/I3pHnAR7hij3g3p6Wjc4jmKOy71PsU34kNMrF1jtPiRfCmENBaw/TEk+/Xfu3xzFXQxCljOyAmZq2p8WV4MmnHAMIA0RE2TQdB04t89/1O/w1cDnyilFU=",
   };
   let body = JSON.stringify({
      replyToken: reply_token,
      messages: [
         {
            type: "text",
            text: "Hello",
         },
         {
            type: "text",
            text: "How are you?",
         },
         {
            type: "location",
            title: "my location",
            address: "1-6-1 Yotsuya, Shinjuku-ku, Tokyo, 160-0004, Japan",
            latitude: latitude,
            longitude: longitude,
         },
      ],
   });

   request.post(
      {
         url: "https://api.line.me/v2/bot/message/reply",
         headers: headers,
         body: body,
      },
      (err, res, body) => {
         console.log("status = " + res.statusCode);
      }
   );
}
