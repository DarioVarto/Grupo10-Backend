import mongoose from 'mongoose';
import config from "./config.env";

mongoose.connect(config.DB) // el config.DB es lo mismo que ('mongodb://127.0.0.1:27017/Trabajo-Final')
.then(db=>console.log('la db esta conectada'))