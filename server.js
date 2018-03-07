//imports
var express = require('express')
var body_parser = require('body-parser')
var cors = require('cors')
var PORT = process.env.PORT || 3300

// instanciate express and his dependencies
var app = module.exports = express()
app.use(body_parser.json())
app.use(cors())

// front end index setup
// Set the view directory to /views
app.set("views", __dirname + "/views");
// Let's use the pug templating language
app.set("view engine", "pug");
app.get("/", function (request, response) {
    response.render("index", {
        message: "I love anime"
    });
});







// GET - JSON return that formats unix and unix timestamps
app.get('/:timestamp', function (req, res, next) {
    var timestamp = req.params.timestamp
    res.json(getJsonTimestamp(timestamp))

})

app.listen(PORT, function (err, res) {
    if (err) throw err
    console.log('Its Working on port:' + PORT)
})

// helper functions
function getNaturalDateFormat(date) {
    //date.getMonth() start at 0 for january
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Obtober', 'November', 'December'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}

function getJsonTimestamp(timestamp) {
    var date

    //json object to send back
    var json_timestamp = {
        unix: null,
        natural: null
    }

    // natural date provided
    if (isNaN(parseInt(timestamp))) {
        date = new Date(timestamp)
    } else { // unix date provided
        date = new Date(parseInt(timestamp))
    }

    //test if new date object is valid
    if (!isNaN(date.getTime())) {
        json_timestamp.unix = date.getTime()
        json_timestamp.natural = getNaturalDateFormat(date);
    }
    return json_timestamp
}