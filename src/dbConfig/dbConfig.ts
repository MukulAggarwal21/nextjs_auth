import mongoose from "mongoose" ;


export async function connect(){
    try {
        mongoose.connect(process.env.Mongo_URI!)
        const connection = mongoose.connection

        connection.on('connected' , ()=>{
            console.log('MongoDb connected');
        })

        connection.on('error' , ( err : any  )=>{
            console.log('Mongo Db Connection Error , Please make sure db is up and running' + err);
            process.exit()
        })


    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error);
    }
}