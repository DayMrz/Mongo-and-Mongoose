const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');
const Farm = require('./models/farm');
const categories = ['fruit', 'vegetable', 'dairy'];

// const { truncate } = require('fs');


mongoose.connect('mongodb://localhost:27017/farmStandTake2', { userNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('Mongo OHH no error!')
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //used for override the method

//FARM ROUTES
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms })
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    // console.log(product);
    // res.send('details page')
    res.render('farms/show', { farm })
})

app.post('/farms', async (req, res) => {
    // res.send(req.body)
    const farm = new Farm(req.body);
    await farm.save();
    // console.log(newFarm);
    res.redirect('/farms')
})


app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    // const farm = await Farm.findById(id);
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })
})


app.post('/farms/:id/products', async (req, res) => {
    // res.send(req.body);
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    // res.send(farm)
    res.redirect(`/farms/${farm._id}`)
})


app.delete('/farms/:id', async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})





//PRODUCT ROUTES
app.get('/', (req, res) => {
    // res.send("Holi :)")
    res.render('products/home')
})

//  app.get('/products', async (req, res) => { 
// const products = await Product.find({})
// console.log(products) 1step
// res.send('ALL PRODUCTS WILL BE HERE!') 1step
// res.render('products/index', { products })
// })  

app.get('/products', async (req, res) => {
    // finding by category!!
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    // console.log(req.body)
    const newProduct = new Product(req.body)
    await newProduct.save();
    console.log(newProduct)
    // res.send('Making Your product')
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    // console.log(product);
    // res.send('details page')
    res.render('products/show', { product })
})
// edit
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    //     console.log(req.body);
    // res.send('PUT :)');
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true, useFindAndModify: false });
    res.redirect(`/products/${product._id}`);
})
// Delete
app.delete('/products/:id', async (req, res) => {
    // res.send("Yay, this is working!")
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000')
})

