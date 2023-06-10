const quickReply = () => {
   return {
      "type": "text", // ①
      "text": "Select your favorite food category or send me your location!",
      "quickReply": { // ②
         "items": [
            {
               "type": "action", // ③
               "imageUrl": "https://example.com/sushi.png",
               "action": {
                  "type": "message",
                  "label": "Sushi",
                  "text": "Sushi"
               }
            },
            {
               "type": "action",
               "imageUrl": "https://example.com/tempura.png",
               "action": {
                  "type": "message",
                  "label": "Tempura",
                  "text": "Tempura"
               }
            },
            {
               "type": "action", // ④
               "action": {
                  "type": "location",
                  "label": "Send location"
               }
            }
         ]
      }
   }

}
module.exports = { quickReply }
/* A template of LINE quick reply button
{
  "type": "text", // ①
  "text": "Select your favorite food category or send me your location!",
  "quickReply": { // ②
    "items": [
      {
        "type": "action", // ③
        "imageUrl": "https://example.com/sushi.png",
        "action": {
          "type": "message",
          "label": "Sushi",
          "text": "Sushi"
        }
      },
      {
        "type": "action",
        "imageUrl": "https://example.com/tempura.png",
        "action": {
          "type": "message",
          "label": "Tempura",
          "text": "Tempura"
        }
      },
      {
        "type": "action", // ④
        "action": {
          "type": "location",
          "label": "Send location"
        }
      }
    ]
  }
}
*/