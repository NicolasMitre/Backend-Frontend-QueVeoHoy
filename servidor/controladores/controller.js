const bd = require("../lib/conexionbd");

const getPeliculas = (req, res) => {
  const sql = `SELECT * FROM pelicula`;
  const sqlTotal = `SELECT COUNT(id) as total FROM pelicula`;
  const sqlParam = [];
  let where = " WHERE id > 0";

  const {
    genero,
    anio,
    titulo,
    columna_orden,
    tipo_orden = "ASC",
    pagina,
    cantidad
  } = req.query;

  if (genero) {
    where = `${where} AND genero_id = ?`;
    sqlParam.push(genero);
  }

  if (anio) {
    where = `${where} AND anio = ?`;
    sqlParam.push(anio);
  }

  if (titulo) {
    where = `${where} AND titulo LIKE ?`;
    sqlParam.push(`%${titulo}%`);
  }

  const orderBy = columna_orden
    ? `ORDER BY ${columna_orden} ${tipo_orden}`
    : "";

  const limit = cantidad ? `LIMIT ${cantidad}` : "";

  let pagination = "";

  if (pagina && pagina > 1) pagination = `OFFSET ${(pagina - 1) * cantidad}`;

  bd.query(
    `${sql} ${where} ${orderBy} ${limit} ${pagination}`,
    sqlParam,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Error");
      }

      finalResult = { peliculas: results, total: 0 };

      bd.query(`${sqlTotal}${where}`, sqlParam, (err, countResults) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Error");
        }

        finalResult.total = countResults[0].total;
        res.send(finalResult);
      });
    }
  );
};

const getGeneros = (req, res) => {
  const sql = `SELECT id, nombre FROM genero`;
  bd.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Internal Error");
    }
    res.send({ generos: results });
  });
};

const getPeliculaId = (req, res) => {
  const { id } = req.params;
  let sql = `select p.id as 'pelicula_id', titulo, duracion, director, anio, fecha_lanzamiento , puntuacion, poster, trama, genero_id, nombre from pelicula p JOIN genero g ON (p.genero_id  = g.id ) where p.id = ?`;
  bd.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    }

    sql = `select actor_id, nombre from actor_pelicula ap JOIN actor a ON (a.id = ap.actor_id ) where pelicula_id =?`;
    bd.query(sql, [id], (err, results2) => {
      res.send({ pelicula: results[0], actores: results2 });
    });
  });
};

const getRecomendacion = (req, res) => {
  const sql = `SELECT p.* FROM pelicula p JOIN genero g ON (p.genero_id = g.id)`;
  const sqlParam = [];
  let where = " WHERE p.id > 0";

  const { genero, anio_inicio, anio_fin, puntuacion } = req.query;

  if (genero) {
    where = `${where} AND g.nombre = ?`;
    sqlParam.push(genero);
  }

  if (anio_inicio && anio_fin) {
    where = `${where} AND anio BETWEEN ? AND ?`;
    sqlParam.push(anio_inicio);
    sqlParam.push(anio_fin);
  }

  if (puntuacion) {
    where = `${where} AND puntuacion = ?`;
    sqlParam.push(puntuacion);
  }

  bd.query(`${sql} ${where}`, sqlParam, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Error");
    }

    finalResult = { peliculas: results };

    res.send(finalResult);
  });
};

module.exports = {
  getPeliculas,
  getGeneros,
  getPeliculaId,
  getRecomendacion
};
