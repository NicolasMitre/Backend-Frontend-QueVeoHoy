//paquetes necesarios para el proyecto
const express = require("express");
const router = express.Router();
const controller = require("./controladores/controller");

router.get("/peliculas", controller.getPeliculas);
router.get("/peliculas/recomendacion", controller.getRecomendacion);
router.get("/peliculas/:id", controller.getPeliculaId);
router.get("/generos", controller.getGeneros);

module.exports = router;
