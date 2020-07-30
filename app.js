/**********************************************************************
Set up and Configuration
**********************************************************************/
// Dependencies
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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
    dob: new Date('4 Dec 1895 00:00:00 +0800'),
    loves: ['his wife', 'hotel management'],
    location: 'Transylvania',
    gender: 'm',
    victims: 50
}, {
    name: 'Feniana Sinevoon',
    title: 'Duchess of Shrill',
    hair_color: 'gold',
    eye_color: 'green',
    dob: new Date('12 Dec 1238 00:00:00 +0800'),
    loves: ['apple', 'grape'],
    location: 'Washington',
    gender: 'f'
}, {
    name: 'Valencia Morinaga',
    title: 'Countess Draculasian',
    hair_color: 'green',
    eye_color: 'green',
    dob: new Date('12 Mar 768 00:00:00 +0800'),
    loves: ['drinking blood', 'travel around the world'],
    location: 'Scotland',
    gender: 'f',
    victims: 5786
}, {
    name: 'Voom Moriono',
    title: 'Don Juan',
    hair_color: 'black',
    eye_color: 'blue',
    dob: new Date('11 Nov 247 00:00:00 +0800'),
    loves: ['women', 'girls', 'pretty stuff'],
    location: 'Paris',
    gender: 'm',
    victims: 68687
}];

// async await - Linh method (modified)
async function tryCatch(action, type, message) {
    try {
        const docs = await action;
        if (type === 'find') {
            message += `, found ${docs.length} documents:`;
        }
        console.log(message);
        if (type === 'find') {
            console.log(docs);
        }
    } catch (err) {
        assert.equal(err, null);
    } finally {
        // client.close();
    }
};

// Use connect method to connect to the Server
client.connect(async (err) => { //!!!!!! to convert this whole chunck to async function, then we can use await inside
    assert.equal(null, err);
    console.log('Connected successfully to Mongo server');

    const Vampires = client.db(dbName).collection('Vampires');
    // Drop any previous data
    await tryCatch(Vampires.drop(), 'drop', `Vampires collection had been dropped`);

    // Insert seed data
    await tryCatch(Vampires.insertMany(seedData, function (err, result) {
        assert.equal(null, err);
        assert.equal(seedData.length, result.insertedCount);
    }), 'insert', `Insert Vampires seed data`);

    // Insert additional 4 draculas
    await tryCatch(Vampires.insertMany(additional4, function (err, result) {
        assert.equal(null, err);
        assert.equal(additional4.length, result.insertedCount);
    }), 'insert', `Insert 4 additional Vampires`);


    // Select by comparison
    // Write a different query for each of the following:
    // Find all the vampires that that are females
    await tryCatch(Vampires.find({ gender:'f' }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that that are females`);
    

    //after all completed
    client.close();
});





