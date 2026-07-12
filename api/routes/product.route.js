import mongoose from 'mongoose'
const ProductRouter = Router()





ProductRouter.post("/product", createProduct)
ProductRouter.get("/product", fetchProducts)
ProductRouter.put("/product/:id", updateProduct)
ProductRouter.delete("/product/:id", deleteProduct)

export default ProductRouter