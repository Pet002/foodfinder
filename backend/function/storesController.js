const { Payload } = require('dialogflow-fulfillment')
const { Op } = require("sequelize");

const listNearStores = async (agent, req) => {
    const coord = req.body.queryResult.parameters.number
    const latitude = coord[0] 
    const longtitude = coord[1]

    // Query the database for stores within a certain range of coordinates
    const res = await Store.findAll({
       where:{
          lat: {
             [Op.between]: [latitude-0.2, latitude+0.2]
          },
          long: {
             [Op.between]: [longtitude-0.2, longtitude+0.2]
          },
       }
    })

    

    // Extract the data values from the query results
    const storeResults = [res[0].dataValues, res[1].dataValues]

    // Create a payload with the store results
    const payload = {
       "line": templates(storeResults)
    } 
    
    // Add the payload to the agent's response
    agent.add(new Payload(agent.UNSPECIFIED, payload, {rawPayload: true, sendAsMessage: true}));
 }

 

 module.exports = {listNearStores}