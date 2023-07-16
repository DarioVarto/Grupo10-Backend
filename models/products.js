import {Schema, model} from 'mongoose'

const product2Schema = new Schema ({

        id: Number,
        title: String,
        description: String,
        images: String,
        price: Number

})

export default model('productos', product2Schema)



