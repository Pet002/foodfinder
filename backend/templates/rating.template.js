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

const restaurantReview = (datas, restaurant_data) => {
   return {
      type: "template",
      altText: "รีวิวร้าน",
      template: {
         type: "carousel",
         columns: datas.map((data) => {
            return {
               title: `รีวิว ${data.point} ดาว`,
               text: data.review,
               actions: [
                  {
                     type: "message",
                     label: "อยากรู้ว่าร้านนี้อยู่ไหน",
                     text: `แสดงตำแหน่งร้าน "${restaurant_data.store_name}"`,
                  },
                  {
                     type:"message",
                     label:"ดูรีวิวเสร็จสิ้น",
                     text:`ดูรีวิว "${restaurant_data.store_name}" เสร็จสิ้น`
                  },
                  {
                     type:"message",
                     label:"ต้องการดูรีวิวของร้าน",
                     text:`ต้องการดูรีวิวของร้าน "${restaurant_data.store_name}"`
                  },
                  
               ],
            }
         }),
      },
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

module.exports = { scoreQuickReply, reviewQuestionQuickReply, getReviewQuickReply, restaurantReview }