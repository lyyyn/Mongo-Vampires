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
        // client.close();
    });

    // Insert additional 4 draculas
    Vampires.insertMany(additional4, function (err, result) {
        assert.equal(null, err);
        assert.equal(additional4.length, result.insertedCount);
        // client.close();
    });

    Vampires.find({}, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Searching for all vampires`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });

    // Select by comparison
    // Write a different query for each of the following:
    // Find all the vampires that that are females
    Vampires.find({ gender: 'f' }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that that are females`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });

    // have greater than 500 victims
    Vampires.find({ victims: { $gt: 500 } }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have greater than 500 victims`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });

    // have fewer than or equal to 150 victims
    Vampires.find({ victims: { $lte: 150 } }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have fewer than or equal to 150 victims`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // have a victim count is not equal to 210234
    Vampires.find({ victims: { $ne: 210234 } }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampirest that have a victim count is not equal to 210234`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // have greater than 150 AND fewer than 500 victims
    Vampires.find({ victims: { $gt: 150, $lt: 500 } }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have greater than 150 AND fewer than 500 victims`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Select by exists or does not exist
    // Select all the vampires that:
    // have a key of 'title'
    Vampires.find({ title: { $exists: true } }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have a key of 'title'`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // do not have a key of 'victims'
    Vampires.find({ victims: { $exists: false } }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that do not have a key of 'victims'`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // have a title AND no victims
    Vampires.find({
        title: { $exists: true },
        victims: { $exists: false }
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have a title AND no victims`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // have victims AND the victims they have are greater than 1000
    Vampires.find({
        victims: { $exists: true, $gt: 1000 }
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have victims AND the victims they have are greater than 1000`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Select with OR
    // Select all the vampires that:
    // are from New York, New York, US or New Orleans, Louisiana, US
    Vampires.find({
        $or: [
            { location: 'New York, New York, US' },
            { location: 'New Orleans, Louisiana, US' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that are from New York, New York, US or New Orleans, Louisiana, US`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // love brooding or being tragic
    Vampires.find({
        $or: [
            { loves: 'brooding' },
            { loves: 'being tragic' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that love brooding or being tragic`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // have more than 1000 victims or love marshmallows
    Vampires.find({
        $or: [
            { victims: { $gt: 1000 } },
            { loves: 'marshmallows' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have more than 1000 victims or love marshmallows`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // have red hair or green eyes
    Vampires.find({
        $or: [
            { hair_color: 'red' },
            { eye_color: 'green' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have red hair or green eyes`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Select objects that match one of several values
    // Select all the vampires that:
    // love either frilly shirtsleeves or frilly collars
    Vampires.find({
        $or: [
            { loves: 'frilly shirtsleeves' },
            { loves: 'frilly collars' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that love either frilly shirtsleeves or frilly collars`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // love brooding
    Vampires.find({ loves: 'brooding' }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that love brooding`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music
    Vampires.find({
        $or: [
            { loves: 'appearing innocent' },
            { loves: 'trickery' },
            { loves: 'lurking in rotting mansions' },
            { loves: 'R&B music' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // love fancy cloaks but not if they also love either top hats or virgin blood * Hint-You will also have to use $nin *
    Vampires.find({
        $and: [
            { loves: 'fancy cloaks' },
            { loves: { $nin: ['top hats', 'virgin blood'] } }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that love fancy cloaks but not if they also love either top hats or virgin blood`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Negative Selection
    // Select all vampires that:
    // love ribbons but do not have brown eyes
    Vampires.find({
        loves: 'ribbons',
        eye_color: { $ne: 'brown' }
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that love ribbons but do not have brown eyes`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // are not from Rome
    Vampires.find({
        location: { $ne: 'Rome' }
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that are not from Rome`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]
    Vampires.find({
        loves: { $nin: ['fancy cloaks', 'frilly shirtsleeves', 'appearing innocent', 'being tragic', 'brooding'] }
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // have not killed more than 200 people
    Vampires.find({
        victims: { $lte: 200 }
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires that have not killed more than 200 people`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Replace
    // replace the vampire called 'Claudia' with a vampire called 'Eve'. 'Eve' will have a key called 'portrayed_by' with the value 'Tilda Swinton'
    Vampires.update({
        name: 'Claudia'
    }, {
        $set: {
            name: 'Eve',
            portrayed_by: 'Tilda Swinton'
        }
    });
    Vampires.find({
        name: 'Eve'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Confirm the update for Eve`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // replace the first male vampire with another whose name is 'Guy Man', and who has a key 'is_actually' with the value 'were-lizard'
    Vampires.update({
        gender: 'm'
    }, {
        $set: {
            name: 'Guy Man',
            is_actually: 'were-lizard'
        }
    });
    Vampires.find({
        name: 'Guy Man'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Confirm the update for Guy Man`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Update
    // Update 'Guy Man' to have a gender of 'f'
    Vampires.update({
        name: 'Guy Man'
    }, {
        $set: {
            gender: 'f'
        }
    });
    Vampires.find({
        name: 'Guy Man'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Confirm the gender update for Guy Man to f`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Update 'Eve' to have a gender of 'm'
    Vampires.update({
        name: 'Eve'
    }, {
        $set: {
            gender: 'm'
        }
    });
    Vampires.find({
        name: 'Eve'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Confirm the gender update for Eve to m`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Update 'Guy Man' to have an array called 'hates' that includes 'clothes' and 'jobs'
    Vampires.update({
        name: 'Guy Man'
    }, {
        $set: {
            hates: ['clothes', 'jobs']
        }
    });
    Vampires.find({
        name: 'Guy Man'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Confirm the update for Guy Man for hates`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Update 'Guy Man's' hates array also to include 'alarm clocks' and 'jackalopes'
    Vampires.update({
        name: 'Guy Man'
    }, {
        $push: {
            hates: { $each: ['alarm clocks', 'jackalopes'] }
        }
    });
    Vampires.find({
        name: 'Guy Man'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Confirm the update for Guy Man for hates`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Rename 'Eve's' name field to 'moniker'
    Vampires.update({
        name: 'Eve'
    }, {
        $rename: {
            name: 'moniker'
        }
    });
    Vampires.find({
        name: 'moniker'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Confirm the moniker update for Eve`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // We now no longer want to categorize female gender as "f", but rather as fems. Update all females so that the they are of gender "fems".
    Vampires.updateMany({
        gender: 'f'
    }, {
        $set: {
            gender: 'fems'
        }
    });
    Vampires.find({
        gender: 'fems'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Confirm the update for Guy Man for hates`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // Remove
    // Remove a single document wherein the hair_color is 'brown'
    Vampires.find({
        hair_color: 'brown'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires with brown hair before deleteOne`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });
    Vampires.deleteOne({
        hair_color: 'brown'
    });
    Vampires.find({
        hair_color: 'brown'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires with brown hair after deleteOne`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        // client.close();
    });


    // We found out that the vampires with the blue eyes were just fakes! Let's remove all the vampires who have blue eyes from our database.
    Vampires.deleteMany({
        eye_color: 'blue'
    });
    Vampires.find({
        eye_color: 'blue'
    }, {
        projection: {
            _id: 0
        }
    }).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Vampires with blue eyes after deleteMany`);
        console.log(`Found the ${docs.length} documents:`);
        console.log(docs);
        client.close();
    });
});



