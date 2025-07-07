const {MongoClient, ObjectId} = require("mongodb");

async function dbConnect() {

    if(global.connection) return global.connection;


    try {
        const client = new MongoClient(process.env.MONGODB_CONNECTION);
        await client.connect();
    
        global.connection = client.db(process.env.MONGODB_DATABASE);
    
        console.log(" DB Connected!")
        
    } catch (err) {        
        console.log(err.message);        
        global.connection = null;
    }

    return global.connection;
    
}

async function findVeiculos(){
    const connection = await dbConnect();
    try {
        return connection
        .collection("veiculos")
        .find({})
        .toArray();      
        
    } catch (error) {
        console.log(error.message);
    }

}


async function findVeiculo(id){
    const connection = await dbConnect();
    
    
    try {
        const objectId =  ObjectId.createFromHexString(id);
        return connection
        .collection("veiculos")
        .findOne({_id:objectId});  
        
    } catch (error) {
        console.log(error.message);
    }

}

async function insertVeiculo(veiculo){
    const connection = await dbConnect();
    try {
        return connection
            .collection("veiculos")
            .insertOne(veiculo);
        
    } catch (error) {
        console.log(error.message);
    }
}


async function updateVeiculo(id, veiculoData){
    const connection = await dbConnect();
    try {
        const objectId = ObjectId.createFromHexString(id);
        return connection
            .collection("veiculos")
            .insertOne({_id:objectId},{$set: veiculoData});
        
    } catch (error) {

        console.log(error.message);
        
    }

}

async function deleteVeiculo(id){
    const connection = await dbConnect();
    try {
        const objectId = ObjectId.createFromHexString(id);
        return connection
            .collection("veiculos")
            .deleteOne({_id:objectId});
            //.deleteOne({_id:objectId},{$set: veiculos});
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { 
    findVeiculos,
    insertVeiculo,
    updateVeiculo,
    deleteVeiculo,
    findVeiculo,
    dbConnect
    
}

