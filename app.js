/**********************************************************************
Set up and Configuration
**********************************************************************/
// Dependencies
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const vampires = require('./models/seed_vampires');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'vampire';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect((err) => {
    assert.equal(null, err);
    console.log('Connected successfully to Mongo server');

    const Vampires = client.db(dbName).collection('Vampires');

    client.close();
});

