import mongoose from "mongoose";
 
const productoSchema = new mongoose.Schema({

    id: Number,
    title: String,
    description: String,
    images: String,
    stock: Number,
    price: Number,
    
  });

  export default mongoose.model('Producto',productoSchema)