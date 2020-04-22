var path = require("path");
var fs = require("fs");

module.exports = function (app) {
    // /api/notes reads the db.json file and returns all saved notes as JSON
    app.get("/api/notes", function (req, res) {
        console.log("res", res);
        //did I enter db.json correctly below?
        // res.readFile(path.join(__dirname, "../db/db.json"));
        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if(err) throw err;
            console.log("read json file/response", response)
            var allNotes = [];
            allNotes = JSON.parse(response);
            res.json(allNotes);
        })
    });

    // /api/notes receives new note to save on the req body, adds to db.json file, returns new note to client
    app.post("/api/notes", function (req, res) {
        var reqBody = req.body;
        
        // res.sendFile(path.join(__dirname, "../db/db.json"));
        fs.appendFile("./db/db.json", "utf8", reqBody, (err, response) => {
            if (err) throw err;
            res.json(req.body);
            
        })
    });
    //example from Starwars 12 activity: 

    // Create New Characters - takes in JSON input
    // app.post("/api/characters", function (req, res) {
    //     var newCharacter = req.body;

    //     console.log(newCharacter);

    //     characters.push(newCharacter);

    //     res.json(newCharacter);
    // });

    //"/api/notes/:id" receives query parameter contining unique id of saved note. Reads all notes from db.json file, removes note with id property, rewrites notes to db.json
    app.delete("/api/notes/:id", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });


}