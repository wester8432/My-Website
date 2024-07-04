require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// 使用 CORS 中间件
app.use(cors());

// 代理 Riot API 的请求
app.get("/riot/:region/*", async (req, res) => {
  const region = req.params.region;
  const apiUrl = req.params[0];
  const apiKey = process.env.RIOT_API_KEY; // 请确保在环境变量中设置了 RIOT_API_KEY

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
