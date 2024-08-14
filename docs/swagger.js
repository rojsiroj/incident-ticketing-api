/* Swagger configuration */
const options = {
  openapi: "OpenAPI 3", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  disableLogs: false, // Enable/Disable logs. By default is false
  autoHeaders: false, // Enable/Disable automatic headers capture. By default is true
  autoQuery: false, // Enable/Disable automatic query capture. By default is true
  autoBody: false, // Enable/Disable automatic body capture. By default is true
};

const config = require("../config/cloud.config");
const swaggerAutogen = require("swagger-autogen")();
const msg = require("../utils/lang/messages");

const doc = {
  info: {
    version: "2.0.0", // by default: '1.0.0'
    title: "EBCo Test API", // by default: 'REST API'
    description: "API EBCo Developer Test", // by default: ''
    contact: {
      name: "Muhamad Sirojudin",
      email: "sirojudin.dev@gmail.com",
    },
  },
  host: config.swagger.host, // by default: 'localhost:3000'
  basePath: "/", // by default: '/'
  schemes: ["http"], // by default: ['http']
  consumes: ["application/json"], // by default: ['application/json']
  produces: ["application/json"], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: "Queue CRUD", // Tag name
      description: "Queue related apis", // Tag description
    },
    {
      name: "Health",
      description: "Health Check",
    },
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {
    helathResponse: {
      code: msg.response.c200.code,
      message: msg.response.c200.message,
    },
    "errorResponse.400": {
      code: msg.response.c400.code,
      message: msg.response.c400.message,
    },
    "errorResponse.403": {
      code: msg.response.c403.code,
      message: msg.response.c403.message,
    },
    "errorResponse.404": {
      code: msg.response.c404.code,
      message: msg.response.c404.message,
    },
    "errorResponse.500": {
      code: msg.response.c500.code,
      message: msg.response.c500.message,
    },
  }, // by default: empty object (Swagger 2.0)
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["..js", "./controllers/*.js"];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });
