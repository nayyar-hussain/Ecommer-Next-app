import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose = { conn : null , promise : null}
}

export const ConnectToDatabase = async () => {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise){
        const opt = {
            bufferCommands : false
        }
        cached.promise = mongoose.connect(MONGODB_URI , opt).then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        cached.conn = null
        throw error
    }
}
