const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

app.post('/api/v1/get-tacos', async (req, res) => {
  const yelpAPI = functions.config().yelp.key
  const body = JSON.parse(req.body)
  try {
    const data = await axios(`https://api.yelp.com/v3/businesses/search?term=tacos&latitude=${body.lat}&longitude=${body.lng}&sort_by=rating`, {
      headers: {
        "Authorization": `Bearer ${yelpAPI}`
      }
    })
    console.log(data)
    res.json({data: data.data})
  } catch(err) {
    console.log(err)
  }
})

exports.app = functions.https.onRequest(app);