const googleTrends = require('google-trends-api');
const fs = require('fs')
let location = "US-NJ-501";
let lastHours = 24;
let offset = new Date().getTimezoneOffset();
let timenow = new Date();
let timethen = new Date();
timethen.setHours(timethen.getHours() - lastHours);
googleTrends.relatedTopics({keyword: 'Chinese Food', startTime: timethen, endTime: timenow, geo: location, timezone: offset, granularTimeResolution: true})
.then(function(results) {
  console.log(results);
})
.catch(function(err) {
  console.error(err);
})
googleTrends.relatedTopics({keyword: 'Chinese Food', startTime: timethen, endTime: timenow, geo: location, timezone: offset, granularTimeResolution: true})
.then(function(results) {
  console.log(results);
  fs.writeFile("stuff.json",results, function (err) {
    if (err) return console.log(err);
  });
})
.catch(function(err) {
  console.error(err);
})

