require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const port = process.env.BACKEND_PORT;
const { executeQuery } = require('./db');

app.get('/', (req, res) => {
  // res.send('Hello World!');
  console.log('../frontend/index.html')
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});

app.post('/login', (req, res) => {
  const { rut, password } = req.body;
  let sqlQuery = 'SELECT COUNT(*) AS total FROM usuarios WHERE rut = ? AND password = ?';

  executeQuery(mysql.format(sqlQuery, [rut, password]), (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta SQL:', error);
      res.status(500).send('Error al ejecutar la consulta SQL');
      return;
    }

    if (results[0].total > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });
});

app.post('/poligonos', (req, res) => {
  console.log("a")
  const { id_poligono } = req.body;
  let sqlQuery = 'SELECT * FROM poligonos WHERE id_poligono = ?';
  executeQuery(mysql.format(sqlQuery, [id_poligono]), (error, results) => {
    console.log(results)
    if (error) {
      console.error('Error al ejecutar la consulta SQL:', error);
      res.status(500).send('Error al ejecutar la consulta SQL');
      return;
    }
    if (results.length > 0) {
      const polygonData = results[0];
      console.log(polygonData)
      polygonData.coordinates = JSON.parse(polygonData.coordinates);
      res.json(polygonData);
    } else {
      res.status(404).send('Polígono no encontrado');
    }
  });
});


// actualizar datos de db segun id_poligono
app.put('/poligonos', (req, res) => {
  const { id_poligono, name_poligono, info_poligono, hora_poligono } = req.body;
  let sqlQuery = 'UPDATE poligonos SET name_poligono = ?, info_poligono = ?, hora_poligono = ? WHERE id_poligono = ?';
  executeQuery(mysql.format(sqlQuery, [name_poligono, info_poligono, hora_poligono, id_poligono]), (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta SQL:', error);
      res.status(500).send('Error al ejecutar la consulta SQL');
      return;
    }
    res.json({ success: true });
  });
});