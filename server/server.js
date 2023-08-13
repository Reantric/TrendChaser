
const googleTrends = require('google-trends-api');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const zipcodeToDMA = JSON.parse(fs.readFileSync('server/zipcodes.json'));

const mapDays = {
  12: 1,
  13: 7,
  14: 31,
  15: 93,
  16: 186
};

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.get('/', (req, res) => {
    res.send('index.html');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

let user_id = 0;

app.post('/results', (req,res) => {
  const body = req.body;
  const requestId = user_id++;

  let place = body.region.split(', ');
  if (place.length < 2){
    res.redirect('/');
    return;
  }
  const keyworde = body.business;
  const zipcode = place[place.length-2].slice(-5);
  const daysBack = mapDays[body.timeframe];

  const dma = zipcodeToDMA[zipcode];
  timenow = new Date();
  timethen = new Date();
  timethen.setDate(timethen.getDate()-daysBack);

  googleTrends.relatedTopics({keyword: keyworde, startTime: timethen, endTime: timenow, geo: dma, granularTimeResolution: true})
    .then((res) => {
    fs.writeFile(`server/relatedTopics${requestId}.json`, res, function(err) {
      if (err) console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
  })
  googleTrends.relatedQueries({keyword: keyworde, startTime: timethen, endTime: timenow, geo: dma, granularTimeResolution: true})
  .then((res) => {
    fs.writeFile(`server/relatedQueries${requestId}.json`, res, function(err) {
      if (err) console.log(err);
    })
  })
  .catch((err) => {
    console.log(err);
  })

  function stateChange(newState) {
    setTimeout(function () {
        if (newState == -1) {
          res.send("results.html");
        }
    }, 5000);
  }
  stateChange(-1);
}) 


