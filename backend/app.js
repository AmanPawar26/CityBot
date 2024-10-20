const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the CORS middleware
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const authRoutes = require('./routes/authRoutes'); // Add this line
const restaurantRoutes = require('./routes/restaurantRoutes');
const concertRoutes = require('./routes/concertRoutes');
const exhibitionRoutes = require('./routes/exhibitionRoutes');
const theatreplayRoutes = require('./routes/theatreplayRoutes');
const thingsTodoRoutes = require('./routes/thingsTodoRoutes');
const reviewRoutes = require('./routes/reviewRoutes');




dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from frontend port
app.use(express.json()); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Test route to check if the database is connected
app.get('/test-db', async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    res.send('Database connected successfully!');
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Database error');
  } finally {
    if (connection) db.releaseConnection(connection);
  }
});

// Routes
app.use('/api/auth', authRoutes); 
app.use('/restaurants', restaurantRoutes);
app.use('/concerts', concertRoutes);
app.use('/exhibitions', exhibitionRoutes);
app.use('/theatreplays', theatreplayRoutes);
app.use('/thingstodo', thingsTodoRoutes);
app.use('/reviews', reviewRoutes);

// Default Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the City Chatbot API');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
