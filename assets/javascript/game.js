console.log('this thing on?');

//start jquery event detection
$(document).ready(function() {

	//set up all the game variables.
	var guessesStart = 5;
	var previousGuesses = [];
	var movie, movieName, movieDisplay;

	var movies = [
		{title: "Two Weeks Notice", imgUrl: 'http:/asdasdasd'},
		{title: "The Proposal", imgUrl: 'http:/asdasdasd'},
		{title: "Sleepless in Seattle", imgUrl: 'http:/asdasdasd'},
		{title: "When Harry Met Sally", imgUrl: 'http:/asdasdasd'},
		{title: "Ten Things I Hate About You", imgUrl: 'http:/asdasdasd'},
		{title: "Pretty Woman", imgUrl: 'http:/asdasdasd'},
		{title: "Notting Hill", imgUrl: 'http:/asdasdasd'},
		{title: "While You Were Sleeping", imgUrl: 'http:/asdasdasd'},
	];

	function initGame(){
		//clear out html
		$('.val').html("");

		//now we need to pick a movie
		movie = movies[Math.floor(Math.random() * movies.length)];
		movie.title = movie.title.toUpperCase();

		//now that we have a movie, we need to prepare it for the game
		//make the movie name an array
		movieName = [];

		//the array for the display ("Big" starts of as ['B', 'i', 'g']);
		movieDisplay = [];

		for (var i = movie.title.length - 1; i >= 0; i--) {
			if(movie.title[i] === " "){
				movieName.unshift(" ");
				movieDisplay.unshift(" ");			
			} else {
				movieName.unshift(movie.title[i]);
				movieDisplay.unshift("_");			
			}
		}		
	}

	//function for updating the ui
	function updateUI(){
		console.log('updating ui');
		var displayThis = movieDisplay.join("");
		var displayPastGuesses = previousGuesses.toString();
		console.log(displayPastGuesses);
		$('#scoreboard').html(displayThis);
		$('#guessesRemaining').html(guessesStart - previousGuesses.length);
		$('#pastGuesses').html(displayPastGuesses);
		// $("#secret").html(movieName.join(""));
	}

	function keyPressed(key){
		//check if already guessed
		for (var i = previousGuesses.length - 1; i >= 0; i--) {
			if(previousGuesses[i] == key){
				console.log('already been guessed');
				return false;
			}
		}

		//start assuming no hit
		var hit = false;
		
		//loop through movie name array and check for hit
		for (var i = movieName.length - 1; i >= 0; i--) {
			if(movieName[i] == key){
				//if hit, update movie display array
				hit = true;
				movieDisplay[i] = key;
			}
		}

		// if no hit after looping though the movie name, then subtract
		// a guess and add the letter to previous guesses.
		if(hit == false){
			console.log('miss!');
			previousGuesses.push(key);
			console.log(previousGuesses);
		}

		//all done, update the user interface
		updateUI();

		//End of game?
		if(previousGuesses.length >= guessesStart){
			$('#lose').show();
		}

		//Did we win?
		if(movieDisplay.join("") == movieName.join("")){
			$('#win').show();
		}
	}

	//INIT game
	initGame();

	//when we press a key
	$(document).keydown(function(event){
		//check if any guesses left
		if(previousGuesses.length >= guessesStart){
			return false;
		}

		//convert the keycode to capital letter.
		var str = String.fromCharCode(event.which) 
		if (str.match(/[a-z]/i)) {
		    console.log("Key pressed: " + str);
		    keyPressed(str);
		}		
	});

	//restart click button
	$('.restart').click(function(){
		initGame();
	})

});

