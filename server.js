//imports
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

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))


// load view engine
app.set('views', path.join(__dirname, 'views'))
//app.set("views", __dirname + "/views");
app.set("view engine", "pug");

//home route
app.get("/", function (request, response) {

    response.render("index", {
        title: "API Basejump: Timestamp microservice",
        author: "Tiago Valverde"
    });
});


// GET - JSON return that formats unix and unix timestamps
app.get('/:timestamp', function (req, res, next) {
    var timestamp = req.params.timestamp
    res.json(momentParser(timestamp))

})

app.listen(PORT, function (err, res) {
    if (err) throw err
    console.log('Its Working on port:' + PORT)
})

function momentParser(date) {
    let json_timestamp = {
        unix: null,
        natural: null
    }

    // if received unix timestamp
    if (+date >= 0 && moment.unix(+date).format("MMMM D, YYYY").isValid) {
        json_timestamp.unix = +date,
            json_timestamp.natural =
            moment.unix(+date).format("MMMM D, YYYY")
    }

    // if natural date received
    if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
        json_timestamp.natural = date;
        json_timestamp.unix = moment(date, "MMMM D, YYYY");
    }

    return json_timestamp
}