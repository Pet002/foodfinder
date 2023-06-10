const { Payload } = require("dialogflow-fulfillment");
const { Op } = require("sequelize");
const Store = require('../db/models/store.model');
const { templates } = require("../templates/store.template")

// To find a resturant at nearby locations
const ListNearStores = async (agent, req) => {
   const coord = req.body.queryResult.parameters.number;
   const latitude = coord[0];
   const longtitude = coord[1];

   // Query the database for stores within a certain range of coordinates
   const res = await Store.findAll({
      where: {
         lat: {
            [Op.between]: [latitude - 0.2, latitude + 0.2],
         },
         long: {
            [Op.between]: [longtitude - 0.2, longtitude + 0.2],
         },
      },
   });

   // Extract the data values from the query results
   const storeResults = [res[0].dataValues, res[1].dataValues];

   // Create a payload with the store results
   const payload = {
      line: templates(storeResults),
   };

   // Add the payload to the agent's response
   agent.add(
      new Payload(agent.UNSPECIFIED, payload, {
         rawPayload: true,
         sendAsMessage: true,
      })
   );
};


// To show a restuarant of you
const ShowRestuarant = async (agent, req) => {
   console.log(req.body.queryResult)
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
         agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
               rawPayload: true,
               sendAsMessage: true,
            })
         );

      }
      else {
         agent.add(`ไม่พบร้าน ${store_name}`);
      }

   } catch (error) {
      agent.add(`มีบางอย่างผิดปกติ`);
   }
}

module.exports = { ListNearStores, ShowRestuarant };
