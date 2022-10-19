//const metadata = require('../data/metadata.json');

const muscleCarsRoutes = (app) => {
  /*async function getMetadataFromDatabase(id) {
    let data = {
      tokenId: -1
    };

    for (let i = 0; i < metadata.length; i++) {
      if (metadata[i].tokenId == id) {
        return metadata[i];
      }
    }
  
    return data;
  }

  app.get('/api/knight', async function (req, res, next) {
    try {
      const knightId = parseInt(req.query.id)
      let id = parseInt(knightId);
      let meta = await getMetadataFromDatabase(id);

      return res.send(meta);
    } catch (err) {
      return res.status(500).send('Internal Error');
    }
  });*/

  app.get('/muscleCar', async function (req, res, next) {
    try {
        const tokId = parseInt(req.query.id)
        let id = parseInt(tokId);
        let meta = {
            "tokenId": id,
            "name": `Keyfob #${id}`,
            "description": "Avax Muscle Cars are 10,000 randomly-generated 3D NFTs with utility that allows you to play, race, win, and earn crypto.",
            "external_url": "",
            "image": "https://storageapi.fleek.co/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/keyfob/keyfob.mp4",
            "attributes": []
        };

        return res.send(meta);
    } catch (err) {
        return res.status(500).send('Internal Error');
    }
});
};


module.exports = muscleCarsRoutes;