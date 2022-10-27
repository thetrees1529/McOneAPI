//const metadata = require('../data/metadata.json');
const express = require("express")
const path = require("path")
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

const response = (id, meta) => Object.assign(meta, 
  {
    image: `https://metadata.mcverse.app/images/AHMC_${id}.png`,
    tokenId: id
  }
)

const rename = id => `AHMC_${id}`

muscleCarsRoutes.use("/images", exists, async (req,res) => {

  const id = req.query.id

  try {
    res.sendFile(path.resolve(`images/AHMC_${id}.png`))
  } catch(e) {
    console.log(e)
    res.sendStatus(404)
  }

})

muscleCarsRoutes.get('/muscleCar', exists, async function (req, res) {

  const id = req.query.id
   
  let meta

  try {
    meta = JSON.parse(await fs.readFile(`meta/${rename(id)}.json`, "utf8"))
  } catch {
    return res.json(genericResponse(id))
  }

  res.json(response(id, meta))

});

async function exists(req,res,next) {
  try {
    await muscleContract.ownerOf(req.query.id)
  } catch {
    return res.status(404).send("Muscle car does not exist.")
  } 
  next()
}


module.exports = muscleCarsRoutes;
