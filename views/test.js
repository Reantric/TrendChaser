const googleTrends = require('google-trends-api');
let location = "US-NJ-908";
let lastHours = 24;
let offset = new Date().getTimezoneOffset();
let timenow = new Date();
let timethen = new Date();
var fs = require('fs');

console.log(timenow)
timethen.setHours(timethen.getHours() - lastHours);
console.log(timethen)
googleTrends.relatedQueries({keyword: 'Chinese Food', startTime: timethen, endTime: timenow, geo: ['US-NJ-501'], timezone: offset, granularTimeResolution: true})
.then(function(results) {
  console.log(results);
  fs.writeFile ("output.json", results, function(err) {
    if (err) throw err;
    console.log('complete');
    }
);
})
.catch(function(err) {
  console.error(err);
})


