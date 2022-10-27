//const metadata = require('../data/metadata.json');
const express = require("express")
const muscleCarsRoutes = express.Router()
const fs = require("fs").promises
const muscleContract = require("../contracts/muscleContract.js")

const genericResponse = id => ({
  "tokenId": id,
  "name": `Keyfob #${id}`,
  "description": "Avax Muscle Cars are 10,000 randomly-generated 3D NFTs with utility that allows you to play, race, win, and earn crypto.",
  "external_url": "",
  "image": "https://storageapi.fleek.co/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/keyfob/keyfob.mp4",
  "attributes": []
})

muscleCarsRoutes.get('/muscleCar', async function (req, res) {

  const id = req.query.id

  try {
    await muscleContract.ownerOf(id)
  } catch {
    return res.status(404).send("Muscle car not found.")
  }


  let meta

  try {
    meta = JSON.parse(await fs.readFile(`./meta/AHMC_${id}.json`, "utf8"))
  } catch {
    return res.json(genericResponse(id))
  }

  res.json(meta)

});


module.exports = muscleCarsRoutes;
