const conn = require("../lib/conexionbd");

conn.connect(function(err) {
  if (err) throw err;
});
const getPeliculas = (req, res) => {
  const filtroAnio = req.query.anio
    ? `p.anio = ${parseInt(req.query.anio)}`
    : "1 = 1";
  const filtroTitulo = req.query.titulo
    ? `p.titulo like "%${req.query.titulo}%"`
    : "1 = 1";
  const filtroGenero = req.query.genero
    ? `p.genero_id = ${parseInt(req.query.genero)}`
    : "1 = 1";
  const tipoOrden = req.query.tipo_orden ? req.query.tipo_orden : "";
  const orderBy = req.query.columna_orden
    ? `order by ${req.query.columna_orden} ${tipoOrden}`
    : "";
  const tamanioPag = parseInt(req.query.cantidad) || 1;
  const nroPagina = parseInt(req.query.pagina) || 1;
  const offset = tamanioPag * (nroPagina - 1);
  const filtro = `${filtroAnio} AND ${filtroTitulo} AND ${filtroGenero}`;
  const sql = `
        select p.* 
        from pelicula as p
        inner join genero as g on g.id = p.genero_id
        where ?
        ? 
        limit ?
        offset ?
        `;

  conn.query(sql, [filtro, orderBy, tamanioPag, offset], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("ERROR");
    }
    const resultado = {
      peliculas: result,
      total: 0
    };

    const sqlTotal = `select count(*) as total from pelicula as p where ?`;
    conn.query(sqlTotal, [filtro], (err, result) => {
      if (err) {
        console.log("1", err);
        return res.status(500).send("ERROR");
      }
      const fila = result.pop();
      resultado.total = fila.total ? fila.total : 0;
      res.json(resultado);
    });
  });
};

const getGeneros = (req, res) => {
  const sql = "select * from genero";
  conn.query(sql, (err, result) => {
    if (err) return res.status(500).send("ERROR");
    res.json({
      generos: result
    });
  });
};

const getPeliculaId = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = `
    select p.*, g.nombre
        from pelicula p 
        inner join genero g on g.id = p.genero_id
        where p.id = ?`;
  conn.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send("ERROR");
    if (result.length === 0) return res.status(500).send("ERROR");
    const sql2 = `
        select a.*
            from actor as a
            inner join actor_pelicula ap on ap.actor_id = a.id
            inner join pelicula as p on p.id = ap.pelicula_id
            where p.id = ?`;
    conn.query(sql2, [id], (err, result2) => {
      if (err) return res.status(500).send("ERROR");
      res.json({
        pelicula: result[0],
        genero: result[0]["nombre"],
        actores: result2
      });
    });
  });
};
const getRecomendacion = (req, res) => {
  const filtroGenero = req.query.genero
    ? `and g.nombre = '${req.query.genero}' `
    : "";
  const filtroAnioInicio = req.query.anio_inicio
    ? `and p.anio >= ${req.query.anio_inicio}`
    : "";
  const filtroAnioFin = req.query.anio_fin
    ? `and p.anio <= ${req.query.anio_fin}`
    : "";
  const filtroPuntuacion = req.query.puntuacion
    ? `and p.puntuacion >= ${req.query.puntuacion}`
    : "";
  const sql = `
    select * 
    from pelicula  as p 
    inner join genero g on g.id = p.genero_id
    where 1=1
    ?
    ?
    ?
    ?
     `;
  conn.query(
    sql,
    [filtroGenero, filtroAnioInicio, filtroAnioFin, filtroPuntuacion],
    (err, result) => {
      console.log(err);
      if (err) return res.status(500).send("Error");
      res.json({
        peliculas: result
      });
    }
  );
};

module.exports = {
  getPeliculas,
  getGeneros,
  getPeliculaId,
  getRecomendacion
};
