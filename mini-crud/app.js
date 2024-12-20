const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());    // Middleware para poder recir Json en la petición

// Datos temporales almacenados en la memoria
let products = [
    { id: 1, name: 'iPhone', price: 1000 },
    { id: 2, name: 'iPad', price: 2000 },
    { id: 3, name: 'MacBook', price: 2500 },
    { id: 4, name: 'Apple Watch', price: 500 },
    { id: 5, name: 'AirPods', price: 150 },
    { id: 6, name: 'Apple TV', price: 100 },
    { id: 7, name: 'iMac', price: 1500 },
    { id: 8, name: 'Mac Mini', price: 800 },
    { id: 9, name: 'HomePod', price: 300 },
    { id: 10, name: 'Magic Mouse', price: 80 },
    { id: 11, name: 'Apple Pencil', price: 99 },
    { id: 12, name: 'Smart Keyboard', price: 159 },
    { id: 13, name: 'iPhone 11 Case', price: 39 },
    { id: 14, name: 'iPad Pro Case', price: 49 },
    { id: 15, name: 'Apple EarPods', price: 29 },
    { id: 16, name: 'Apple Watch Band', price: 49 },
    { id: 17, name: 'Apple TV 4K', price: 199 },
    { id: 18, name: 'Apple AirTag', price: 29 },
    { id: 19, name: 'Apple TV HD', price: 99 },
    { id: 20, name: 'Apple Pencil Case', price: 29 }
];

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