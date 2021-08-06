const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/animeApp', { userNewUrlParser: true })
    .then(() => {
        console.log('CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('OHH no!')
        console.log(err)
    })

const animeSchema = new mongoose.Schema({
    title: {
        type: String
    },
    premiered: {
        type: Number
    },
    score: {
        type: Number,
        min: 0
    },
    ranked: {
        type: Number,
        min: 0
    },
    studios: {
        type: String
    },
    genres: [String]
    //create a doc call manga, specified price, qty and if it is onSale or OutStock

})

//Before 
// const animeSchema = new mongoose.Schema({
//     title: String,
//     premiered: Number,
//     score: Number,
//     ranked: Number,
//     studios: String
// }) //this is only JS

const Anime = mongoose.model('Anime', animeSchema); // 'animes'
// const onePiece = new Anime({ title: 'One Piece', premiered: 1999, score: 8.55, ranked: 84, studios: 'Toei Animation' })

// Anime.insertMany([
//     { title: 'One Piece', premiered: 1999, score: 8.55, ranked: 84, studios: 'Toei Animation' },
//     { title: 'Konosuba', premiered: 2016, score: 8.14, ranked: 375, studios: 'Studio Den' },
//     { title: 'Black Clover', premiered: 2017, score: 7.99, ranked: 553, studios: 'Studio Pierrot' },
//     { title: 'Boku no Hero Academia', premiered: 2019, score: 8.02, ranked: 519, studios: 'Bones' },
//     { title: 'Mob Psycho 100', premiered: 2019, score: 8.83, ranked: 22, studios: 'Bones' }
// ])

// { title: 'The God of High School', premiered: 2020, score: 8.02, ranked: 3488, studios: 'MAPPA' },
// { title: 'Sword Art Online: Alicization', premiered: 2019, score: 7.60, ranked: 1281, studios: 'A-1 Pictures' }
// { title: 'Captain Tsubasa', premiered: 2018, score: 5, ranked: 1864, studios: 'David Production' }

//     .then(data => {
//         console.log(" IT WORKED!")
//         console.log(data);
//     })



//     catch(error => handleError(error));
// console.log('we are connected!')

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log('we are connected!')
// });

// {
//     title: 'One Piece',
//         year: 1999,
//             score: 8.55,
//                 Ranked: 84,
//                     studios: 'Toei Animation'
// }


