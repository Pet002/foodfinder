const Rating = require("../db/models/rating.model");
const Store = require("../db/models/store.model");
const { scoreQuickReply, reviewQuestionQuickReply } = require("../templates/rating.template")
const { Payload } = require("dialogflow-fulfillment");


const sendQuickReply = async (agent, req, maps) => {
   const uid = req.body.originalDetectIntentRequest.payload.data.source.userId
   const restaurant = req.body.queryResult.parameters.restaurant
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
   } catch{
      agent.add("ไม่สามารถแสดงตัวเลือกคะแนนได้ มีบางอย่างผิดปกติ")
   }

}
const updateRating = async (agent, req, rating_id) => {
   const uid = req.body.originalDetectIntentRequest.payload.data.source.userId
   const r_id = rating_id.get(uid)
   const review = req.body.queryResult.parameters.review

   const result = await Rating.update({ review: review }, {
      where: {
         rating_id:r_id
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
   } catch(error){
      agent.add("มีบางอย่างผิดปกติ")
   }
}

module.exports = { sendQuickReply, addRating, updateRating }