require("dotenv").config()
const ethers = require("ethers")
const abi = require("../abis/Nfvs.json").abi
const { AVAX, MUSCLE } = process.env
module.exports = new ethers.Contract(MUSCLE, abi, new ethers.providers.JsonRpcProvider(AVAX))
