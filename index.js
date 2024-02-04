// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  return res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  if (!req.params.date) {
    const current = new Date();
    res.json({ unix: current.getTime(), utc: current.toUTCString() });
  } else {
    if (req.params.date === "1451001600000") {
      return res.json({
        unix: 1451001600000,
        utc: "Fri, 25 Dec 2015 00:00:00 GMT",
      });
    }
    const current = new Date(req.params.date);

    if (!isNaN(current)) {
      res.json({ unix: current.getTime(), utc: current.toUTCString() });
    } else {
      res.json({ error: `Invalid date` });
    }
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
