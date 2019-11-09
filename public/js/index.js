$(document).ready(function(){

    function getMovie(){
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
            }).then(function(response){
                var movie = {
                    title: response.Title,
                    poster: moviePoster,
                    plot: moviePlot,
                    year: response.Year,
                    cast: response.Actors,
                    director: response.Director,
                    genre: response.Genre,
                    rated: response.Rated,
                    runtime: response.Runtime,
                    imdbRating: response.imdbRating,
                    tmdbId: movieId,
                    imdbId: imdbId
                }
                console.log(movie);
            })
        })
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
  
    function saveContact(){
      event.preventDefault();
      var name = $('#name-input').val().trim();
      var email = $('#email-input').val().trim();
      var message = $('#message-input').val().trim();
      if ($('#name-input').val() === "" || $('#email-input').val() === "" || $('#message-input').val() === "") {
        return false;
      }
      else {
        var newContact = {
          name: name,
          email: email,
          message: message,
        };
        database.ref().push(newContact);
      };
      $('#name-input').val("");
      $('#email-input').val("");
      $('#message-input').val("");
    };
  
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
      $('#test-modal').toggle('is-active');
    };
    
    function displayWarning(){
      $('#warning-modal').toggle('is-active')
    };
  
    function getStats(){
        $('.stats-container').empty();
        var userInput = $('#user-input').val().trim();
        if (userInput === "") {
        displayWarning();
        }
        else {
        userInput = userInput.split(" ").join("-").toLowerCase();
        $('#user-input').val("");
        var queryURL = "https://api.mysportsfeeds.com/v1.1/pull/nfl/2019-regular/cumulative_player_stats.json?&player=" + userInput;
        $.ajax({
            url: queryURL,
            type: "GET",
            dataType: "json",
            headers: { 
            "Authorization": "Basic " + btoa("a437f7dc-b82f-4f70-8989-798c15" + ":" + "Classwork12")
        }
        }).then(function(response){
            var position = response.cumulativeplayerstats.playerstatsentry[0].player.Position;
            var table = $('<table>');
            var thead = $('<thead>');
            var tbody = $('<tbody>');
            var tableDiv = $('<div>');
            tableDiv.addClass('table-container');
            table.addClass('table');
            thead.addClass('thead');
            tbody.addClass('tbody');
            var name = response.cumulativeplayerstats.playerstatsentry[0].player.FirstName + " " + response.cumulativeplayerstats.playerstatsentry[0].player.LastName;
            var team = response.cumulativeplayerstats.playerstatsentry[0].team.City + " " + response.cumulativeplayerstats.playerstatsentry[0].team.Name;
            var h1Name = $('<h1>');
            h1Name.addClass('is-size-3');
            h1Name.text(name);
            var pPosition = $('<p>');
            pPosition.text(position);
            var pTeam = $('<p>');
            pTeam.addClass('is-italic');
            pTeam.text(team);
            $('.stats-container').append(h1Name, pTeam, pPosition);
            if (position === 'QB'){
            displayModal();
            var h2Passing = $('<h2>');
            h2Passing.addClass('is-size-4');
            h2Passing.text('Passing');
            $('.stats-container').append(h2Passing);
            $('.stats-container').append(tableDiv);
            $('.table-container').append(table);
            $('.table').append(thead);
            $('.table').append(tbody);
            var header = $('<tr>').append(
                $('<th>').text('ATT'),
                $('<th>').text('CMP'),
                $('<th>').text('CMP%'),
                $('<th>').text('YARDS'),
                $('<th>').text('AVG'),
                $('<th>').text('INT'),
                $('<th>').text('TD'),
                $('<th>').text('FUM'),
                $('<th>').text('SACK'),
                );
            $('.thead').append(header);
            var newRow = $('<tr>').append(
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassAttempts['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassCompletions['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassPct['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassYards['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassAvg['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassInt['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassTD['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.Fumbles['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassSacks['#text']),
                );
                $('.tbody').append(newRow);
            }
            else if (position === 'WR' || position === 'RB' || position === 'TE') {
                displayModal();
                var table = $('<table>');
                var thead = $('<thead>');
                var tbody  = $('<tbody>');
                var tableDiv = $('<div>');
                tableDiv.addClass('table-container');    
                table.addClass('table');
                thead.addClass('thead');
                tbody.addClass('tbody');
                var h2Receiving = $('<h2>');
                h2Receiving.addClass('is-size-4');
                h2Receiving.text('Receiving and Rushing');
                $('.stats-container').append(h2Receiving);
                $('.stats-container').append(tableDiv);
                $('.table-container').append(table);
                $('.table').append(thead);
                $('.table').append(tbody);
                var header = $('<tr>').append(
                $('<th>').text('REC'),
                $('<th>').text('REC YRDS'),
                $('<th>').text('REC AVG'),
                $('<th>').text('REC TD'),
                $('<th>').text('RSH'),
                $('<th>').text('RSH YRDS'),
                $('<th>').text('RSH AVG'),
                $('<th>').text('RSH TD'),
                $('<th>').text('FUM'),
                );
                $('.thead').append(header);
                var newRow = $('<tr>').append(
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.Receptions['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.RecYards['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.RecAverage['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.RecTD['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.RushAttempts['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.RushYards['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.RushAverage['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.RushTD['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.Fumbles['#text']),
                );
                $('.tbody').append(newRow);
            }
            else if (position === 'LB' || position === 'DT' || position === 'DE' || position === 'CB' || position === 'FS' || position === 'SS') {
                displayModal();
                var table = $('<table>');
                var thead = $('<thead>');
                var tbody  = $('<tbody>');
                var tableDiv = $('<div>');
                tableDiv.addClass('table-container');    
                table.addClass('table');
                thead.addClass('thead');
                tbody.addClass('tbody');
                var h2Defense = $('<h2>');
                h2Defense.addClass('is-size-4');
                h2Defense.text('Defense');
                $('.stats-container').append(h2Defense);
                $('.stats-container').append(tableDiv);
                $('.table-container').append(table);
                $('.table').append(thead);
                $('.table').append(tbody);
                var header = $('<tr>').append(
                $('<th>').text('TKL'),
                $('<th>').text('TKL 4 LS'),
                $('<th>').text('SAFE'),
                $('<th>').text('FUM'),
                $('<th>').text('FUM REC'),
                $('<th>').text('FUM TD'),
                $('<th>').text('PS DEF'),
                $('<th>').text('INT'),
                $('<th>').text('INT TD'),
                );
                $('.thead').append(header);
                var newRow = $('<tr>').append(
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.TackleTotal['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.TacklesForLoss['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.Safeties['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.FumForced['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.FumTotalRec['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.FumTD['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.PassesDefended['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.Interceptions['#text']),
                $('<td>').text(response.cumulativeplayerstats.playerstatsentry[0].stats.IntTD['#text']),
                );
                $('.tbody').append(newRow);
            }
        })
        .catch(function(){
            displayWarning();
        });
        };
    };

    function getNews(){
        var queryURL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news"
        $.ajax({
            url: queryURL,
            method:"GET"
        }).then(function(response){
            for(var i = 0; i < response.articles.length; i++){
                var cardDiv = $('<div>');
                cardDiv.addClass('card');
                var cardImage = $('<div>');
                cardImage.addClass('card-image');
                var imgFigure = $('<figure>');
                imgFigure.addClass('image is-3by2');
                var image = $('<img>');
                var imgURL = response.articles[i].images[0].url;
                image.attr('src', imgURL);
                imgFigure.append(image);
                cardImage.append(imgFigure);
                cardDiv.append(cardImage);
                var cardContent = $('<div>');
                cardContent.addClass('card-content');
                var content = $('<div>');
                content.addClass('content');
                var headline = response.articles[i].headline;
                content.text(headline);
                var br = $('<br>');
                content.append(br);
                var aElement = $('<a>');
                var link = response.articles[i].links.web.href;
                aElement.attr('href', link);
                aElement.attr('target', '_blank');
                aElement.text(' read more');
                content.append(aElement);
                cardContent.append(content);
                cardDiv.append(cardContent);
                $('.news-container').append(cardDiv);
            }
        });
    };
  
    getTrending();
    //   getNews();
    $(document).on('click', '.movie-image', getMovie);
    $(document).on('click', '#actor-submit', searchActor);
    $(document).on('click', '#movie-submit', searchMovie);
    $(document).on("click", ".warning-delete", displayWarning);
    $(document).keyup(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            getStats();
            hideKeyboard();
        }
        return false;
    });
  
  });