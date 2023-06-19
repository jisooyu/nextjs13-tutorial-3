import mongoose from "mongoose";

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to Mongo DB')
    })
    .catch((error) => {
        console.error('Error connecting to Mongo DB')
    })
}