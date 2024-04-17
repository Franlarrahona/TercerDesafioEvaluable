import express from 'express'
import ProductManager from './src/ProductManager.js'

const app = express()
const productManager = new ProductManager('../productos.json')

app.get('/products', async (req,res) =>{
    const {limit} = req.query;
    try{
        const data = await productManager.getProducts();
        if(limit && !isNaN(parseInt(limit))){
            const limitedData = data.slice(0, parseInt(limit));
            res.send(limitedData)
        }else{
            res.send(data)
        }
    }catch{
        res.status(500).send('error al obtener productos'+error.message)
    }
    
})

app.get('/products/:pid', async (req,res) =>{
    const {pid} = req.params;
    try{
        const data = await productManager.getProductsById(parseInt(pid));
        if(data){
            res.send(data);
        }else{
            res.send('producto no encontrado')
        }
    }catch(error){
        res.status(500).send('error en buscar producto')
    }
})

app.listen(8080, () =>{
    console.log('server levantado correctamente ')
})