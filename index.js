const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const app = express();
const port = 8080; // You can change this to any port you prefer

// Sample data (you can replace this with data from your CSV file)
const sampleData = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 30 },
  // Add more sample data as needed
];

// Define a route to get all data
app.get('/api/data', (req, res) => {
  res.json(sampleData);
});

// Define a route to get a specific row by ID
app.get('/api/data/:id', (req, res) => {
    const id = req.params.id;

    
    // Specify the path to your CSV file
    const csvFilePath = 'pincode-dataset.csv';
    
    // Create a variable to store the found row
    let foundRow = null;
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {

        if (row.Pincode === id) {
          foundRow = row;

        }
      })
      .on('end', () => {
        // The end event is triggered when the entire CSV file has been processed
        if (foundRow) {
          res.send({data: foundRow})
        } else {
            res.send({data: null})
        }
      })
      .on('error', (error) => {
        // Handle errors during the parsing process
        console.error('Error:', error.message);
      });
    
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
