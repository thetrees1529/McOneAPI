//const metadata = require('../data/metadata.json');
const muscleCarsRoutes = require("express").Router()
const fs = require("fs").promises

muscleCarsRoutes.get('/muscleCar', async function (req, res, next) {

  const id = req.query.id
  let meta

  try {
    meta = JSON.parse(await fs.readFile(`./meta/${id}.json`, "utf8"))
    console.log(meta)
  } catch {
    res.json(
      {
        "tokenId": id,
        "name": `Keyfob #${id}`,
        "description": "Avax Muscle Cars are 10,000 randomly-generated 3D NFTs with utility that allows you to play, race, win, and earn crypto.",
        "external_url": "",
        "image": "https://storageapi.fleek.co/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/keyfob/keyfob.mp4",
        "attributes": []
      }
    )
  }

  res.json(meta)

});


module.exports = muscleCarsRoutes;