console.log('this thing on?');

//start jquery event detection
$(document).ready(function() {

	//set up all the game variables.
	var guessesStart = 5;
	var previousGuesses = [];
	var movie, movieName, movieDisplay;

	var movies = [
		{title: "Two Weeks Notice", imgUrl: 'http://www.shemazing.net/wp-content/uploads/2015/04/sandra.gif'},
		{title: "The Proposal", imgUrl: 'https://s-media-cache-ak0.pinimg.com/originals/4e/d8/e2/4ed8e215314a63b66238c4f3e831de35.gif'},
		{title: "Sleepless in Seattle", imgUrl: 'http://nerdist.com/wp-content/uploads/2015/03/cordenhanks-3-03242015.gif'},
		{title: "When Harry Met Sally", imgUrl: 'https://media.giphy.com/media/DPrIeZ0McEG1q/giphy.gif'},
		{title: "Ten Things I Hate About You", imgUrl: 'http://cdn3.teen.com/wp-content/uploads/2014/02/10-Things-I-Hate-About-You.gif'},
		{title: "Pretty Woman", imgUrl: 'http://cdn4.teen.com/wp-content/uploads/2015/03/Pretty-Woman.gif'},
		{title: "Notting Hill", imgUrl: 'https://s-media-cache-ak0.pinimg.com/736x/98/cd/70/98cd701be53b466f38e252ba2201cade.jpg'},
		{title: "While You Were Sleeping", imgUrl: 'http://topyaps.com/wp-content/uploads/2015/11/Pants-tearing.gif'},
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

