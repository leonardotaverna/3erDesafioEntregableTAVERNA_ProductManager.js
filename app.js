import express from 'express'
import productManager from './ProductManager_TAVERNA.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/saludo', (req, res) => {
    res.send('Saludo');
})

app.get('/api/products', async (req, res) => {
    const limit = req.query.limit
    const limitFilter = products.slice (0,limit)
    res.json (limitFilter)
    
    try {
        const products = await productManager.getProducts()
        res.status(200).json({ message: 'Products', products })
    } catch (error) {
        res.status(500).json({ error })
    }
});

app.get('/api/products/:pid', async (req, res) => {
    const { pid } = req.params;
    console.log('requested Prod ID:', pid);
    try {
        const product = await productManager.getProductById(+pid)
        res.status(200).json({ message: 'Product', product })
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})

