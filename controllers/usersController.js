const database = require('../databases/databaseMain')
const email = require("../logging/mail")
const log = require("../logging/logger");

async function getUsers(req, res) {
    try {
        const users = await database.getUsers();
        if (users) {
            res.send(users)
        }else {
            res.status(500).json("there were no users found")
        }
    }catch (err) {
        res.status(500).json({message: "Something went wrong", err: err})
    }
}

async function createUser(req, res) {
    try {
        const {names, email: userEmail} = req.body;
        if (names && userEmail) {
            const user = await database.createUser(names, userEmail);
            if (user) {
                email.sendEmail("Anett's 60. Geburtstag", userEmail, "Willkommen zu Mamas 60. Geburtstag!", getUserEmailText(names));
                res.send(user)
            }else {
                res.status(500).json("User could not be created")
            }
        }
    }catch (err) {
        res.status(500).json({message: "Something went wrong", err: err})
    }
}

function getUserEmailText(names) {
    if (names.length == 0) {
        return null;
    }
    const formattedNames = formatNames(names);
    let euchDich = names.length > 1 ? "euch" : "dich";
    let euchDir = names.length > 1 ? "euch" : "dir";
    let bistSeid = names.length > 1 ? "seid" : "bist";
    let duIhr = names.length > 1 ? "ihr" : "du";
    let pluralT = names.length > 1 ? "t" : "";
    let singularS = names.length > 1 ? "" : "s";
    let uUe = names.length > 1 ? "ü" : "u";
    let emailText = `
        Hallo ${formattedNames},

        unglaublich, aber wahr - ich werde 60 Jahr!
        Und das muss natürlich gebührend gefeiert werden - und am liebsten mit ${euchDir}!


        Los geht´s um 15:00 Uhr bei mir in der Carl-Diem-Straße 7 mit einem fröhlichen Anstoßen (ja, genau - Sekt!) sowie Kaffee und Kuchen.
        Sobald wir uns ausreichend gestärkt und eingestimmt haben, zieht die Feier weiter an einen geheimnisvollen Ort mit toller Atmosphäre unter freiem Himmel…..
        Keine Sorge - verhungern m${uUe}sst ${duIhr} dort auch nicht; es wartet etwas Leckeres auf uns!

        Da das ganze draußen stattfindet, denk${pluralT} bitte an warme Kleidung - und falls ${duIhr} besonders schlau ${bistSeid}: bring${pluralT} eine Decke mit.

        Zum gemütlichen Ausklang lassen wir den Abend gemeinsam am Feuerkorb knistern.
        Ich freue mich riesig, dass ${duIhr} dabei ${bistSeid}!

        Ganz herzliche Grüße

        Anett

        P.S. Falls ${duIhr} eine Übernachtungsmöglichkeit benötig${singularS}t, melde${pluralT} ${euchDich} gerne bei mir direkt
    `
    return emailText;
}
function formatNames(names) {
    if (names.length === 1) {
        return names[0];
    }

    if (names.length === 2) {
        return `${names[0]} und ${names[1]}`;
    }

    return `${names.slice(0, -1).join(", ")} und ${names[names.length - 1]}`;
}

async function createDeclined(req, res) {
    try {
        const {name} = req.body;    
        if (name) {
            const declined = await database.createDeclined(name);   
            if (declined) {
                res.send(declined)
            }else {
                res.status(500).json("Declined user could not be created")
            } 
        }
    }catch (err) {
        res.status(500).json({message: "Something went wrong", err: err})
    }
}

async function getDeclined(req, res) {
    try {
        const declinedCollection = (await database.initializeCollections()).declined;
        const declined = await declinedCollection.find({}).toArray();
        if (declined.length == 0) {
            log.info("No declined users found")
            res.status(500).json("there were no declined users found")
        }else {
            log.info("Declined users found")
            res.send(declined)
        }
    }catch (err) {
        res.status(500).json({message: "Something went wrong", err: err})
    }
}

module.exports = {
    getUsers,
    createUser,
    createDeclined,
    getDeclined
}