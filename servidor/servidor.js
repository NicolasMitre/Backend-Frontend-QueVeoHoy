//paquetes necesarios para el proyecto
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router.js");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const puerto = process.env.NODE_PORT;

app.use(morgan("dev"));

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use("/", router);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación

app.listen(puerto, function() {
  console.log("Escuchando en el puerto " + puerto);
});
