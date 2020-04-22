var path = require("path");
var fs = require("fs");

module.exports = function (app) {
    // /api/notes reads the db.json file and returns all saved notes as JSON
    app.get("/api/notes", function (req, res) {
        // console.log("res", res);
        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            // console.log("read json file/response", response)
            var allNotes = [];
            allNotes = JSON.parse(response);
            // console.log(allNotes);
            res.json(allNotes);
        })
    });

    // /api/notes receives new note to save on the req body, adds to db.json file, returns new note to client
    app.post("/api/notes", function (req, res) {
        //receive new note from req body, save it in variable
        let giveBack = req.body
        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            // parse response into json and save to allNotes
            let allNotes = JSON.parse(response);
            // console.log(allNotes);
            // now allNotes becomes itself plus the new note
            allNotes = [...allNotes, giveBack]
            console.log("combined list", allNotes);
            //then we write new combined list (allNotes) back to db.json  file        
            fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) => {
                if (err) throw err;
                res.json({ success: true, msg: 'Created new note' });
                console.log("Note created!", giveBack);

            })
        })
        //return new note to client
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