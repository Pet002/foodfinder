const scoreQuickReply = () => {
   const scores = [5, 4, 3, 2, 1]
   return {
      "type": "text",
      "text": "Select your favorite food category or send me your location!",
      "quickReply": {
         "items": scores.map((score) => {
            return {
               "type": "action",
               "action": {
                  "type": "message",
                  "label": `${score} ดาว`,
                  "text": `ต้องการให้ ${score} ดาว`
               }
            }
         })
      }
   }

}

const reviewQuestionQuickReply = () => {
   return {
      "type": "text", 
      "text": "อยากพิมพ์รีวิวร้านอาหารเพิ่มเติมไหม",
      "quickReply": { 
         "items": [
            {
               "type": "action",
               "action": {
                  "type": "message",
                  "label": "ใช่แล้ว",
                  "text": "ต้องการรีวิว"
               }
            },
            {
               "type": "action",
               "action": {
                  "type": "message",
                  "label": "ไม่ต้องการ",
                  "text": "ไม่ต้องการรีวิวเพิ่ม"
               }
            },
         ]
      }
   }
}
module.exports = { scoreQuickReply, reviewQuestionQuickReply }