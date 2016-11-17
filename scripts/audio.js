var fading = false;

//$('.button').ready(function() {
	//$('.button').click(function() {
		var fireSound = new Audio('sound/fire.mp3');
		$(document).ready(function() {
			setInterval(function() {
				if (fire !== 0) {
					fireSound.play();
				} else {
					fireSound.pause();
				}
			}, 100);
			setInterval(function() {
				if (fire >= 0) {
					fireSound.volume = fire/100;
				} else {
					fireSound.volume = 0;
				}
			}, 100);
		}); //fire ambient sound
		/* function fireFadeIn() {
			console.log('Fading in the fire.');
			fading = true;
			fireSound.volume = 0;
			var fireFadeInterval = setInterval(function() {fireSound.volume += 0.01;console.log(fireSound.volume);}, 100);
			if (fireSound.volume >= 1) {
				clearInterval(fireFadeInterval);
			}
			fading = false;
		} */ //fire fade in [WIP]

		var nightSound = new Audio('sound/night.mp3');
		var daySound = new Audio('sound/birds.mp3');
		$(document).ready(function() {
			setInterval(function() {
				if (hour > 18 || hour < 6) {nightSound.play(); daySound.pause(); /*console.log("Time is night, playing night sound.");*/}
				else if (hour > 6 || hour < 18) {daySound.play(); nightSound.pause(); /*console.log("Time is day, playing day sound.");*/}
				else {console.log("The time is an unrecognized value.")}
			}, 1)
			setInterval(function() {
				if (fire > 0) {
					nightSound.volume = 0.05;
					daySound.volume = 0.05;
					}
				else {
					nightSound.volume = 0.1;
					daySound.volume = 0.1;
				}
			}, 100);
		}); //day/night ambient sound

		$(document).ready(function() {
			setInterval(function() {
				if (!soundOption) {
					fireSound.pause();
					nightSound.pause();
				}
			}, 1);
		}) //sound option toggle script
	//})
//})