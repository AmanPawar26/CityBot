const db = require('../config/db');

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  const { name, cuisine, menu, operatingHours, contactInfo, highlights, city, locality } = req.body;
  const connection = await db.getConnection();
  try {
    const query = 'INSERT INTO Restaurant (name, cuisine, menu, operatingHours, contactInfo, highlights, city, locality) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    await connection.query(query, [name, cuisine, menu, operatingHours, contactInfo, highlights, city, locality]);
    res.status(201).json({ message: 'Restaurant created successfully.' });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: 'Failed to create restaurant.' });
  } finally {
    db.releaseConnection(connection);
  }
};

// get all restaurants
exports.getAllRestaurants = async (req, res) => {
  let connection;
  try {
    const { city, locality, cuisine } = req.query; // Destructure query parameters
    let query = `SELECT * FROM Restaurant WHERE 1=1`; // Base query with always-true condition

    // Add conditions based on available query parameters
    if (city) {
      query += ` AND city = '${city}'`;
    }
    if (locality) {
      query += ` AND locality = '${locality}'`;
    }
    if (cuisine) {
      query += ` AND cuisine LIKE '%${cuisine}%'`; // Adjusted for comma-separated values
    }

    console.log(query); // For debugging purposes
    connection = await db.getConnection();
    const [results] = await connection.query(query);
    if (results.length === 0) {
      // If no results are found, return a specific response
      res.status(200).json({ message: `No restaurants found for the given criteria.` });
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Failed to fetch restaurants.' });
  } finally {
    if (connection) db.releaseConnection(connection);
  }
};


// Get restaurant by ID

exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();
  try {
    const query = `SELECT * FROM Restaurant WHERE restaurantid = ${id}`;
    const [rows] = await connection.query(query);
    if (rows.length === 0) {
      res.type('json'); // Set Content-Type header
      return res.status(404).json({ message: 'Restaurant not found.' });
    }
    res.type('json'); // Set Content-Type header
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.type('json'); // Set Content-Type header
    res.status(500).json({ message: 'Failed to fetch restaurant.' });
  } finally {
    db.releaseConnection(connection);
  }
};



// Update restaurant by ID
exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, cuisine, menu, operatingHours, contactInfo, highlights, city, locality } = req.body;
  const connection = await db.getConnection();
  try {
    const query = 'UPDATE Restaurant SET name=?, cuisine=?, menu=?, operatingHours=?, contactInfo=?, highlights=?, city=?, locality=? WHERE restaurantid=?';
    await connection.query(query, [name, cuisine, menu, operatingHours, contactInfo, highlights, city, locality, id]);
    res.status(200).json({ message: 'Restaurant updated successfully.' });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: 'Failed to update restaurant.' });
  } finally {
    db.releaseConnection(connection);
  }
};

// Delete restaurant by ID
exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();
  try {
    const query = 'DELETE FROM Restaurant WHERE restaurantid=?';
    await connection.query(query, [id]);
    res.status(200).json({ message: 'Restaurant deleted successfully.' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: 'Failed to delete restaurant.' });
  } finally {
    db.releaseConnection(connection);
  }
};
