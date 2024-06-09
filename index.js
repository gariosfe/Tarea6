const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configurar conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Tarea6'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo para verificar la conexión a la base de datos
app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) {
      console.error('Error during the query: ' + err.stack);
      res.status(500).send('Error during the query');
      return;
    }
    res.send('The solution is: ' + rows[0].solution);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Cerrar la conexión al terminar
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection: ' + err.stack);
      return;
    }
    console.log('Database connection closed');
    process.exit();
  });
});

