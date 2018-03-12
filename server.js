// imports
var express = require('express')
var body_parser = require('body-parser')
var cors = require('cors')
var path = require('path')
var PORT = process.env.PORT || 3300
var moment = require('moment')

// instanciate express and his dependencies
var app = module.exports = express()
app.use(body_parser.json())
app.use(cors())

// set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// load view engine
app.set('views', path.join(__dirname, 'views'))

app.set("view engine", "pug");

// home route
app.get("/", function (request, response) {

    response.render("index", {
        title: "API Basejump: Timestamp microservice",
        author: "Tiago Valverde"
    });
});


// GET request handler
app.get('/:timestamp', function (req, res) {
    var timestamp = req.params.timestamp
    res.json(momentParser(timestamp))
})

app.listen(PORT, function (err, res) {
    if (err) throw err
    console.log('Its Working on port:' + PORT)
})

function momentParser(date) {
    // js object to return
    let json_timestamp = {
        unix: null,
        natural: null
    }

    // receive unix date
    if (+date > 0) {
        json_timestamp.unix = +date;
        json_timestamp.natural = moment.unix(json_timestamp.unix).format("MMMM D, YYYY");
    }

    // receive natural date
    if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
        json_timestamp.unix = moment(date, "MMMM D, YYYY").format("X");
        json_timestamp.natural = moment.unix(json_timestamp.unix).format("MMMM D, YYYY");
    }

    return json_timestamp
}