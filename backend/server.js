// server.js
require("dotenv").config(); // Load environment variables
const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}/`);
});
