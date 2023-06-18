const { text } = require("express");
const Rating = require("../db/models/rating.model");
const Store = require("../db/models/store.model");
const { scoreQuickReply, reviewQuestionQuickReply, getReviewQuickReply, restaurantReview } = require("../templates/rating.template")
const { Payload } = require("dialogflow-fulfillment");


const sendQuickReply = async (agent, req, maps) => {
   const uid = req.body.originalDetectIntentRequest.payload.data.source.userId
   const restaurant = req.body.queryResult.parameters.restaurant

   const result = await Store.findOne({
      where: {
         store_name: restaurant
      }
   })
   if (result) {
      console.log(req.body.queryResult.parameters)
      maps.set(uid, restaurant)
      console.log(maps)
      try {
         const payload = {
            line: scoreQuickReply()
         }

         agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
               rawPayload: true,
               sendAsMessage: true,
            })
         );
      } catch {
         agent.add("ไม่สามารถแสดงตัวเลือกคะแนนได้ มีบางอย่างผิดปกติ")
      }
   } else {
      agent.add(`ไม่พบร้านอาหาร ${restaurant}`)
   }

}
const updateRating = async (agent, req, rating_id) => {
   const uid = req.body.originalDetectIntentRequest.payload.data.source.userId
   const r_id = rating_id.get(uid)
   const review = req.body.queryResult.parameters.review

   const result = await Rating.update({ review: review }, {
      where: {
         rating_id: r_id
      }
   });

   // console.log(result)
   agent.add("ขอบคุณสำหรับการรีวิวครับผม")
}

const addRating = async (agent, req, rating, rating_id) => {
   const uid = req.body.originalDetectIntentRequest.payload.data.source.userId
   const restaurant = rating.get(uid)
   console.log(rating)
   console.log(uid)
   console.log(restaurant)


   const selected_restaurant = await Store.findOne({
      where: {
         store_name: restaurant
      }
   })

   if (selected_restaurant) {
      const data = {
         point: req.body.queryResult.parameters.Rating,
         store_id: selected_restaurant.store_id
      }

      try {
         const result = await Rating.create(data)
         if (result) {
            rating_id.set(uid, result.dataValues.rating_id)
            const payload = {
               line: reviewQuestionQuickReply()
            }
            agent.add(
               new Payload(agent.UNSPECIFIED, payload, {
                  rawPayload: true,
                  sendAsMessage: true,
               })
            )
         }
      } catch (error) {
         agent.add("มีบางอย่างผิดปกติ")
      }
   } else {
      agent.add("ไม่พบร้านอาหารดังกล่าว")

   }


}


const checkRestaurantHasReview = async (agent, req, review) => {
   const restaurant_name = req.body.queryResult.parameters.restaurant_name
   const result = await Store.findOne({
      where: {
         store_name: restaurant_name
      }
   })
   if (result) {
      const uid = req.body.originalDetectIntentRequest.payload.data.source.userId
      review.set(uid, result.store_id)

      const payload = {
         line: getReviewQuickReply()
      }
      agent.add(
         new Payload(agent.UNSPECIFIED, payload, {
            rawPayload: true,
            sendAsMessage: true,
         })
      )
   } else {
      agent.add(`ไม่พบร้าน ${restaurant_name}`)
   }
}

const getRestaurantReview = async (agent, req, reviewed) => {
   const uid = req.body.originalDetectIntentRequest.payload.data.source.userId
   const store_id = reviewed.get(uid)
   const score = req.body.queryResult.parameters.score

   try {
      const result = await Rating.findAll({
         where: {
            store_id: store_id,
            point: score
         }
      })
      if (result) {
         const restaurant_data = await Store.findOne({
            where: {
               store_id: store_id
            }
         })

         const payload = {
            line: restaurantReview(result, restaurant_data)
         }

         console.log(payload)
         // agent.add ("OK!!!! wideqjfeqfj")
         agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
               rawPayload: true,
               sendAsMessage: true,
            })
         )
      } else {
         agent.add("ไม่พบรีวิวของร้านดังกล่าว")
      }
   } catch (error) {
      agent.add("มีบางอย่างผิดปกติ")
   }
}


const TestMessage = async (agent, req) => {

   const payload1 = {
      line: {
         type: "text",
         text: "test"
      }
   }

   console.log("test")
   agent.add(new Payload(agent.UNSPECIFIED, payload1, { rawPayload: true, sendAsMessage: true }))
   agent.add(new Payload(agent.UNSPECIFIED, payload1, { rawPayload: true, sendAsMessage: true }))
   // agent.add(new Payload('LINE', payload2, { sendAsMessage: true }))
}
module.exports = { sendQuickReply, addRating, updateRating, checkRestaurantHasReview, getRestaurantReview, TestMessage }