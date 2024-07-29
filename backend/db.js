require('dotenv').config();
const mysql = require("mysql");
module.exports = { executeQuery };
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Base de datos conectada");
  }
});

// Función para ejecutar consultas SQL
function executeQuery(sqlQuery, callback) {
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error);
      return callback(error, null);
    }
    //console.log("Consulta SQL ejecutada con éxito");
    callback(null, results);
  });
}


