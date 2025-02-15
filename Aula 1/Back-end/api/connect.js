import { MongoClient } from 'mongodb';

const URI = "mongodb+srv://cemarcard:rrX1TMYgckNcovjh@cluster0.jpumd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(URI);

export const db = client.db('piratefy');
//const songCollection = await db.collection('songs').find({}).toArray();

//console.log(songCollection)