const { dbConnect} = require("./db");

async function findUser(name) {
    const connection = await dbConnect();

    return connection
                    .collection("users")
                    .findOne({name});
    
}

module.exports = {
    findUser
}