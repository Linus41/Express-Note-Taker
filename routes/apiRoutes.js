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

        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            console.log("req body", req.body);
            // parse response into json and save to allNotes
            let allNotes = JSON.parse(response);
            let lastNoteID = allNotes[allNotes.length - 1].id;
            lastNoteID += 1;
            console.log(lastNoteID);
            //receive new note from req body, save it in variable

            let giveBack = { ...req.body, id: lastNoteID }
            console.log(giveBack);
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

    });

    //"/api/notes/:id" receives query parameter containing unique id of saved note. Reads all notes from db.json file, removes note with id property, rewrites notes to db.json

    app.delete("/api/notes/:id", function (req, res) {

        //create variable saving query parameter that contains unique note id
        var currentNoteID = req.params.id;
        console.log("note to be deleted", currentNoteID);

        // read all notes from db.json file
        fs.readFile("./db/db.json", "utf8", (err, response) => {
            if (err) throw err;
            // take response and make into array of key value pair objects
            let allNotes = JSON.parse(response);
            
            // remove note with id property
            const filterNotes = allNotes.filter(note => note.id != currentNoteID);
    
            // rewrite notes to db.json
            // stringify json to write to file
            fs.writeFile("./db/db.json", JSON.stringify(filterNotes), err => {
                if (err) throw err;
                res.json(filterNotes);
                console.log("Note " + currentNoteID + " was deleted");
            })
        });

    });
}