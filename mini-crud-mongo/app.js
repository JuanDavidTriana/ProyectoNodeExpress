const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());    // Middleware para poder recir Json en la petición

// URL de Conexion a MongoDB Atlas
const uri = 'mongodb+srv://admin:admin12345@cluster0.9dakp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Conexion a MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

//Definir el esquema de datos
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

// Modelo de productos
const Product = mongoose.model('Product', productSchema);

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
    res.json(products);
});

// Endpoint para crear un nuevo producto
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Endpoint para actualizar un producto por id
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = products.find(p => p.id === parseInt(id)); // Buscar el producto por id
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name;
    product.price = price;
    res.status(200).json(product);
});

// Endpoint para actulizar un proyecto por id con patch
app.patch('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = products.find(p => p.id === parseInt(id)); // Buscar el proyecto por id
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    if (name) {
        product.name = name;
    }
    if (price) {
        product.price = price;
    }
    res.status(200).json(product);
});

// Endpoint para eliminar un producto por id
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id)); // Buscar el proyecto por id
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const index = products.indexOf(product);
    products.splice(index, 1);
    res.status(200).json({ message: 'Product deleted successfully' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});