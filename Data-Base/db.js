import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;

const connectDB = async () => {
    await mongoose.connect(uri);
};

const dataBase = mongoose.connection;

dataBase.on('error', (error) => {
    console.log(error);
})

dataBase.once('connected', () => {
    console.log('Database Connected');
})

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
    }
});

export default connectDB;