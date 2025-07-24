const {MongoClient, ObjectId} = require("mongodb");
const bcrypt = require("bcryptjs");

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

async function countVeiculos(){
     const connection = await dbConnect();
     return connection
                    .collection("veiculos")
                    .countDocuments();
}


async function findVeiculos(skip, limite){
     
    const connection = await dbConnect();
    try {
        return connection
        .collection("veiculos")
        .find({})
        .skip(skip)
        .limit(parseInt(limite))
        .toArray();      
        
    } catch (error) {
        console.log(error);
    }

}

async function findVeiculo(id){
    const connection = await dbConnect();    
    try {
        const objectId =  ObjectId.createFromHexString(id);
        return  connection
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
            //.insertOne({_id:objectId},{$set: veiculoData});
            .insertOne({_id:objectId},{veiculoData});
        
    } catch (error) {
        console.log(error);
        
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

// Users CRUD 

async function countUsers(){
     const connection = await dbConnect();
     return connection
                    .collection("users")
                    .countDocuments();
}


async function findUsers(skip, limite){
     
    const connection = await dbConnect();
    try {
        return connection
        .collection("users")
        .find({})
        .skip(skip)
        .limit(parseInt(limite))
        .toArray();      
        
    } catch (error) {
        console.log(error);
    }

}

async function findUser(id){
    const connection = await dbConnect();    
    try {
        const objectId =  ObjectId.createFromHexString(id);
        return  connection
        .collection("users")
        .findOne({_id:objectId});  
        
    } catch (error) {
    
        console.log(error.message);
    }

}

async function insertUser(user){
    user.password = bcrypt.hashSync(user.password, 12);
    const connection = await dbConnect();
    
    try {
        return connection
            .collection("users")
            .insertOne(user);
        
    } catch (error) {
        console.log(error.message);
    }
}


async function updateUser(id, user){
    if (user.password)
        user.password = bcrypt.hashSync(user.password, 12);
    
    const connection = await dbConnect();

    try {
        const objectId = ObjectId.createFromHexString(id);
        delete user._id;
        console.log(user);
        return connection
            .collection("users")
            .updateOne({_id:objectId},{$set: user}, {upsert: false});        
    } catch (error) {

        console.log(error.message);
        
    }

}

async function deleteUser(id){
    const connection = await dbConnect();
    try {
        const objectId = ObjectId.createFromHexString(id);
        return connection
            .collection("users")
            .deleteOne({_id:objectId});        
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
    countVeiculos,
    findUsers,
    insertUser,
    updateUser,
    deleteUser,
    findUser,
    countUsers,
    dbConnect
    
}

