function post(input) {
	$('#posts').append("<p class='fadein'>" + input + "</p>");
    $('.fadein').hide().fadeIn('slow').removeClass('fadein');
    var element = document.getElementById("posts");
    element.scrollTop = element.scrollHeight;
} //creates a new post
function postWithClass(input, postWith) {
	$('#posts').append("<p class='fadein'>" + input + "</p>");
    $('.fadein').hide().fadeIn('slow').addClass(postWith).removeClass('fadein');
    var element = document.getElementById("posts");
    element.scrollTop = element.scrollHeight;
} //posts with a class
function overwrite(input, classToOverwrite) {
	//console.log("Overwriting class '" + classToOverwrite + "' with message '" + input + "'...");
	$(classToOverwrite).text(input);
} //overwrites a class
function clearPosts() {
	$('#posts').empty();
} //deletes all posts
function fadePosts () {
	$('p').fadeOut('fast');
} //fades out all posts

var numOfButtons = 0;
function newButton(buttonText) {
	numOfButtons += 1;
	$('#buttons').append("<div class='button button" + numOfButtons + "'>" + buttonText + "</div>");
	$('.button').width("calc(" + 100 / numOfButtons + "% - 8px");
} //creates one new button
function clearButtons() {
	$('#buttons').empty();
	numOfButtons = 0;
} //deletes all buttons
function fadeButtons() {
	$('.button').fadeOut('fast');
} //fades out all buttons
function triButtons(text1, text2, text3) {
	clearButtons();
	newButton(text1);
	newButton(text2);
	newButton(text3);
} //creates three new buttons
function newButtons(buttonTexts) {
	clearButtons();
	console.log("buttonTexts length is " + buttonTexts.length);
	for (var i=0;i==buttonTexts.length;i++) {
		console.log("Making button from buttonTexts[" + i + "]...");
		newButton(buttonTexts[i]);
	}
} //creates buttons on a case-by-case basis

//uses document because document will be topmost level in bubbling
/*$(document).on('touchmove',function(e){
  e.preventDefault();
});
//uses body because jquery on events are called off of the element they are
//added to, so bubbling would not work if we used document instead.
$('body').on('touchstart','.scrollable',function(e) {
  if (e.currentTarget.scrollTop === 0) {
    e.currentTarget.scrollTop = 1;
  } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
    e.currentTarget.scrollTop -= 1;
  }
});
//prevents preventDefault from being called on document if it sees a scrollable div
$('body').on('touchmove','.scrollable',function(e) {
  e.stopPropagation();
}); */

var notifTimeout = setTimeout(function(){}, 0);
function notify(input, seconds) {
	clearTimeout(notifTimeout);
	$('.notification').hide().text(input).fadeIn('slow');
	//console.log(seconds);
	if (seconds == undefined) {
		notifTimeout = setTimeout(function() {
			$('.notification').fadeOut('slow');
		}, 2500);
	} else {
		notifTimeout = setTimeout(function() {
			$('.notification').fadeOut('slow');
		}, seconds);
	}
} //shows a notif at the bottom of the screen

function xContainsY(array, value) {
	return(array.indexOf(value) > -1);
} //check if an array contains a value
function findXInY(value, array) {
	return(array.indexOf(value));
}

dying = false;
function mainMenu() {
	clearPosts();
	clearButtons();
	//console.log("Initializing main menu...");
	triButtons("load game", "new game", "options");
	if (!dying) {
		splash();
	} else {
		dying = false;
	}
} //initialize main menu
function splash() {
	//post("</p><br/><p>It's getting dark.</p><br/><p>Keep the fire going.</p><br/><p>Oh, and try not to starve.");
	post("The fire is going out.");
	post("Gotta keep the fire going.");
	//for (i=0;i<=10;i++) {
	//	post(Math.random());
	//}
} //posts the changelog [DEFUNCT]

function statusUpdate() {
	$('.fireStatus').text('fire: ' + fire + '%');
	$('.tempStatus').text('temp: ' + temp + '%');
	$('.healthStatus').text('health: ' + health + '%');
	$('.hungerStatus').text('hunger: ' + hunger + '%');
	$('.timeStatus').text(timeString);
	$('.dateStatus').text(dateString);
	/* var countdown = 0
	for (i=1;i<6;i++) {
		$('.statustitle').text('status (' + countdown + 's)');
		setTimeout(function() {countdown += 1}, 1000);
	} */
} //updates the info in the status box
$(document).ready(function() {
	setInterval(function() {statusUpdate();}, 50);
}); //loops the status function every 0.1 secs

var statusOption = true;
var invertColorsOption = false;
var soundOption = true;
function showOptions() {
	clearPosts();
	clearButtons();
	newButton("main menu");
	//postWithClass('show status: ' + statusOption, 'statusOption');
	postWithClass('invert colors: ' + invertColorsOption, 'invertColorsOption');
	postWithClass('sound: ' + /*function() {
		if (soundOption) {
			return 'on';
		} else {
			return 'off';
		}
	}*/ soundOption, 'soundOption');
	//postWithClass('simulate death (debug)', 'simDeath');
} //creates the options screen
$(document).ready(function() {
	$('#posts').on('click', '.statusOption', function() {
		if (statusOption) {
			statusOption = false;
			$('#status').css('visibility', 'hidden');
			overwrite('status: ' + statusOption, '.statusOption');
		} else {
			statusOption = true;
			$('#status').css('visibility', 'visible');
			overwrite('status: ' + statusOption, '.statusOption');
		}
	}); //toggle status
	$('#posts').on('click', '.invertColorsOption', function() {
		if (invertColorsOption) {
			invertColorsOption = false;
			$('body').removeClass('inverted');
			overwrite('invert colors: ' + invertColorsOption, '.invertColorsOption');
		} else {
			invertColorsOption = true;
			$('body').addClass('inverted');
			overwrite('invert colors: ' + invertColorsOption, '.invertColorsOption');
		}
	}); //invert colors
	$('posts').on('click', '.soundOption', function() {
		if (soundOption) {
			soundOption = false;
			overwrite('sound: ' + soundOption, '.soundOption');
		} else {
			soundOption = true;
			overwrite('sound: ' + soundOption, '.soundOption');
		}
	});
	$('#posts').on('click', '.simDeath', function(){death('debug');}); //fake die
}); //gives function to options posts

function pickRandomFrom(list) {
	return list[Math.floor(Math.random()*list.length)];
}

function timeShift(time) {
	if (time === 'day') {
		$('body').css('background-color', '#87ceeb');
		/* $('#container').css('background-color', 'white');
		$('#container').css('border', '1px solid black');
		$('*').css('color', 'black'); */
	}
	if (time === 'sunset') {
		$('body').css('background-color', '#fe4b21');
	}
	if (time === 'night') {
		$('body').css('background-color', 'black');
	}
} //shifts background-color for time of day

function death(causeOfDeath) {
	dying = true;
	clearInterval(gameInterval);
	mainMenu();
	clearPosts();
	post('<br/>');
	postWithClass('You have died of ' + causeOfDeath + '.', 'deathMessage');
	setTimeout(function() {postWithClass('Score: ' + score, 'score');}, 250);
	setTimeout(function() {post('<br/><br/>');}, 500);
	var quotes = ['That which does not kill us makes us stronger.', 'When you look into an abyss, the abyss also looks into you.', 'There are no facts, only interpretations.', 'Convictions are more dangerous enemies of truth than lies.', 'There is always some madness in love. But there is also always some reason in madness.', 'He who has a why to live can bear almost any how.', 'All truly great thoughts are conceived by walking.', 'To live is to suffer, to survive is to find some meaning in the suffering.', 'We love life, not because we are used to living but because we are used to loving.', 'Without music, life would be a mistake.', 'Thoughts are the shadows of our feelings - always darker, emptier and simpler.'];
	setTimeout(function() {post(pickRandomFrom(quotes));}, 1500);
	setTimeout(function() {post('-Friedrich Nietzsche');}, 2000);
} //message that shows on death

time = 'night';
timeString = 'unset';
dateString = 'unset';
hour = 0;
minute = 0;
month = 0;
day = 0;
year = 0;
var fire = 0;
var temp = 0;
var health = 0;
var hunger = 0;
var score = 0;
var place = 'main menu';