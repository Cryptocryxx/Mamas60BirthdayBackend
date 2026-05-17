//Imports
const { MongoClient } = require("mongodb")
const log = require("../logging/logger");
const databaseUsers = require("./databaseUsers");


let db = null;
const url = `mongodb://localhost:27017/`;

async function connectToDB() {
    MongoClient.connect(url
    ).then((connection) => {
        db = connection.db('mamas60birthday');
        console.log('connected to database website ...')
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err)
    });
}

async function getUsers() {
    return await databaseUsers.getUsers();
}

async function createUser(names, email) {
    return await databaseUsers.createUser(names, email);
}

async function createDeclined(name) {
    return await databaseUsers.createDeclined(name);
}

async function getDeclined() {
    return await databaseUsers.getDeclined();
}

 function getDB(){
    return  db
}


/**
 * Diese Methode dient dazu, die erforderlichen Datenbank-Collections zu initialisieren.
 * 
 * @return: Object -> Ein Objekt, das die initialisierten Collections `personalInformation`, `invitations` und `events` enthält
 */

async function initializeCollections() {
    const users = db.collection("users");
    const declined = db.collection("declined");
   return {
        users: users,
        declined: declined
    };
}


Object.assign(exports, {
    connectToDB,
    getDB,
    initializeCollections,
    getUsers,
    createUser,
    createDeclined,
    getDeclined
})