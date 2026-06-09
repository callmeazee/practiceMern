import dotenv from 'dotenv'
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB)

import express from  'express'
import cors from 'cors'
import { createProduct, deleteProduct, fetchProducts, updateProduct } from './controller/product.controller.js'
const app = express()
app.listen(process.env.PORT || 8080, () => {
     console.log("connected")
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post("/product", createProduct)
app.get("/product", fetchProducts)
app.put("/product/:id", updateProduct)
app.delete("/product/:id", deleteProduct)