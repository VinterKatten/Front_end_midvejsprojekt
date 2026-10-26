const express = require('express');
const cors = require('cors');
const db = require('mysql2');

const app = express();
app.use(express.json());
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = db.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,      // e.g. 'root'
    password: process.env.DBPASSWORD, // your actual password
    database: process.env.DBDATABASE
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});