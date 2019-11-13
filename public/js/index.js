$(document).ready(function(){

    function postMovie(){
        var movie = {
            movie_name: $(".title-h1").text(),
            movie_poster: $(".movie-poster").attr("src"),
            api_id: $(".title-h1").attr("data-movieId")
          };
          alert("What up");
        $.ajax({
            type:"POST",
            url: "/api/movies",
            data: movie,
            dataType: "json",
        });
        // Display successfully added something to let users know it was added to their watch list
        
        // also outside of this function we need to build a watch list page: probably make a function call it 
        // "displayWatchList" and have an event listener for when someone clicks the My List link in on the page for 
        // it to launch

        // that displayWatchList function will basically make a get request you've already written to get all
        // objects from the api/movies, you just need to display them

        // {{for each}}
        //      <img src = {{this.movie_poster}}>
        // {{/each}}

        // loop in movie posters and delete buttons for each poster.
        // Make another function call it "deleteMovie"
        // On click this.id destroy
    };

    function getMovie(){
        displayModal();
        var movieId = $(this).attr("data-movieId");
        var imdbId = "";
        var moviePlot = "";
        var moviePoster = "";
        console.log(movieId);
        var queryURL = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=01a2c6e54e1c0c32fa82408ddb39628c&language=en-US";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            imdbId = response.imdb_id;
            moviePlot = response.overview;
            moviePoster = "https://image.tmdb.org/t/p/original/" + response.poster_path;
            console.log(response.imdb_id);
        }).then(function(){
            queryURL = "http://www.omdbapi.com/?apikey=trilogy&i=" + imdbId;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(res){
                var movie = {
                    title: res.Title,
                    poster: moviePoster,
                    plot: moviePlot,
                    year: res.Year,
                    cast: res.Actors,
                    director: res.Director,
                    genre: res.Genre,
                    rated: res.Rated,
                    runtime: res.Runtime,
                    imdbRating: res.imdbRating,
                    tmdbId: movieId,
                    imdbId: imdbId
                }
                $(".title-h1").text(movie.title);
                $(".title-h1").attr("data-movieId", movieId);
                $(".movie-poster").attr("src", moviePoster);
                $(".director").text("Director: " + movie.director);
                $(".actors").text("Actors: " + movie.cast);
                $(".plot").text(movie.plot);
                $(".rating").text("IMDB Rating: " + movie.imdbRating);
                $(".trailer").attr("src", movie.trailer);

            });
        });
    };

    function searchMovie(){
        var movieName = $('#user-input').val().trim();
        movieName = movieName.replace(" ", "%20");
        if (movieName === "") {
            displayWarning();
        }
        else {
            $('#user-input').val("");
            $('.movies-container').empty();
            var movieId = 0;
            var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=01a2c6e54e1c0c32fa82408ddb39628c&language=en-US&query=" + movieName + "&page=1&include_adult=false"
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
                $(".movies-container-title").text(movieName.replace("%20", " ") + ":");
                for (var i = 0; i < 20; i++){
                    var movieId = response.results[i].id;
                    var movieTitle = response.results[i].original_title;
                    var moviePoster = "https://image.tmdb.org/t/p/original/" + response.results[i].poster_path;
                    var trendingMovie = {
                        movieTitle: movieTitle,
                        movieId : movieId,
                        moviePoster: moviePoster
                    };
                    var cardDiv = $('<div>');
                    cardDiv.addClass('card');
                    var cardImage = $('<div>');
                    cardImage.addClass('card-image');
                    var imgFigure = $('<figure>');
                    imgFigure.addClass('image');
                    var image = $('<img>');
                    image.attr('src', moviePoster);
                    image.attr('data-movieId', movieId);
                    image.addClass('movie-image');
                    imgFigure.append(image);
                    cardImage.append(imgFigure);
                    cardDiv.append(cardImage);
                    $('.movies-container').append(cardDiv);  
                };    
            });
        };
    };

    function searchActor(){
        var actorName = $('#user-input').val().trim();
        actorName = actorName.replace(" ", "%20");
        console.log("Actor name with spaces replaced: " + actorName);
        if (actorName === "") {
            displayWarning();
          }
          else {
            $('#user-input').val("");
            // jQuery get actor from input, trim ending spaces and replace middle spaces with "%20"
            var actorId = 0;
            var queryURL = "https://api.themoviedb.org/3/search/person?api_key=01a2c6e54e1c0c32fa82408ddb39628c&language=en-US&query=" + actorName + "&page=1&include_adult=false";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response)
                actorId = response.results[0].id;
                var actor = {
                    name: response.results[0].name,
                    actorId: actorId
                };
                console.log(actor);
                $(".movies-container-title").text(actor.name + ":");
            }).then(function(){
                $(".movies-container").empty();
                queryURL = "https://api.themoviedb.org/3/person/" + actorId + "/movie_credits?api_key=01a2c6e54e1c0c32fa82408ddb39628c&language=en-US";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response);
                    for(var i = 0; i < 30; i++){
                        var movieTitle = response.cast[i].title;
                        var movieId = response.cast[i].id;
                        var moviePoster =  "https://image.tmdb.org/t/p/original/" + response.cast[i].poster_path;
                        var movie = {
                            movieTitle: movieTitle,
                            movieId: movieId,
                            moviePoster: moviePoster
                        }
                        var cardDiv = $('<div>');
                        cardDiv.addClass('card');
                        var cardImage = $('<div>');
                        cardImage.addClass('card-image');
                        var imgFigure = $('<figure>');
                        imgFigure.addClass('image');
                        var image = $('<img>');
                        image.attr('src', moviePoster);
                        image.attr('data-movieId', movieId);
                        image.addClass('movie-image');
                        imgFigure.append(image);
                        cardImage.append(imgFigure);
                        cardDiv.append(cardImage);
                        $('.movies-container').append(cardDiv);      
                        console.log(movie);
                    };
                });
            });
        };
    };

    function getTrending(){
        var queryURL = "https://api.themoviedb.org/3/trending/movie/day?api_key=01a2c6e54e1c0c32fa82408ddb39628c";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for (var i = 0; i < 20; i++){
                var movieId = response.results[i].id;
                var movieTitle = response.results[i].original_title;
                var moviePoster = "https://image.tmdb.org/t/p/original/" + response.results[i].poster_path;
                var trendingMovie = {
                    movieTitle: movieTitle,
                    movieId : movieId,
                    moviePoster: moviePoster
                };
                var cardDiv = $('<div>');
                cardDiv.addClass('card');
                var cardImage = $('<div>');
                cardImage.addClass('card-image');
                var imgFigure = $('<figure>');
                imgFigure.addClass('image');
                var image = $('<img>');
                image.attr('src', moviePoster);
                image.attr('data-movieId', movieId);
                image.addClass('movie-image');
                imgFigure.append(image);
                cardImage.append(imgFigure);
                cardDiv.append(cardImage);
                $('.movies-container').append(cardDiv);  
            };
        });
    };

//     function displayWatchList(){
//         $.ajax({
//             method:"GET",
//             url: "/api/movies/"
//             }).then(function(response){
//                 console.log(response);
//                 var queryURL = "/api/movies";
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function(response){
//             console.log(response);
//             for (var i = 0; i < 20; i++){
//                 var movieId = response.results[i].id;
//                 var movieTitle = response.results[i].original_title;
//                 var moviePoster = "https://image.tmdb.org/t/p/original/" + response.results[i].poster_path;
//                 var trendingMovie = {
//                     movieTitle: movieTitle,
//                     movieId : movieId,
//                     moviePoster: moviePoster
//                 };
//                 var cardDiv = $('<div>');
//                 cardDiv.addClass('card');
//                 var cardImage = $('<div>');
//                 cardImage.addClass('card-image');
//                 var imgFigure = $('<figure>');
//                 imgFigure.addClass('image');
//                 var image = $('<img>');
//                 image.attr('src', moviePoster);
//                 image.attr('data-movieId', movieId);
//                 image.addClass('movie-image');
//                 imgFigure.append(image);
//                 cardImage.append(imgFigure);
//                 cardDiv.append(cardImage);
//                 $('.binge-container').append(cardDiv);  
//             };
//         });


//     });
// };
 
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
    
        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
    
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
    
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
            el.classList.toggle('add-black');
            $target.classList.toggle('add-black');
        });
        });
    };
  
    function hideKeyboard() {
      document.activeElement.blur();
      $(".input").blur();
    };
  
    function displayModal(){
      $("#movie-modal").toggleClass("is-active");
      $("html").toggleClass("is-clipped");
    };
  
    getTrending();
    // displayWatchList();
    $(document).on('click', '#watch-submit', postMovie);
    $(document).on('click', '.movie-image', getMovie);
    $(document).on('click', '.modal-close', displayModal);   
    $(document).on('click', '#actor-submit', searchActor);
    $(document).on('click', '#movie-submit', searchMovie);
    $(document).keyup(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            getStats();
            hideKeyboard();
        }
        return false;
    });
  
  });