function gameTick() {
	timeTick();
	fireTick();
	tempTick();
	healthTick();
	hungerTick();
	randomTick();
	saveGame();
} //ticks the game engine

var timeIndicator = "";
function timeTick() {
	minute += 15;
	if (hour === 18) {
		time = 'night';
		timeIndicator = "The sun is setting.";
	} else if (hour === 6) {
		time = 'day';
		timeIndicator = "The sun is rising.";
	} else if (hour >= 19 || hour <= 5) {
		time = 'night';
		timeIndicator = "It's night time.";
	} else if (hour >= 7 || hour <= 17) {
		time = 'day';
		timeIndicator = "It's daytime.";
	} else {
		time = 'apocalypse';
		timeIndicator = "Time exists only in human perception.";
	}
	overwrite(timeIndicator, '.timeIndicator');
} //sets time var and time indicator
$(document).ready(function() {
	setInterval(function() {
		/* if (time < 1000) {
			if (time < 100) {
				if (time > 0) {
					timeString = "00" + time.toString();
				} else {
					timeString = "0000";
				}
			} else {
				timeString = "0" + time.toString();
			}
		} else {
			timeString = time.toString();
		} */ //converts the time into HH:MM format}, 1);
		var hourString = hour.toString();
		var minString = minute.toString();
		var amPM = '';
		/* if (hour < 10) {
			hourString = '0' + hour.toString();
		} else {hourString = hour.toString();} */
		if (hour === 0) {
			hourString = '12';
			amPM = 'AM';
		} else if (hour > 0 && hour < 12) {
			hourString = hour.toString();
			amPM = amPM = 'AM';
		} else if (hour == 12) {
			hourString = '12';
			amPM = 'PM';
		} else {
			hourString = (hour - 12).toString();
			amPM = 'PM';
		}
		if (minute < 10) {
			minString = '0' + minute.toString();
		} else {minString = minute.toString();}
		timeString = hourString + ':' + minString + ' ' + amPM;
	}, 1);
}); //sets the timeString

setInterval(function() {
	if (month === 1 ||
		month === 3 ||
		month === 5 ||
		month === 7 ||
		month === 8 ||
		month === 10) {
		if (day == 32) {
			month++;
			day = 1;
		}
	} else if (month === 4 ||
			   month === 6 ||
			   month === 9 ||
			   month === 11) {
		if (day === 31) {
			month++;
			day = 1;
		}
	} else if (month === 2) {
		if (year % 4 === 0) {
			if (day === 30) {
				month++;
				day = 1;
			}
		} else if (day == 29) {
			month++;
			day = 1;
		}
	} else if (month === 12) {
		if (day === 32) {
			year++;
			month = 1;
			day = 1;
		}
	}
}, 1); //advances the calendar by one day
$(document).ready(function() {
	setInterval(function() {
		dateString = month + "/" + day + "/" + year
	}, 1);
}); //sets the dateString

var fireIndicator = "";
function fireTick() {
	if ((fire > 0)) {fire -= Math.round(Math.random() * 6);} else {fire = 0;}
	if (fire > 75) {
		fireIndicator = 'The fire is roaring.';
	} else if (fire > 50) {
		fireIndicator = 'The fire is going strong.';
	} else if (fire > 25) {
		fireIndicator = 'The fire is starting to fade.';
	} else if (fire > 10) {
		fireIndicator = 'The fire is dwindling.';
	} else if (fire > 0) {
		fireIndicator = 'The fire is almost extinguished.';
	} else {
		$('.button:contains("fuel fire")').text('light fire');
		fireIndicator = 'The fire has gone out.';
	}
	overwrite(fireIndicator, '.fireIndicator');
} //ticks the fire var
function fuelFire() {
	if (fire != 100) {
		if (xContainsY(inventory, 'firewood')) {
			var fireGrowBy = 0;
			while (fireGrowBy < 14 || fireGrowBy > 17) {
				var fireGrowBy = Math.round(Math.random() * 30);
			}
			//console.log("Growing fire by " + fireGrowBy + "...");
			fire += fireGrowBy;
			if (fire > 100) {fire = 100;}
			removeFromBag('firewood');
			notify("The fire grows by " + fireGrowBy + "%.");
		} else {
			notify("There's no more firewood.");
		}
	} else {
		notify("The fire is big enough already.");
	}
	saveGame();
} //throws a log on the fire
function lightFire() {
	if (xContainsY(inventory, 'firewood')) {
		if (xContainsY(inventory, 'lighter')) {
			fuelFire();
			notify("Gotta use the lighter and some firewood.");
			$('.button:contains("light fire")').text('fuel fire');
		} else {
			notify("You need the lighter.");
		}
	} else {
		notify("There's no more firewood.");
	}
	saveGame();
} //lights the fire if it's gone out

var tempIndicator = "";
function tempTick() {
	if (place == 'home' && fire > 0) {
		if (fire > 75) {
			temp += 10;
		} else if (fire > 50) {
			temp += 8;
		} else if (fire > 25) {
			temp += 6;
		} else if (fire > 10) {
			temp += 4;
		} else if (fire > 0) {
			temp += 2;
		}
	} else {
		if (temp > 0) {
			if (time === 'night') {
				temp -= 5;
			} else {
				temp -= 3;
			}
		} else {
			temp = 0;
		}
	}
	if (temp > 75) {
		tempIndicator = "You are warm.";
	} else if (temp > 50) {
		tempIndicator = "You're getting colder.";
	} else if (temp > 25) {
		tempIndicator = "You are cold.";
	} else if (temp > 10) {
		tempIndicator = "You are very cold.";
	} else if (temp > 0) {
		tempIndicator = "You are extremely cold.";
	} else {
		tempIndicator = 'You are freezing. Get to the fire.';
		if (health > 0) {
			health -= 3;
		} else {
			death('hypothermia');
		}
	}
	if (temp > 100) {
		temp = 100;
	}
	overwrite(tempIndicator, '.tempIndicator');
} //ticks the temp var

var healthIndicator = "";
function healthTick() {
	if (health > 75) {
		healthIndicator = "You are healthy.";
	} else if (health > 50) {
		healthIndicator = "You are injured.";
	} else if (health > 25) {
		healthIndicator = "You need medical attention.";
	} else if (health > 10) {
		healthIndicator = "You are in critical condition.";
	} else if (health > 0) {
		healthIndicator = "You are about to die.";
	} else {
		healthIndicator = 'You have died.';
	}
	if (place === 'home' && fire > 0 && temp > 25 && hunger > 25) {
		health += 10;
	}
	overwrite(healthIndicator, '.healthIndicator');
}

var hungerMultiplier = 1;
var hungerIndicator = "";
function hungerTick() {
	if (hunger > 0) {hunger -= Math.round(Math.random() * hungerMultiplier);} else {hunger = 0;}
	//hunger -= Math.round(Math.random() * hungerMultiplier);
	if (hunger > 75) {
		hungerIndicator = 'You are full.';
	} else if (hunger > 50) {
		hungerIndicator = 'You are hungry.';
	} else if (hunger > 25) {
		hungerIndicator = 'You are very hungry.';
	} else if (hunger > 10) {
		hungerIndicator = 'You are extremely hungry.';
	} else if (hunger > 0) {
		fireIndicator = 'You are on the brink of starvation.';
	} else {
		hungerIndicator = 'You are starving. Eat something.';
		if (health > 0) {
			health -= 5;
		} else {
			death('starvation');
		}
	}
	overwrite(hungerIndicator, '.hungerIndicator');
} //ticks the hunger var

function randomTick() {
	if (Math.round(Math.random() * 100) > 95) {
	}
} //chance of triggering a special notify [WIP]

$(document).ready(function() {
	setInterval(function() {
		if (fire > 100) {
			fire = 100;
		} else if (fire < 0) {
			fire = 0;
		}
		if (temp > 100) {
			temp = 100;
		} else if (temp < 0) {
			temp = 0;
		}
		if (health > 100) {
			health = 100;
		} else if (health < 0) {
			health = 0;
		}
		if (hunger > 100) {
			hunger = 100;
		} else if (hunger < 0) {
			hunger = 0;
		}
		if (hour > 23) {
			hour = 0;
			day++;
		}
		if (minute >= 60) {
			hour += 1;
			minute = 0;
		}
		if (minute <= -1) {
			hour -= 1;
			minute = 45;
		}
	}, 1);
}); //keep all stats above min and below max

function saveGame() {
	/*var invString = '';
	for (i=0;i<=inventory.length;i++) {
		invString += ',' + inventory[i];
	} */
	document.cookie = "inventory=" + inventory;
	//console.log("inventory cookie: " + getCookie('inventory'));
	document.cookie = "fire= " + fire;
	document.cookie = "temp= " + temp;
	document.cookie = "health= " + health;
	document.cookie = "hunger= " + hunger;
	document.cookie = "hour= " + hour;
	document.cookie = "minute= " + minute;
	document.cookie = "month= " + month;
	document.cookie = "day= " + day;
	document.cookie = "year= " + year;
	document.cookie = "place= " + place;
} //saves the game using cookies

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
} //gets the cookie value of the specified cookie name