
const express = require('express')
const app = express()


const port = 3000

app.use(express.json());

app.set('view engine', 'jade');
app.use(express.static('public'))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

 app.post('/ailun', (req,res) => {
  const body = req.body;
  let place = body.region.split(',');
  if (place.length < 2){
    //alert('Please enter a valid region')
    res.redirect('/')
    return;
  }

  res.send("Hello WOrld");
}) 


exports.map = {
  12: "24 hours",
  13: "7 days",
  14: "1 month",
  15: "3 months",
  16: "6 months"
};