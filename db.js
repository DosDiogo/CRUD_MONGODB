const {MongoClient, ObjectId} = require("mongodb");

async function dbConnect() {

    try {
        const client = new MongoClient("mongodb://127.0.0.1:27017");
        await client.connect();
    
        global.connection = client.db("consecionaria");
    
        console.log("Connected!")
        
    } catch (error) {
        console.log(error.message);        
    }
    
}

dbConnect();

function findVeiculos(){
    try {

        return global.connection
        .collection("veiculos")
        .find({})
        .toArray();      
        
    } catch (error) {
        console.log(error.message);
    }

}


function findVeiculo(id){
    
    try {
        const objectId =  ObjectId.createFromHexString(id);
        return global.connection
        .collection("veiculos")
        .findOne({_id:objectId});  
        
    } catch (error) {
        console.log(error.message);
    }

}

function insertVeiculo(veiculo){
    try {
        return global.connection
            .collection("veiculos")
            .insertOne(veiculo);
        
    } catch (error) {
        console.log(error.message);
    }
}


function updateVeiculo(id, veiculoData){
    try {
        const objectId = ObjectId.createFromHexString(id);
        return global.connection
            .collection("veiculos")
            .insertOne({_id:objectId},{$set: veiculoData});
        
    } catch (error) {

        console.log(error.message);
        
    }

}

function deleteVeiculo(){
    try {

        const objectId = ObjectId.createFromHexString(id);
        return global.connection
            .collection("veiculos")
            .deleteOne({_id:objectId},{$set: customer});
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { 
    findVeiculos,
    insertVeiculo,
    updateVeiculo,
    deleteVeiculo,
    findVeiculo
    
}

