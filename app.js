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


    // the first one without the higher function as sample
    // try {
    //     const docs = await Vampires.find({}, {
    //         projection: {
    //             _id: 0
    //         }
    //     }).toArray();
    //     console.log(`Searching for all vampires, found ${docs.length} documents:`);
    //     console.log(docs);
    // } catch {
    //     assert.equal(null, err);
    // } finally {
    //     // client.close();
    // };


    // Select by comparison
    // Write a different query for each of the following:
    // Find all the vampires that that are females
    await tryCatch(Vampires.find({ name: 'Adam Sandler' }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that that are females`);


    // have greater than 500 victims
    await tryCatch(Vampires.find({ victims: { $gt: 500 } }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have greater than 500 victims`);


    // have fewer than or equal to 150 victims
    await tryCatch(Vampires.find({ victims: { $lte: 150 } }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have fewer than or equal to 150 victims`);


    // have a victim count is not equal to 210234
    await tryCatch(Vampires.find({ victims: { $ne: 210234 } }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have a victim count is not equal to 210234`);


    // have greater than 150 AND fewer than 500 victims
    await tryCatch(Vampires.find({ victims: { $gt: 150, $lt: 500 } }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have greater than 150 AND fewer than 500 victims`);


    // Select by exists or does not exist
    // Select all the vampires that:
    // have a key of 'title'
    await tryCatch(Vampires.find({ title: { $exists: true } }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have a key of 'title'`);


    // do not have a key of 'victims'
    await tryCatch(Vampires.find({ victims: { $exists: false } }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that do not have a key of 'victims'`);


    // have a title AND no victims
    await tryCatch(Vampires.find({
        title: { $exists: true },
        victims: { $exists: false }
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have a title AND no victims`);


    // have victims AND the victims they have are greater than 1000
    await tryCatch(Vampires.find({
        victims: { $exists: true, $gt: 1000 }
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have victims AND the victims they have are greater than 1000`);


    // Select with OR
    // Select all the vampires that:
    // are from New York, New York, US or New Orleans, Louisiana, US
    await tryCatch(Vampires.find({
        $or: [
            { location: 'New York, New York, US' },
            { location: 'New Orleans, Louisiana, US' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that are from New York, New York, US or New Orleans, Louisiana, US`);


    // love brooding or being tragic
    await tryCatch(Vampires.find({
        $or: [
            { loves: 'brooding' },
            { loves: 'being tragic' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that love brooding or being tragic`);


    // have more than 1000 victims or love marshmallows
    await tryCatch(Vampires.find({
        $or: [
            { victims: { $gt: 1000 } },
            { loves: 'marshmallows' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have more than 1000 victims or love marshmallows`);


    // have red hair or green eyes
    await tryCatch(Vampires.find({
        $or: [
            { hair_color: 'red' },
            { eye_color: 'green' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have red hair or green eyes`);


    // Select objects that match one of several values
    // Select all the vampires that:
    // love either frilly shirtsleeves or frilly collars
    await tryCatch(Vampires.find({
        $or: [
            { loves: 'frilly shirtsleeves' },
            { loves: 'frilly collars' }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that love either frilly shirtsleeves or frilly collars`);


    // love brooding
    await tryCatch(Vampires.find({ loves: 'brooding' }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that love brooding`);


    // love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music
    await tryCatch(Vampires.find({
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
    }).toArray(), 'find', `Vampires that love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music`);


    // love fancy cloaks but not if they also love either top hats or virgin blood * Hint-You will also have to use $nin *
    await tryCatch(Vampires.find({
        $and: [
            { loves: 'fancy cloaks' },
            { loves: { $nin: ['top hats', 'virgin blood'] } }
        ]
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that love fancy cloaks but not if they also love either top hats or virgin blood`);


    // Negative Selection
    // Select all vampires that:
    // love ribbons but do not have brown eyes
    await tryCatch(Vampires.find({
        loves: 'ribbons',
        eye_color: { $ne: 'brown' }
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that love ribbons but do not have brown eyes`);


    // are not from Rome
    await tryCatch(Vampires.find({
        location: { $ne: 'Rome' }
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that are not from Rome`);


    // do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]
    await tryCatch(Vampires.find({
        loves: { $nin: ['fancy cloaks', 'frilly shirtsleeves', 'appearing innocent', 'being tragic', 'brooding'] }
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]`);


    // have not killed more than 200 people
    await tryCatch(Vampires.find({
        victims: { $lte: 200 }
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires that have not killed more than 200 people`);


    // // Replace
    // // replace the vampire called 'Claudia' with a vampire called 'Eve'. 'Eve' will have a key called 'portrayed_by' with the value 'Tilda Swinton'
    await tryCatch(Vampires.update({
        name: 'Claudia'
    }, {
        $set: {
            name: 'Eve',
            portrayed_by: 'Tilda Swinton'
        }
    }), 'update', `Update Claudia to Eve, add portrayed_by: 'Tilda Swinton'`);

    await tryCatch(Vampires.find({
        name: 'Eve'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Confirm the update for Eve`);


    // replace the first male vampire with another whose name is 'Guy Man', and who has a key 'is_actually' with the value 'were-lizard'
    await tryCatch(Vampires.update({
        gender: 'm'
    }, {
        $set: {
            name: 'Guy Man',
            is_actually: 'were-lizard'
        }
    }), 'update', `Update first gender m, name change to Guy Man, add is_actually: 'were-lizard'`);

    await tryCatch(Vampires.find({
        name: 'Guy Man'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Confirm the update for Guy Man`);


    // Update
    // Update 'Guy Man' to have a gender of 'f'
    await tryCatch(Vampires.update({
        name: 'Guy Man'
    }, {
        $set: {
            gender: 'f'
        }
    }), 'update', `Update Guy Man gender to f`);

    await tryCatch(Vampires.find({
        name: 'Guy Man'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Confirm the gender update for Guy Man to f`);


    // Update 'Eve' to have a gender of 'm'
    await tryCatch(Vampires.update({
        name: 'Eve'
    }, {
        $set: {
            gender: 'm'
        }
    }), 'update', `Update Eve gender to m`);

    await tryCatch(Vampires.find({
        name: 'Eve'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Confirm the update for Eve gender to m`);


    // Update 'Guy Man' to have an array called 'hates' that includes 'clothes' and 'jobs'
    await tryCatch(Vampires.update({
        name: 'Guy Man'
    }, {
        $set: {
            hates: ['clothes', 'jobs']
        }
    }), 'update', `Update Guy Man gender to f`);

    await tryCatch(Vampires.find({
        name: 'Guy Man'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Confirm the update for Guy Man for hates`);


    // Update 'Guy Man's' hates array also to include 'alarm clocks' and 'jackalopes'
    await tryCatch(Vampires.update({
        name: 'Guy Man'
    }, {
        $push: {
            hates: { $each: ['alarm clocks', 'jackalopes'] }
        }
    }), 'update', `Update Guy Man gender to f`);

    await tryCatch(Vampires.find({
        name: 'Guy Man'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Confirm the update for Guy Man for hates`);


    // Rename 'Eve's' name field to 'moniker'
    await tryCatch(Vampires.update({
        name: 'Eve'
    }, {
        $rename: {
            name: 'moniker'
        }
    }), 'update', `Rename name label for Eve to moniker`);

    await tryCatch(Vampires.find({
        moniker: 'Eve'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Confirm the update for Eve name label to moniker`);


    // We now no longer want to categorize female gender as "f", but rather as fems. Update all females so that the they are of gender "fems".
    await tryCatch(Vampires.updateMany({
        gender: 'f'
    }, {
        $set: {
            gender: 'fems'
        }
    }), 'update', `Update all gender f to fems`);

    await tryCatch(Vampires.find({
        gender: 'fems'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Confirm the update of all gender f to fems`);


    // Remove
    // Remove a single document wherein the hair_color is 'brown'
    await tryCatch(Vampires.find({
        hair_color: 'brown'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires with brown hair before deleteOne`);

    await tryCatch(Vampires.deleteOne({
        hair_color: 'brown'
    }), 'delete', `Delete one vampire with brown hair`);

    await tryCatch(Vampires.find({
        hair_color: 'brown'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires with brown hair after deleteOne`);


    // We found out that the vampires with the blue eyes were just fakes! Let's remove all the vampires who have blue eyes from our database.
    await tryCatch(Vampires.deleteMany({
        eye_color: 'blue'
    }), 'delete', `Delete all vampires with blue eyes`);

    await tryCatch(Vampires.find({
        eye_color: 'blue'
    }, {
        projection: {
            _id: 0
        }
    }).toArray(), 'find', `Vampires with blue eyes after deleteMany`);

    //after all completed
    client.close();
});





