import fs from 'fs';


const storage =  './productos.json';

// clase

export default class ProductManager{
    constructor(){
        this.products = [];
        this.path = storage;
    }

//AÑADIR PRODUCTOS
    async addProducts(product){

        const validarCode = this.products.some((p) => {return p.code === product.code})

        if (validarCode === false){
            this.products.push(product);

            const data = JSON.stringify(this.products)

            try{
                await fs.promises.writeFile(this.path, data, );
                console.log('los productos fueron cargados correctamente');
            }
            catch{
                console.log('los datos no pudieron ser cargados');
            }
            
        }else{
            console.log('codigo ya existente');
            //console.log(this.products)
        }

//OBTENER PRODUCTOS
    }
    async getProducts(){
        try{
            const data = await fs.promises.readFile('./productos.json', 'utf-8')
            const dateProducts = JSON.parse(data);
            return(dateProducts);
        }
        catch(error){
            console.log('error al solicitar productos de json',error);
            
        }
    }

    async loadProducts(){

        try{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        }catch(error){
            console.log('error al cargar productos',error)
        }
    }   

//OBTENER PRODUCTOS POR ID
    async getProductsById(id){
        try{
            if(this.products.length === 0){
                await this.loadProducts();
            }
            const product = this.products.find(product => product.code === id);
            return product? product:console.log('producto no encontrado');

        }catch(error){   
            console.Console('no se pudo buscar el productos seleccionado',error);
            throw error;
        }
        
    }

//ACTUALIZAR PRODUCTOS
    async updateProduct(id, updatedFields){
        const productIndex = this.products.findIndex(product => product.code ==id);
        if(productIndex != -1){
            const updateProduct = {...this.products[productIndex], ...updatedFields};
            this.products[productIndex] = updateProduct;

            const data = JSON.stringify(this.products,null,2);
            try{
                await fs.promises.writeFile(this.path, data);
                console.log('producto actualizado correctamente')

            } 
            catch{
                console.log('error al actualizar productos')
            }
        }
        else{
            console.log('producto no encontrado')
        }
    }

//ELIMINAR PRODUCTOS
    async deleteProduct(id){

        if(this.products.length === 0){
            await this.loadProducts();
        }

        const productIndex = this.products.findIndex(product => product.code === id)
        if(productIndex != -1){
            this.products.splice(productIndex,1)
            const updateData = JSON.stringify(this.products,null,2);
            

            try{
                await fs.promises.writeFile(this.path, updateData);
                console.log('producto eliminado correctamente')
            }
            catch(error){
                console.log('el producto no se pudo eliminar')
            }
        }
        else{
            console.log('la id no fue encontrada')
        }
    }
}


//CREAR INSTANCIA DE PRODUCT MANAGER Y CARGAR PRODUCTOS
let productos = new ProductManager();

/* 
productos.addProducts({
    title:"producto1",
    description:"descripcion de producto 1",
    price:300,
    thumbnail:"sin imagen",
    code:1,
    stock:21
})

productos.addProducts({
    title:"producto2",
    description:"descripcion de producto 2",
    price:300,
    thumbnail:"sin imagen",
    code:2,
    stock:21})

productos.addProducts({
    title:"producto3",
    description:"descripcion de producto 3",
    price:400,
    thumbnail:"sin imagen",
    code:3,
    stock:4
})
 */

//OBTENER PRODUCTOS
//productos.getProducts()



//OBTENER PRODUCTO POR SU ID
//productos.getProductsById(6)



//ACTUALIZAR PRODUCTOS
/*productos.updateProduct(220,{
    title:'productoactualizado',
    description:'este producto fue actualizado'
})*/

//ELIMINAR PRODUCTOS
//productos.deleteProduct(1)

 