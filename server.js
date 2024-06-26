const sqlite3 = require("sqlite3").verbose();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const port = process.env.port || 2788;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MIDDLEWARE
app.use(express.json());

require('dotenv').config();

//Anslut till databas
const db = new sqlite3.Database("./db/episodes.db");

//Sökvägar
//GET-anrop till databas
app.get("/episodes", (req, res) => {
    res.json({message: "Welcome to my API"});
    console.log("Database connected");
});

//GET-anrop till tabellen
app.get('/cv', (req, res) => { // <---
    
    db.all('SELECT * FROM cv;', (err, rows) => {
        if(err) {
            res.status(500).json({error: "Something went wrong: " + err});
            return;
        }
       //Kontrollera resultatet
       if(rows.length === 0){
        res.status(404).json({message: "No posts in table found"});
       }else{
        res.json(rows);
        console.table(rows);
       };
    });
});

//POST
app.post("/cv", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    //FELHANTERING
    let errors = {
        message: "",
        details: "",
        https_response: {

        }
    };
         
    if(companyname.length !== 0 && jobtitle.length !== 0){  
             //Lägg till arbete
        let stmt = db.prepare(`INSERT INTO cv(companyname, jobtitle, location, startdate, enddate, description)VALUES(?, ?, ?, ?, ?, ?);`);
        stmt.run(companyname, jobtitle, location, startdate, enddate, description);
        stmt.finalize();

        let job = {
            companyname: companyname, 
            jobtitle: jobtitle, 
            location: location, 
            startdate: startdate, 
            enddate: enddate, 
            description: description
        }; 
    
        res.json(job);
        console.log("Arbete: " + job);        

    }
      
    else {     

      res.status(400).json(errors);

      return;
    }   
});

//uppdatera post
app.put("/cv/:id", (req, res) => {
    
    let id = req.params.id;

    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).json({error: "One or more field is empty."});
    }

    let sql = `UPDATE cv SET companyname=?, jobtitle=?, location=?, startdate=?, enddate=?, description=? WHERE id=?`;

    let stmt = db.prepare(sql);

  
    stmt.run([companyname, jobtitle, location, startdate, enddate, description, id], function(err) {
        if(err){
            return res.status(500).json({error: "Database was not updated"});
        }

        res.json({message: `Posten with id: ${id} was pdates.`});
    });
    stmt.finalize();  

    });

    //Radera post
app.delete("/cv/:id", (req, res) => {
    let id = req.params.id;
    db.run("DELETE FROM cv WHERE id=?;", id, (err) => {
        if(err){
            console.error(err.message);
        }
    })
    res.json({message: "Job deleted: " + id});
});

//Starta applikationen
app.listen(port, () => {
    console.log('Server is running on port:' + port);
});

