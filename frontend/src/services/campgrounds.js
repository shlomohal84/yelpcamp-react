const axios = require("axios");

async function getCampgrounds() {
  const response = await axios.get("/campgrounds");
  const { campgrounds } = response.data;
  console.log(campgrounds);
}

module.exports = { getCampgrounds };
