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
                email.sendEmail("Willkommen zu Anetts 60. Geburtstag!", getUserEmailText(names), getUserEmailPlainText(names), userEmail);
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

    if (names.length === 0) {
        return null;
    }

    const formattedNames = formatNames(names);

    let euchDich = names.length > 1 ? "Euch" : "Dich";
    let euchDir = names.length > 1 ? "Euch" : "Dir";
    let bistSeid = names.length > 1 ? "seid" : "bist";
    let duIhr = names.length > 1 ? "Ihr" : "Du";
    let pluralT = names.length > 1 ? "t" : "";
    let singularS = names.length > 1 ? "" : "s";
    let uUe = names.length > 1 ? "ü" : "u";

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <body style="
        margin:0;
        padding:0;
        background:#2a003f;
        font-family: Arial, sans-serif;
    ">

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td align="center">

                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                        style="
                            max-width:600px;
                            background:#f4ebff;
                            overflow:hidden;
                        "
                    >

                        <tr>
                            <!-- HIER IST DER FALLBACK: bgcolor für alte Clients, background-color für neue -->
                            <td bgcolor="#4a0e4e" style="
                                background-color:#4a0e4e;
                                background-image:url('cid:background');
                                background-size:cover;
                                background-position:center;
                                padding:30px 20px;
                            ">

                                <div style="
                                    background:rgba(255, 255, 255, 0.28);
                                    border-radius:20px;
                                    padding:24px;
                                    color:#222;
                                ">

                                    <div style="text-align:center;">

                                        <div style="
                                            font-size:52px;
                                            margin-bottom:10px;
                                        ">
                                            
                                        </div>

                                        <h1 style="
                                            margin:0;
                                            font-size:42px;
                                            line-height:1.2;
                                            color:#1f1f1f;
                                        ">
                                            Anett<br>wird 60
                                        </h1>

                                        <div style="
                                            font-size:52px;
                                            margin-top:10px;
                                        ">
                                            
                                        </div>

                                    </div>

                                    <div style="
                                        margin-top:35px;
                                        font-size:20px;
                                        line-height:1.8;
                                        color:#333;
                                    ">

                                        <p>
                                            Hallo ${formattedNames},
                                        </p>

                                        <p>
                                            unglaublich, aber wahr –
                                            ich werde 60 Jahr!
                                            Und das muss natürlich gebührend gefeiert werden –
                                            und am liebsten mit ${euchDir}!
                                        </p>

                                        <p>
                                            Los geht´s um <b>15:00 Uhr</b>
                                            bei mir in der
                                            <b>Carl-Diem-Straße 7</b>
                                            mit einem fröhlichen Anstoßen (Ja, es gibt Sekt!)
                                            sowie Kaffee und Kuchen.
                                        </p>

                                        <p>
                                            Sobald wir uns ausreichend gestärkt
                                            und eingestimmt haben,
                                            zieht die Feier weiter an
                                            einen geheimnisvollen Ort mit
                                            toller Atmosphäre unter freiem Himmel…
                                        </p>

                                        <p>
                                            Keine Sorge –
                                            verhungern m${uUe}sst ${duIhr}
                                            dort auch nicht.
                                            Es wartet etwas Leckeres auf uns!
                                        </p>

                                        <p>
                                            Da das Ganze draußen stattfindet,
                                            denk${pluralT} bitte
                                            an warme Kleidung
                                            und falls ${duIhr} besonders 
                                            schlau ${bistSeid}, bring${pluralT}
                                            gerne eine Decke mit.
                                        </p>

                                        <p>
                                            Zum gemütlichen Ausklang 
                                            lassen wir den Abend am 
                                            Feuerkorb knister.
                                        </p>

                                        <p>
                                            Ich freue mich riesig,
                                            dass ${duIhr} dabei ${bistSeid}!
                                        </p>

                                        <br>

                                        <p>
                                            Ganz herzliche Grüße
                                            <br><br>
                                            <b>Anett</b>
                                        </p>

                                        <hr style="
                                            border:none;
                                            border-top:1px solid #ddd;
                                            margin:30px 0;
                                        ">

                                        <p style="
                                            font-size:15px;
                                            color:#666;
                                            line-height:1.6;
                                        ">
                                            P.S. Falls ${duIhr}
                                            eine Übernachtungsmöglichkeit
                                            benötig${singularS}t,
                                            melde${pluralT}
                                            ${euchDich}
                                            gerne direkt bei mir.
                                        </p>

                                    </div>

                                </div>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
}

function getUserEmailPlainText(names) {
    if (names.length === 0) {
        return null;
    }

    const formattedNames = formatNames(names);

    let euchDich = names.length > 1 ? "Euch" : "Dich";
    let euchDir = names.length > 1 ? "Euch" : "Dir";
    let bistSeid = names.length > 1 ? "seid" : "bist";
    let duIhr = names.length > 1 ? "Ihr" : "Du";
    let pluralT = names.length > 1 ? "t" : "";
    let singularS = names.length > 1 ? "" : "s";
    let uUe = names.length > 1 ? "ü" : "u";

    return `Hallo ${formattedNames},

unglaublich, aber wahr – ich werde 60 Jahr!
Und das muss natürlich gebührend gefeiert werden – und am liebsten mit ${euchDir}!

Los geht´s um 15:00 Uhr bei mir in der Carl-Diem-Straße 7 mit einem fröhlichen Anstoßen (Ja, es gibt Sekt!) sowie Kaffee und Kuchen.

Sobald wir uns ausreichend gestärkt und eingestimmt haben, zieht die Feier weiter an einen geheimnisvollen Ort mit toller Atmosphäre unter freiem Himmel…

Keine Sorge – verhungern m${uUe}sst ${duIhr} dort auch nicht. Es wartet etwas Leckeres auf uns!

Da das Ganze draußen stattfindet, denk${pluralT} bitte an warme Kleidung und falls ${duIhr} besonders schlau ${bistSeid}, bring${pluralT} gerne eine Decke mit.

Zum gemütlichen Ausklang lassen wir den Abend am Feuerkorb knistern.

Ich freue mich riesig, dass ${duIhr} dabei ${bistSeid}!

Ganz herzliche Grüße

Anett

---
P.S. Falls ${duIhr} eine Übernachtungsmöglichkeit benötig${singularS}t, melde${pluralT} ${euchDich} gerne direkt bei mir.`;
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