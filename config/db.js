import mongoose from "mongoose"; 
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);  

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeoutMS: 10000,
            family: 4  // force IPv4
        });
        console.log("MongoDB connected successfully");
    }
    catch(e){
        console.error("MongoDB connection error:",e);
        process.exit(1);
}};

export default connectDB;