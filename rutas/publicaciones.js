// Cargar el módulo express
const express = require('express');

// Inicializar el enrutador
const router = express.Router();

// Cargar el módulo mysql
const mysql = require('mysql');

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Tarea6' // Cambia 'nodemysql' al nombre de tu base de datos MySQL
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Definir la ruta para la página principal
router.get('/', function (req, res) {
  res.send('home');
});

// Exportar el enrutador
module.exports = router;