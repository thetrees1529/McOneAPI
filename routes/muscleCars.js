//const metadata = require('../data/metadata.json');
const express = require("express")
const path = require("path")
const muscleCarsRoutes = express.Router()
const fs = require("fs").promises
const NodeCache = require("node-cache")
const muscleContract = require("../contracts/muscleContract.js")

muscleCarsRoutes.use("/images", async (req,res) => {

  const id = req.query.id

  if(!(exists(id))) res.status(404).send("Non existent")

  try {
    res.sendFile(path.resolve(`images/AHMC_${id}.png`))
  } catch(e) {
    console.log(e)
    res.sendStatus(404)
  }

})

muscleCarsRoutes.get('/muscleCar', async function (req, res) {

  const id = req.query.id

  try {
    res.json(await fetchResponse(id))
  } catch {
    res.sendStatus(404)
  }

});

muscleCarsRoutes.get('/muscleCars', async function (req, res) {
  let supply = 0
  try {
    supply = Number(await muscleContract.totalSupply())
  } catch {}
  let ids = Array.from(Array(supply).keys())
  try {
    ids = req.query.ids.split(",")
  } catch {}
  const jsons = []

  for(id of ids) {
    let json
    try {
      json = await fetchResponse(id)
    } catch {
      return res.sendStatus(404)
    }
    jsons.push(json)
  } 

  res.json(jsons)

});


const existsCache = new NodeCache()

async function exists(id) {
  const ret = existsCache.get(id)
  if(ret) return true
  try {
    await muscleContract.ownerOf(id)
  } catch {
    return false
  }
  existsCache.set(id, true)
  return true
}
async function fetchResponse(id) {
  if(!(await exists(id))) throw Error("Invalid tokenId")
  try {
    const meta = JSON.parse(await fs.readFile(`meta/AHMC_${id}.json`, "utf8"))
    return Object.assign(meta, {
      image: `https://metadata.mcverse.app/images?id=${id}`,
      tokenId: id
    })
  } catch {
    return {
      "tokenId": id,
      "name": `Keyfob #${id}`,
      "description": "Avax Muscle Cars are 10,000 randomly-generated 3D NFTs with utility that allows you to play, race, win, and earn crypto.",
      "external_url": "",
      "image": "https://storageapi.fleek.co/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/keyfob/keyfob.mp4",
      "attributes": []
    }
  }
}




module.exports = muscleCarsRoutes
