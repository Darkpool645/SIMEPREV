const express = require("express");
const swaggerSpec = require("./utils/SwaggerConfiguration");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const connectDB = require("./utils/MongoConection");

const authController = require("./controllers/AuthController");

require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authController);

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
  console.log(
    `To see all the endpoints, visit http://localhost:${PORT}/api-docs`
  );
});
