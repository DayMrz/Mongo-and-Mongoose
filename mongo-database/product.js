const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { userNewUrlParser: true })
    .then(() => {
        console.log('CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('OHH no!')
        console.log(err)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String], //al the information should be an string 
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
});

// productSchema.methods.greet = function () {
//     console.log("HELLO!! HI!! HOLA!!");
//     console.groupCollapsed(`-from ${this.name} `)
// }



// ***INSTANCE METHODS******************************************

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale
    this.save()
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

// *STATICS ****************************************
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}


const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    // foundProduct.greet();
    console.log(foundProduct)
    await foundProduct.toggleOnSale()
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
}

Product.fireSale().then(res => console.log(res))
// findProduct();
//**helps to reduce duplication**********************************



// *******     creates new product **************************
// const bike = new Product({ name: 'Bike Helmet', price: 60, categories: ['Cycling', 'Safety'], size: 'M' })
// bike.save()
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OHH ERROR!!")
//         console.log(err);
//     })
// *******     creates new product **************************


// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -19 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OHH ERROR!!")
//         console.log(err);
//     })