var express = require('express');
var moment = require('moment');


var app = express();

app.set('view-engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>res.render('index'));

app.get('/:time', (req, res)=>{
  var time = req.params.time;

  if (/^\d{8,}$/.test(time)) {
    var timeFormat = moment(time, "X");
  } else {
    var timeFormat = moment(time, "MMMM D, YYYY")
  }

  if (timeFormat.isValid()) {
    res.send({unix: timeFormat.format('X'), natural: timeFormat.format("MMMM D, YYYY")});
  } else {
    res.send({unix: null, natural: null});
  }
});

app.listen(3000, ()=>console.log("Listening on port", 3000));
