const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('we are connected!')
})

const userSchema = new Schema({
    username: String,
    age: Number,
});

const tweetSchema = new Schema(
    {
        text: String,
        likes: Number,
        user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
)

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'Kirito99', age: 23 });
//     // const tweet1 = new Tweet({ text: 'I am gonna save Asuna', likes: 0 })
//     // tweet1.user = user;
//     // user.save();
//     // tweet1.save();
//     const user = await User({ username: 'Kirito99' });
//     const tweet2 = new Tweet({ text: 'Nooo Asuna, I want to help you!!', likes: 123 })
//     tweet2.user = user;
//     tweet2.save();
// }

// makeTweets();

// const findTweet = async () => {
//     const t = await Tweet.findOne({}).populate('user', 'username')
//     console.log(t)
// }

// findTweet();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t);
}

findTweet();