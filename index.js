
const express = require('express')
const app = express()

const map = {
  12: "24 hours",
  13: "7 days",
  14: "1 month",
  15: "3 months",
  16: "6 months"
};

const port = 3000

app.use(express.json());

app.set('view engine', 'jade');
app.use(express.static('public'))
app.use(express.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/results', (req,res) => {
  const body = req.body;
  let place = body.region.split(',');
  if (place.length < 2){
    res.redirect('/')
    return;
  }
  const state = place[place.length-2]
  if (place.length > 2) 
    var city = place[place.length-3]
  console.log(state,city,map[body.timeframe]);
  res.render("results");
}) 


