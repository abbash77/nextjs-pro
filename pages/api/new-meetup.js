import { MongoClient } from "mongodb"
async function handler(req,res){
    if(req.method==='POST'){
        const data= JSON.parse(req.body)

        const client=await MongoClient.connect("mongodb+srv://abbash7:abbasH123@cluster0.jrhha.mongodb.net/meetups")
        const db=client.db()
        const meetupsCollection=db.collection('meetups')
        const result=await meetupsCollection.insertOne(data)
        console.log(result)
        client.close()
        res.status(201).json({message:'Meetup inserted'})
    }
}
export default handler