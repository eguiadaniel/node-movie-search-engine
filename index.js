const express = require('express');
const path = require('path')
const axios = require('axios');

const app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (request, response)=>{
  response.render('home');

});

app.get('/search', (request, response)=>{
  const searchQuery = request.query.q;
  console.log(searchQuery);
  const apiURL = `http://www.omdbapi.com/?apikey=eed7a33c&s=${searchQuery}`;

  axios
    .get(apiURL)
    .then((result) => {
      /*console.log(result.data.Search)*/
      const data = result.data;
      const movies = data.Search;
      response.render('results', { 
        busqueda: searchQuery, 
        peliculas : movies
      });
    })
    .catch(error =>{
      response.render('error')
    })


});

app.get('/movie/:id', (request, response)=>{
  const id = request.params.id;
  const apiURL = `http://www.omdbapi.com/?apikey=eed7a33c&i=${id}`;
  
  axios
  .get(apiURL)
  .then((result)=>{
    const data = result.data;
    const movie = data;
    response.render('movie', { pelicula : movie });
  })
  .catch(error => {
    response.render('error');
  });
});

app.get('*', (request, response)=>{
  response.render('error');

});



app.listen(3000);