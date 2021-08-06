const mongoose = require('mongoose');

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



const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);
const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddresses = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: 'Calle falsa 123',
            city: 'Springfield',
            state: 'NT',
            country: 'USA'
        }
    )
    const res = await user.save()
    console.log(res)
}

// makeUser();
addAddresses('60f635827c0be642708e3d71')