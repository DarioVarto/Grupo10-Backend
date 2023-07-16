import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    stock: Number,
    precio: Number,
    
  });

  export default mongoose.model('Producto',productoSchema)