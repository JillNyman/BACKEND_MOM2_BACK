const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/episodes.db");

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS cv;");
    db.run(`
    CREATE TABLE cv(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyname TEXT NOT NULL,
        jobtitle TEXT NOT NULL,
        location TEXT,
        startdate TEXT,
        enddate TEXT,
        description TEXT
    );
    `);
})


    db.close();