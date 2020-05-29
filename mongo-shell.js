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
