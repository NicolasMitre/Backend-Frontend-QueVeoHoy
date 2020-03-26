# ¿Qué veo hoy?

Este es un proyecto que incluye un Backend que utiliza la base de datos ya cargada con scripts para brindarle información al Frontend

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

Para ejecutar este proyecto y todas sus dependencias deberemos de instalar

```
    - mysql
    - cors
    - express
```

### Instalación 🔧

Instalamos las dependencias

```
npm install
```

Y para comenzar deberás correr los scripts que se encuentran en la carpeta /scripts uno a uno desde el 0 hasta el 3 para tener tu base de datos preparada para el Backend.

Continuamos corriendo el dicho Backend, para esto hay un script de npm ya configurado.

```
npm run watch
```

Para continuar con este proyecto deberás abrir el Frontend, en nuestro caso lo hicimos desde live server de Visual Studio Code.

### Endpoints

    ```
    "/peliculas"
    ```

Obtiene todas las peliculas y si por Query Params le damos valores tales como:
`anio, titulo, genero, tipo_orden, columna_orden, cantidad, pagina`
Funcionará a modo de filtro.

    ```
    "/peliculas/recomendacion"
    ```

Obtiene todas las peliculas recomendadas y si por Query Params les damos valores tales como:
`anio_inicio, anio_fin, genero, puntuacion`
Obtendrá peliculas filtradas por ellos.

    ```
    "/peliculas/:id"
    ```

Obtiene peliculas por su ID que es asignado en la url (PARAMS)
  
  
  
 `"/generos"`
Obtiene los generos existentes
