const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI.getBeers().then(beer => {
  response.render('beers', {beer:beer});
  })
});

app.get('/random-beers', (request, response) => {
  punkAPI.getRandom().then(beer => {
    response.render('random-beers', {beer:beer});
  })
 });
  



app.listen(3000, () => console.log('🏃‍ on port 3000'));
