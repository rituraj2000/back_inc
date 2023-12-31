const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.get("/swap", async (req, res) => {
  const accountAddress = req.query.accountAddress;
  const srcCoinAddr = req.query.srcCoinAddr;
  const amt = req.query.amt;
  const url = "https://api.1inch.dev/swap/v5.2/56/swap";

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
    params: {
      src: srcCoinAddr,
      dst: "0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153",
      amount: amt,
      from: accountAddress,
      slippage: "1",
    },
  };

  try {
    const response = await axios.get(url, config);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error.response.data.description);
    res.json({ error: `${error.response.data.description}` });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
