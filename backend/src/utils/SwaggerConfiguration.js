const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SIMEPREV API documentation",
      version: "1.0.0",
      description:
        "Documentación sobre los endpoints que utiliza el Sistema Médico Preventivo",
    },
  },
  apis: ["./src/controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
