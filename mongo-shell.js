// Write your mongo shell answers here

// Add some new vampire data
// Using the create method, create 4 new vampires with any qualities that you like two should be male and two should be female.
db.Vampires.insertOne({
    name: 'Adam Sandler',
    title: 'Count Dracula',
    hair_color: 'black',
    eye_color: 'black',
    dob: Date('<1895-01-25>'),
    loves: ['his wife', 'hotel management'],
    location: 'Transylvania',
    gender: 'm',
    victims: 50
});
db.Vampires.insertMany([{
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
}
]);

// Select by comparison
// Write a different query for each of the following:
// Find all the vampires that that are females
db.Vampires.find({ gender: 'f' }).pretty();

// have greater than 500 victims
db.Vampires.find({ victims: { $gt: 500 } }).pretty();

// have fewer than or equal to 150 victims
db.Vampires.find({ victims: { $lte: 150 } }).pretty();

// have a victim count is not equal to 210234
db.Vampires.find({ victims: { $ne: 210234 } }).pretty();

// have greater than 150 AND fewer than 500 victims
db.Vampires.find({ victims: { $gt: 150, $lt: 500 } }).pretty();

// Select by exists or does not exist
// Select all the vampires that:
// have a key of 'title'
db.Vampires.find({ title: { $exists: true } }).pretty();

// do not have a key of 'victims'
db.Vampires.find({ victims: { $exists: false } }).pretty();

// have a title AND no victims
db.Vampires.find({
    title: { $exists: true },
    victims: { $exists: false }
}).pretty();

// have victims AND the victims they have are greater than 1000
db.Vampires.find({
    victims: { $exists: true, $gt: 1000 }
}).pretty();

// Select with OR
// Select all the vampires that:
// are from New York, New York, US or New Orleans, Louisiana, US
db.Vampires.find({
    $or: [
        { location: 'New York, New York, US' },
        { location: 'New Orleans, Louisiana, US' }
    ]
}).pretty();

// love brooding or being tragic
db.Vampires.find({
    $or: [
        { loves: 'brooding' },
        { loves: 'being tragic' }
    ]
}).pretty();

// have more than 1000 victims or love marshmallows
db.Vampires.find({
    $or: [
        { victims: { $gt: 1000 } },
        { loves: 'marshmallows' }
    ]
}).pretty();

// have red hair or green eyes
db.Vampires.find({
    $or: [
        { hair_color: 'red' },
        { eye_color: 'green' }
    ]
}).pretty();

// Select objects that match one of several values
// Select all the vampires that:
// love either frilly shirtsleeves or frilly collars
db.Vampires.find({
    $or: [
        { loves: 'frilly shirtsleeves' },
        { loves: 'frilly collars' }
    ]
}).pretty();

// love brooding
db.Vampires.find({ loves: 'brooding' }).pretty();

// love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music
db.Vampires.find({
    $or: [
        { loves: 'appearing innocent' },
        { loves: 'trickery' },
        { loves: 'lurking in rotting mansions' },
        { loves: 'R&B music' }
    ]
}).pretty();

// love fancy cloaks but not if they also love either top hats or virgin blood * Hint-You will also have to use $nin *
db.Vampires.find({
    $and: [
        { loves: 'fancy cloaks' },
        { loves: { $nin: ['top hats', 'virgin blood'] } }
    ]
}).pretty();

// Negative Selection
// Select all vampires that:
// love ribbons but do not have brown eyes
db.Vampires.find({
    loves: 'ribbons',
    eye_color: { $ne: 'brown' }
}).pretty();

// are not from Rome
db.Vampires.find({
    location: { $ne: 'Rome' }
}).pretty();

// do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]
db.Vampires.find({
    loves: { $nin: ['fancy cloaks', 'frilly shirtsleeves', 'appearing innocent', 'being tragic', 'brooding'] }
}).pretty();

// have not killed more than 200 people
db.Vampires.find({
    victims: { $lte: 200 }
}).pretty();

