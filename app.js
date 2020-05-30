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

// seed Data
const seedData = require('./models/seed_vampires.js');
const additional4 = [{
    name: 'Adam Sandler',
    title: 'Count Dracula',
    hair_color: 'black',
    eye_color: 'black',
    dob: Date('<1895-01-25>'),
    loves: ['his wife', 'hotel management'],
    location: 'Transylvania',
    gender: 'm',
    victims: 50
}, {
    name: 'Feniana Sinevoon',
    title: 'Duchess of Shrill',
    hair_color: 'gold',
    eye_color: 'green',
    dob: '1238-5-3',
    loves: ['apple', 'grape'],
    location: 'Washington',
    gender: 'f'
}, {
    name: 'Valencia Morinaga',
    title: 'Countess Draculasian',
    hair_color: 'green',
    eye_color: 'green',
    dob: '768-03-12',
    loves: ['drinking blood', 'travel around the world'],
    location: 'Scotland',
    gender: 'f',
    victims: 5786
}, {
    name: 'Voom Moriono',
    title: 'Don Juan',
    hair_color: 'black',
    eye_color: 'blue',
    dob: '247-11-11',
    loves: ['women', 'girls', 'pretty stuff'],
    location: 'Paris',
    gender: 'm',
    victims: 68687
}];

// Use connect method to connect to the Server
client.connect((err) => {
    assert.equal(null, err);
    console.log('Connected successfully to Mongo server');

    const Vampires = client.db(dbName).collection('Vampires');

    // Insert seed data
    Vampires.insertMany(seedData, function (err, result) {
        assert.equal(null, err);
        assert.equal(seedData.length, result.insertedCount);

        client.close();
    });

    // Insert additional 4 draculas
    Vampires.insertMany(additional4, function (err, result) {
        assert.equal(null, err);
        assert.equal(additional4.length, result.insertedCount);

        client.close();
    });



});

