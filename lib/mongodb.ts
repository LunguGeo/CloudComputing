import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>

const uri = process.env.MONGODB_URL;

const options: any ={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

if(!process.env.MONGODB_URL){
    throw new Error('Error on conected to DataBAse')
}

client = new MongoClient(uri!, options);
clientPromise=client.connect();

clientPromise.then(()=> console.log('conect to DataBase'));

export default clientPromise