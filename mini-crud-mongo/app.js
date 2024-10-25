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
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error getting products' });
    }

});

// Endpoint para obtener un proyecto por id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error getting product' });
    }
});

// Endpoint para crear un nuevo producto
app.post('/products', async (req, res) => {
    const { name, price } = req.body;

    // Validar que los datos sean correctos
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    try {
        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
});

// Endpoint para actualizar un producto por id
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    // validacion que los campos no esten vacios
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, { name, price }, { new: true });
        if (!updateProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
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