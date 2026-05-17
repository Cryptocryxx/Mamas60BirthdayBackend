const express = require('express')
const fs = require('fs')
const app = express()
const path = require("path")
const cors = require('cors');

const PORT = 3005

// Import der Router für die verschiedenen Endpunkte
const usersRouter = require('./routers/usersRouter');



// Datenbankverbindung herstellen
const { connectToDB } = require('./databases/databaseMain')
connectToDB()
app.use(cors({
    origin: true,
}))
app.use(express.json());
// Verwendung der Router für die jeweiligen Endpunkte
app.use("/api/users", usersRouter)

const swaggerDocs = require('./logging/swagger');
swaggerDocs(app);

// Starten des Servers und Lauschen auf dem definierten PORT

app.listen(PORT, () => console.log('Server is listening on PORT 3005...'))