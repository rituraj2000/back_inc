const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/swap", async (req, res) => {
  const accountAddress = req.query.accountAddress;
  const url = "https://api.1inch.dev/swap/v5.2/56/swap";
  console.log(req.query);

  const config = {
    headers: {
      Authorization: "Bearer 4WyjmE36P9R1UQDLFrszynHOkM4d15mW",
    },
    params: {
      src: "0xeca88125a5adbe82614ffc12d0db554e2e2867c8",
      dst: "0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153",
      amount: "1",
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
    res.status(500).send("An error occurred");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
