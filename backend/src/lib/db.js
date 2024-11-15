import mongoose from "mongoose";

export const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to mongodb ${conn.connection.host}`);
    } catch(error){
        console.log("failed to connect",error);
        process.exit(1);  //1 is failure , 0 is success
    }
}