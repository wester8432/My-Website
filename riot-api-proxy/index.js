require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/riot/:region/*", async (req, res) => {
  const region = req.params.region;
  const apiUrl = req.params[0];
  const apiKey = process.env.RIOT_API_KEY;

  try {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/${apiUrl}`,
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
