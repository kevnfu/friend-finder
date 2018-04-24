const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const htmlRoutes = require('./app/routing/htmlRoutes.js');
const apiRoutes = require('./app/routing/apiRoutes.js')
const PORT = process.env.PORT || 8080;

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./app/public'));

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});