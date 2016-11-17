var shifted = false;
$(document).ready(function() {
	$(document).keydown(function (e) {
		if (e.keyCode == 16) {
			shifted = true;
		}
	});
	$(document).keyup(function (e) {
		if (e.keyCode == 16) {
			shifted = false;
		}
	});
})

$(document).ready(function() {
	$(document).keyup(function(event) {
		if (event.keyCode == 74) {
			inventory.push('jerky');
			notify("Added jerky to inventory.");
		} //j key for jerky
		if (event.keyCode == 70) {
			inventory.push('firewood');
			notify("Added firewood to inventory.");
		} //f key for firewood
		if (event.keyCode == 84) {
			gameTick();
		} //t key for game tick
		if (event.keyCode == 187) {
			//console.log("It's " + time + ", adding 15 mins to be " + (time + 15) + "...");
			minute += 15;
		} //+ key for +30 mins
		if (event.keyCode == 189) {
			//console.log("It's " + time + ", subtracting 15 mins to be " + (time - 15) + "...");
			minute -= 15;
		} //- key for -15 mins
	});
	
	$(document).on('click', '.status', function() {
		//console.log('Clicked a status.');
		if ($(this).hasClass('fireStatus')) {
			if (shifted) {
				fire -= 10;
			} else {
				fire += 10;
			}
		} else if ($(this).hasClass('tempStatus')) {
			if (shifted) {
				temp -= 10;
			} else {
				temp += 10;
			}
		} else if ($(this).hasClass('healthStatus')) {
			if (shifted) {
				health -= 10;
			} else {
				health += 10;
			}
		} else if ($(this).hasClass('hungerStatus')) {
			if (shifted) {
				hunger -= 10;
			} else {
				hunger += 10;
			}
		} else if ($(this).hasClass('timeStatus')) {
			if (shifted) {
				minute -= 15;
			} else {
				minute += 15;
			}
		} else if ($(this).hasClass('dateStatus')) {
			if (shifted) {
				day -= 1;
			} else {
				day += 1;
			}
		} else if ($(this).hasClass('timeStatus')) {
			if (shifted) {
				time -= 30;
			} else {
				time += 30;
			}
		}
	});
})