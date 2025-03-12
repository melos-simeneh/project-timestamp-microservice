// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// If no date is provided (i.e., the user visits /api/), return the current date
app.get("/api", function (req, res) {
  let date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Your main API route for a specific date (either Unix timestamp or natural date)
app.get("/api/:date", function (req, res) {
  let dateString = req.params.date;
  let date;

  // If the date string is a number, convert it to a timestamp (e.g., Unix timestamp in ms)
  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    // Otherwise, treat it as a regular date string
    date = new Date(dateString);
  }

  // If the date is invalid, return an error message
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Format the response to return both the Unix timestamp and natural date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
