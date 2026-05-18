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
        email: email,
        createdAt: new Date()
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

async function createDeclined(name) {
    const declinedCollection = (await database.initializeCollections()).declined;
    const declined = {
        name: name,
        createdAt: new Date()
    };
    const operation = await declinedCollection.insertOne(declined);
    if (operation.acknowledged) {
        log.info("Declined user created");
        return declined;
    } else {
        log.info("Declined user could not be created");
        return false;
    }
}

async function getDeclined() {
    const declinedCollection = (await database.initializeCollections()).declined;
    const declined = await declinedCollection.find({}).toArray();
    if (declined.length == 0) {
        log.info("No declined users found")
        return false;
    } else {
        log.info("Declined users found")
        return declined;
    }
}

async function deleteUser(id) {
    const usersCollection = (await database.initializeCollections()).users;
    const operation = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    if (operation.deletedCount === 1) {
        log.info("User deleted");
        return true;
    } else {
        log.info("User could not be deleted");
        return false;
    }
}

async function deleteDeclined(id) {
    const declinedCollection = (await database.initializeCollections()).declined;
    const operation = await declinedCollection.deleteOne({ _id: new ObjectId(id) });
    if (operation.deletedCount === 1) {
        log.info("Declined user deleted");
        return true;
    } else {
        log.info("Declined user could not be deleted");
        return false;
    }   
}

module.exports = {
    getUsers,
    createUser,
    createDeclined,
    getDeclined,
    deleteUser,
    deleteDeclined
};
