const { Payload } = require("dialogflow-fulfillment");
const { Op } = require("sequelize");
const Store = require('../db/models/store.model');
const { templates } = require("../templates/store.template");

// To find a resturant at nearby locations
const ListNearStores = async (agent, req) => {
   const coord = req.body.queryResult.parameters.number;
   const latitude = coord[0];
   const longtitude = coord[1];

   try {
      // Query all stores within a certain range of coordinates, filtered by latitude and longitude
      // The latitude and longitude values are restricted to a range of +- 0.2
      // The resulting data is sorted in ascending order based on latitude and longitude
      const result = await Store.findAll({
         where: {
            lat: {
               [Op.between]: [latitude - 0.2, latitude + 0.2],
            },
            long: {
               [Op.between]: [longtitude - 0.2, longtitude + 0.2],
            },
         },
         order: [
            ['lat', 'ASC'],
            ['long', 'ASC'],
         ]
      });

      if (result) {
         // Create a payload with the store results
         const payload = {
            line: templates(result),
         };
      
         // Add the payload to the agent's response
         agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
               rawPayload: true,
               sendAsMessage: true,
            })
         );
      } else {
         agent.add("ไม่พบร้านอาหารใกล้ตำแหน่งของคุณ")
      }
   
   } catch {
      agent.add("มีบางอย่างผิดปกติ")
   }
};


// To show a restuarant of you
const ShowRestuarant = async (agent, req) => {
   console.log(req.body.originalDetectIntentRequest.payload.data)
   const store_name = req.body.queryResult.parameters.store_name

   try {
      const result = await Store.findOne({
         where: {
            store_name: store_name
         }
      })
      if (result) {
         const payload = {
            "line": {
               "type": "location",
               "title": `ตำแหน่งร้าน ${result.store_name}`,
               "address": "ได้ตำแหน่งร้านอาหารแล้ว",
               "latitude": result.lat,
               "longitude": result.long
            }
         }
         // agent.add(`แสดงตำแหน่งร้าน ${result.store_name}`)
         agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
               rawPayload: true,
               sendAsMessage: true,
            })
         );

      }
      else {
         agent.add(`ไม่พบตำแหน่งร้าน ${store_name}`);
      }

   } catch (error) {
      agent.add(`มีบางอย่างผิดปกติ`);
   }
}

// Function for add new stores to databases.
const addNewRestaurant = async (agent, req) => {
   const store_name = req.body.queryResult.parameters.restaurant
   const detail = req.body.queryResult.parameters.detail
   const location_text = req.body.queryResult.parameters.location
   const split_location = location_text.split(" ")
   const latitude = parseFloat(split_location[2])
   const longitude = parseFloat(split_location[6])

   const data = {
      store_name: store_name,
      detail: detail,
      lat: latitude,
      long: longitude
   }
   try {
      const result = await Store.create(data)
      if(result) {
         agent.add(`เพิ่มร้านอาหาร ${store_name} สำเร็จ`)
      } else {
         agent.add(`ไม่สามารถเพิ่มร้านอาหาร ${store_name} ได้`)
      }
   } catch(error){
      if (error.name === "SequelizeUniqueConstraintError"){
         agent.add(`ไม่สามารถเพิ่มข้อมูลร้าน "${store_name}" ได้, มีร้านนี้อยู่แล้ว`)
      } else {   
         agent.add("มีบางอย่างผิดปกติ")
      }
   }

}

module.exports = { ListNearStores, ShowRestuarant, addNewRestaurant };
