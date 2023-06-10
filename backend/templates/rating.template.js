const scoreQuickReply = () => {
   const scores = [5, 4, 3, 2, 1]
   return {
      "type": "text",
      "text": "ได้ครับท่าน อยากให้ดาวร้านนี้กี่คะแนน",
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


const getReviewQuickReply = () => {
   const scores = [5, 4, 3, 2, 1]
   return {
      "type": "text",
      "text": "อยากดูรีวิวของร้านอาหารที่กี่ดาว",
      "quickReply": {
         "items": scores.map((score) => {
            return {
               "type": "action",
               "action": {
                  "type": "message",
                  "label": `${score} ดาว`,
                  "text": `ต้องการดูรีวิว ${score} ดาว`
               }
            }
         })
      }
   }

}

const restaurantReview = (review) => {
   return {
      "type": "template",
      "altText": "this is a confirm template",
      "template": {
        "type": "confirm",
        "text": `${review.review}`,
        "actions": [
          {
            "type": "message",
            "label": "Yes",
            "text": "yes"
          },
          {
            "type": "message",
            "label": "No",
            "text": "no"
          }
        ]
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
module.exports = { scoreQuickReply, reviewQuestionQuickReply , getReviewQuickReply, restaurantReview}