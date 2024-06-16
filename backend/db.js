const mysql = require("mysql");
module.exports = { executeQuery };
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "test-db",
  user: "root",
  password: "",
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


