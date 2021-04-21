// server.js
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

app.get("/api/:date", (req,res)=>{
  let date=req.params.date;
  if(Number(req.params.date)){
    date=Number(date);
  }
  const utcDate=new Date(date);
  if (utcDate.toUTCString()==='Invalid Date'){
    res.send({error: "Invalid Date"});
  }else{
    const gotDate={
      unix: utcDate.getTime(),
      utc: utcDate.toUTCString()
    }
    res.send(gotDate)
  }
})

app.get("/api/", (req,res)=>{
  let date=req.params.date;
  if (!date){
    date=new Date(); 
    const currDate={
      unix: date.getTime(),
      utc: date.toUTCString()
    }
    res.send(currDate);
  }
})

// listen for requests :)
const PORT = process.env.PORT || 3001
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
