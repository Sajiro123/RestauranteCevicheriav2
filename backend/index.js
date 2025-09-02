const express = require('express');
const { Pool } = require('pg'); // Usamos el cliente PostgreSQL
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());



// Configuración del pool de conexiones
const pool = new Pool({
    user: 'postgres.pywmysglgyvrweysiwzp',
    password: '5834067Alex@',
    host: 'aws-0-us-east-2.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    },
    // Forzar el método de autenticación
    connectionTimeoutMillis: 10000,
    query_timeout: 10000,
    statement_timeout: 10000,
    // Deshabilitar temporalmente SCRAM
    sslmode: 'require',
    // Usar autenticación md5 en lugar de scram-sha-256
    application_name: 'cevicheria-app',
    // Intentar forzar md5
    options: '-c search_path=public',
    // Opción: ejecutar SET timezone después de conectar
    afterCreate: function (connection, callback) {
        connection.query('SET timezone = \"America/Lima\";', function (err) {
            callback(err, connection);
        });
    }
});



// Función para probar la conexión
async function testConnection() {
    let client;
    try {
        console.log('Intentando conectar a la base de datos...');
        client = await pool.connect();
        console.log('Conexión exitosa a PostgreSQL');

        // Opcional: ejecutar una consulta simple para verificar
        const result = await client.query('SELECT NOW();');
        console.log('Hora actual de la base de datos:', result.rows[0].now);
    } catch (err) {
        console.error('Error conectando a PostgreSQL:', err.message);
    } finally {
        if (client) client.release();
    }
}

// Llamar a la función de prueba
testConnection();

// Endpoint para consultas
app.post('/post', async (req, res) => {
    let client;
    try {
        const { query } = req.body;

        // Obtener un cliente del pool
        client = await pool.connect();
        const result = await client.query(query);

        if (result.rows.length > 0) {
            return res.json({ success: true, message: 'Success', data: result.rows });
        } else {
            return res.json({ success: true, message: 'Success' });
        }
    } catch (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: err.message
        });
    } finally {
        // Liberar el cliente siempre
        if (client) client.release();
    }
});

// Endpoint de salud
app.get('/health', (req, res) => {
    res.json({ status: 'ok', db: 'postgresql' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
    console.error('Error no manejado:', err);
    process.exit(1);
});
// const express = require('express');
// const { Pool } = require('pg'); // Usamos el cliente PostgreSQL
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Configuración del pool de conexiones para PostgreSQL
// const pool = new Pool({
//   user: 'postgres',        // Usuario por defecto de PostgreSQL
//   host: 'localhost',       // O la dirección de tu servidor PostgreSQL
//   database: 'cevicheriaproyecto', // Asegúrate de crear esta base de datos primero
//   password: 'tu_contraseña',      // La contraseña que configuraste
//   port: 5432,              // Puerto por defecto de PostgreSQL
//   max: 10,                 // Número máximo de clientes en el pool
//   idleTimeoutMillis: 30000, // Tiempo que un cliente puede estar inactivo antes de ser cerrado
//   connectionTimeoutMillis: 2000, // Tiempo máximo de espera para una conexión
// });

// // Función para probar la conexión
// async function testConnection() {
//   let client;
//   try {
//     client = await pool.connect();
//     console.log('Conexión exitosa a PostgreSQL');

//     // Opcional: ejecutar una consulta simple para verificar
//     await client.query('SELECT NOW()');
//   } catch (err) {
//     console.error('Error conectando a PostgreSQL:', err);
//   } finally {
//     if (client) client.release();
//   }
// }

// // Llamar a la función de prueba
// testConnection();

// // Endpoint para consultas
// app.post('/post', async (req, res) => {
//   let client;
//   try {
//     const { query } = req.body;

//     // Obtener un cliente del pool
//     client = await pool.connect();
//     const result = await client.query(query);

//     if (result.rows.length > 0) {
//       return res.json({ success: true, message: 'Success', data: result.rows });
//     } else {
//       return res.json({ success: true, message: 'Success' });
//     }
//   } catch (err) {
//     console.error('Error en la consulta:', err);
//     return res.status(500).json({
//       success: false,
//       message: 'Error en el servidor',
//       error: err.message
//     });
//   } finally {
//     // Liberar el cliente siempre
//     if (client) client.release();
//   }
// });

// // Endpoint de salud
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', db: 'postgresql' });
// });

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor en funcionamiento en http://localhost:${port}`);
// });

// // Manejo de errores no capturados
// process.on('unhandledRejection', (err) => {
//   console.error('Error no manejado:', err);
//   process.exit(1);
// });
