const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const DATA_FILE_PATH = path.join(__dirname, '../data/friends.js');

let router = require('express').Router();

router.get('/api/friends', function(req, res) {
  fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
    res.json(JSON.parse(data));
  });
});

router.use('/api/friends', bodyParser.json());

router.post('/api/friends', function(req, res) {
  let newFriend = req.body;

  fs.readFile(DATA_FILE_PATH, 'utf8', function(err, data) {
    if(err) throw err;

    data = JSON.parse(data);
    
    let differences = data.map(
      friend => scoreDifference(friend.scores, newFriend.scores));

    // show modal of closet match
    res.json(data[indexOfLowest(differences)]);

    // add new friend to data
    data.push(newFriend);

    fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8', err => {
      if(err) throw err;
    });
  });
});

function scoreDifference(a1, a2) {
  let diff = 0;
  for(let i=0; i<a1.length; i++) {
    diff += Math.abs(a1[i] - a2[i]);
  }
  return diff;
}

function indexOfLowest(a) {
  return a.indexOf(Math.min(...a));
}

module.exports = router;