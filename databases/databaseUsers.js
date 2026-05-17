//Imports
const database = require("./databaseMain");
const log = require("../logging/logger")
const { ObjectId } = require("mongodb");
const { get } = require("../routers/usersRouter");

async function getUsers() {
    const usersCollection = (await database.initializeCollections()).users;
    const users = await usersCollection.find({}).toArray();
    if (users.length == 0) {
        log.info("No users found")
        return false;
    }else {
        log.info("Users found")
        return users;
    }   
    return users;
}

async function createUser(names, email) {
    const usersCollection = (await database.initializeCollections()).users;
    const user = {
        names: names,
        email: email
    }
    const operation = await usersCollection.insertOne(user); 
    if (operation.acknowledged) {
        log.info("User created")
        return user;
    }else {
        log.info("User could not be created")
        return false;
    }
}

module.exports = {
    getUsers,
    createUser
};
