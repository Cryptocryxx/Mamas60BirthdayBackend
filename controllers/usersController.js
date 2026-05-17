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
                email.sendEmail("Willkommen zu Anetts 60. Geburtstag!", getUserEmailText(names), userEmail);
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
    <html lang="de">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <body style="margin:0; padding:0; background-color:#2a003f; font-family: Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#2a003f;">
            <tr>
                <!-- FEHLER BEHOBEN: Das doppelte Anführungszeichen bei align="center" ist weg -->
                <td align="center" style="padding: 20px 0;">

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:#f4ebff;">

                        <tr>
                            <!-- HINTERGRUNDBILD-FIX: Nutze das alte HTML-Attribut 'background' UND 'bgcolor' als Fallback -->
                            <td background="cid:background" bgcolor="#e8d8fa" style="background-image:url('cid:background'); background-size:cover; background-position:center; padding:30px 20px;">

                                <!-- INNERER KASTEN: Tabellen statt divs für maximale Kompatibilität -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <!-- RGBA-FIX: Statt Transparenz eine solide, sehr helle Hex-Farbe nutzen (#ffffff oder ein helles Rosa/Lila) -->
                                        <td style="background-color:#ffffff; border-radius:20px; padding:24px; color:#222222; text-align:center;">

                                            <h1 style="margin:0 0 30px 0; font-size:42px; line-height:1.2; color:#1f1f1f;">
                                                Anett<br>wird 60
                                            </h1>

                                            <!-- TEXT-BEREICH -->
                                            <div style="font-size:18px; line-height:1.6; color:#333333; text-align:left;">
                                                <p style="margin-top:0;">
                                                    Hallo ${formattedNames},
                                                </p>
                                                <p>
                                                    unglaublich, aber wahr –<br>
                                                    ich werde 60 Jahr!<br>
                                                    Und das muss natürlich gebührend gefeiert werden –<br>
                                                    und am liebsten mit ${euchDir}!
                                                </p>
                                                <p>
                                                    Los geht´s um <b>15:00 Uhr</b><br>
                                                    bei mir in der <b>Carl-Diem-Straße 7</b><br>
                                                    mit einem fröhlichen Anstoßen (Ja, es gibt Sekt!)<br>
                                                    sowie Kaffee und Kuchen.
                                                </p>
                                                <p>
                                                    Sobald wir uns ausreichend gestärkt und eingestimmt haben, zieht die Feier weiter an einen geheimnisvollen Ort mit toller Atmosphäre unter freiem Himmel…
                                                </p>
                                                <p>
                                                    Keine Sorge – verhungern m${uUe}sst ${duIhr} dort auch nicht. Es wartet etwas Leckeres auf uns!
                                                </p>
                                                <p>
                                                    Da das Ganze draußen stattfindet, denk${pluralT} bitte an warme Kleidung und falls ${duIhr} besonders schlau ${bistSeid}, bring${pluralT} gerne eine Decke mit.
                                                </p>
                                                <p>
                                                    Zum gemütlichen Ausklang lassen wir den Abend am Feuerkorb knistern.
                                                </p>
                                                <p>
                                                    Ich freue mich riesig, dass ${duIhr} dabei ${bistSeid}!
                                                </p>
                                                <br>
                                                <p style="margin-bottom:0;">
                                                    Ganz herzliche Grüße<br><br>
                                                    <b>Anett</b>
                                                </p>
                                            </div>

                                            <hr style="border:none; border-top:1px solid #dddddd; margin:30px 0;">

                                            <p style="font-size:14px; color:#666666; line-height:1.5; margin:0; text-align:left;">
                                                P.S. Falls ${duIhr} eine Übernachtungsmöglichkeit benötig${singularS}t, melde${pluralT} ${euchDich} gerne direkt bei mir.
                                            </p>

                                        </td>
                                    </tr>
                                </table>

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