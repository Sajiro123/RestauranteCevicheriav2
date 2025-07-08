const express = require('express');
const mysql = require('mysql2/promise'); // Asegúrate de usar la versión con promesas
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración del pool de conexiones (declarado como constante)
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'cevicheriaproyecto',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Conexión exitosa a MySQL');

    // Opcional: ejecutar una consulta simple para verificar
    await connection.query('SELECT 1');
  } catch (err) {
    console.error('Error conectando a MySQL:', err);
  } finally {
    if (connection) connection.release();
  }
}

// Llamar a la función de prueba
testConnection();

// Endpoint para consultas
app.post('/post', async (req, res) => {
  let connection;
  try {
    const { query } = req.body;

    // Obtener una conexión del pool
    connection = await pool.getConnection();
    const [results] = await connection.query(query);

    if (results.length > 0) {
      return res.json({ success: true, message: 'Success', data: results });
    } else {
      return res.json({ success: true, message: 'Success' });
    }
  } catch (err) {
    console.error('Error en la consulta:', err);
    return res.status(500).json({ message: 'Error en el servidor' });
  } finally {
    // Liberar la conexión siempre
    if (connection) connection.release();
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
