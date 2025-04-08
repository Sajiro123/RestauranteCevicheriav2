const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  // host: '10.10.18.15',
  // user: 'aespinoza',
  // password: '@lex@3zP1n0Z4__-2O22',
  // database: 'centromedico_osi_20231115'
  host: '127.0.0.1',
  user: 'alex',
  password: '1234',
  database: 'bd_pruebas_'

});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});

// Servir los archivos de Angular en la carpeta "dist"
app.use(express.static(path.join(__dirname, 'dist', 'restaurante-cevicheria')));

// Endpoint de login
app.post('/post', (req, res) => {
  debugger
  const { query } = req.body;

  db.query(query, '', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ message: 'Error en el servidor' });
      return;
    }

    if (results.length > 0) {
      const userData = results;
      return  res.json({ success: true, message: 'Success', data: userData });
    } if (results.length == 0) {
      return  res.json({ success: true, message: 'Success' });
    }
    else {
      // debugger
      console.error('Credenciales incorrectas:', results);
      // return  res.json({ success: false, message: 'Credenciales incorrectas' });
      return  res.json({ success: true, message: 'Success' });

    }
  });
});

// Manejar rutas de Angular
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'restaurante-cevicheria', 'index.html'));
// });

// Endpoint for inserting data using GET (not recommended)
app.get('/insert', (req, res) => {
  const { query } = req.body;

  // Execute the query
  db.query(query, '', (err, results) => {
    if (err) {
      console.error('Error in the query:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    // If the insert was successful
    res.json({ success: true, message: 'User inserted successfully', data: results });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
