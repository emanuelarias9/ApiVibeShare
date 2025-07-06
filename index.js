// importar dependencias
const connection = require("./database/connection.js");
const express = require("express");
const cors = require("cors");

//conexion
connection();

// crear el servidor
const app = express();
const port = 3900;

// Middlewares

//configurar cors
app.use(cors());

// convertir body a json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ruta de prueba
app.get("/Test", (req, res) => {
  return res.status(200).json({
    message: "API VibeShare funcionando correctamente",
  });
});

// Iniciar servidor y escuchar rutas
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
