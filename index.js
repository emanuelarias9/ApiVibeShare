// importar dependencias
require("dotenv").config();
const connection = require("./database/connection.js");
const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//conexion
connection();

// crear el servidor
const app = express();
const port = process.env.PORT || 3900;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API VibeShare",
      version: "1.0.0",
      description:
        "Documentación para la Api Rest de la red social VibeShare creada con NodeJS, expressJS y mongoose",
    },
    servers: [{ url: process.env.HOST_URL }],
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const specs = swaggerJsdoc(swaggerOptions);

// Middlewares

//configurar cors
app.use(cors());

// convertir body a json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Rutas de la API
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const FollowRoutes = require("./routes/FollowRoutes");

app.use(`${process.env.URL_API_BASE}/user`, UserRoutes);
app.use(`${process.env.URL_API_BASE}/post`, PostRoutes);
app.use(`${process.env.URL_API_BASE}/follow`, FollowRoutes);

// Iniciar servidor y escuchar rutas
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
  console.log(`Documentación disponible en ${process.env.HOST_URL}/api-docs`);
});
