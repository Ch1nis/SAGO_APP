const express = require('express');
const path = require('path');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const port = 3000;
const { executeQuery } = require('./db');

app.get('/', (req, res) => {
    // res.send('Hello World!');
    console.log('../frontend/index.html')
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
  console.log('Server is running on port',port);
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


