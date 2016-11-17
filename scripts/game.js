var gameInterval = undefined;
function newGame() {
	inventory = ['flashlight', 'lighter', 'jerky', 'firewood', 'firewood'];
	hour = 23;
	minute = 15;
	month = 11;
	day = 25;
	year = 15;
	fire = 75;
	temp = 100;
	health = 87;
	hunger = 90;
	score = 0;
	goHome();
	gameInterval = setInterval(function() {gameTick();}, 5000);
} //creates a new game
function loadGame() {
	//alert('Saving and loading has not yet been implemented.');
	var tempInv = getCookie('inventory');
	var tempInvString = tempInv.toString();
	//inventory = JSON.parse(JSON.stringify(getCookie('inventory')));
	inventory = getCookie('inventory').split(',');
	console.log("parsed inventory: " + inventory);
	fire = getCookie('fire');
	temp = getCookie('temp');
	health = getCookie('health');
	hunger = getCookie('hunger');
	hour = getCookie('hour');
	minute = getCookie('minute');
	month = getCookie('month');
	day = getCookie('day');
	year = getCookie('year');
	place = getCookie('place');
	if (place === 'home') {
		goHome();
	}
	setTimeout(function() {gameInterval = setInterval(function() {gameTick();}, 5000);}, 5000);
} //loads an existing save [WIP]

$(document).ready(function() {
	mainMenu();
	$('#buttons').on('click', '.button', function() {
		switch($(this).text()) {
			case 'new game':
				post("...");
				setTimeout(function() {post("Gotta find her.");}, 100);
				fadeButtons();
				setTimeout(function() {newGame();}, 300);
				break;
			case 'load game':
				/* fadePosts();
				post("Welcome home.");
				fadeButtons(); */
				setTimeout(loadGame(), 500);
				break;
			case 'options':
				showOptions();
				break;
			case 'main menu':
				mainMenu();
				break;
			case 'inventory':
				saveGame();
				openBag();
				break;
			case 'close bag':
				saveGame();
				closeBag();
				break;
			case 'craft':
				craft();
				break;
			case 'fuel fire':
				fuelFire();
				break;
			case 'light fire':
				lightFire();
				break;
			case 'embark':
				saveGame();
				embark();
				break;
			case 'return':
				saveGame();
				goHome();
				break;
			case 'forage':
				saveGame();
				forage();
				break;
			case 'adventure':
				saveGame();
				notify("I'm not ready to go yet.");
				break;
		}
	});
}); //gives function to buttons

function goHome() {
	place = 'home';
	fadePosts();
	triButtons('inventory', 'fuel fire', 'embark');
	postWithClass('Looking at the clock...', 'timeIndicator');
	postWithClass('Inspecting the fire..', 'fireIndicator');
	postWithClass('Taking your temperature...', 'tempIndicator');
	postWithClass('Checking your stomach...', 'hungerIndicator');
	postWithClass('Administering a physical...', 'healthIndicator');
	gameTick();
} //shows the home screen with friendly stats

function openBag() {
	postsBackup = $('#posts').html();
	buttonsBackup = $('#buttons').html();
	clearPosts(); clearButtons();
	newButton('close bag');
	newButton('craft');
	refreshBag();
	$('#posts').addClass('bag');
} //opens the inventory screen
function closeBag() {
	clearPosts(); clearButtons();
	$('#posts').html(postsBackup);
	$('#buttons').html(buttonsBackup);
	$('#posts').removeClass('bag');
} //closes the inventory screen
function refreshBag() {
	clearPosts(); clearButtons();
	newButton('close bag');
	newButton('craft');
	var firstOfThis = function() {
		var matches = [];
		for (j=0;j<=inventory.length;j++) {
			if (currentItem === inventory[j]) {
				matches.push(j);
			}
		}
		return(matches[0]);
	};
	var i = 0;
	for (i=0;i<=inventory.length-1;i++) {
		var currentItem = inventory[i];
		//console.log("Dealing with item " + i + ", which is a " + currentItem + "...");
		//console.log("First " + currentItem + " is at spot " + firstOfThis() + ".");
		//console.log("Current " + currentItem + " is at spot " + i + ".");
		if (count(currentItem) > 1) {
			//console.log(currentItem + " count is greater than 1.");
			if (i == firstOfThis()) {
				//console.log("This is the first " + currentItem + ", posting with an amount.");
				$('#posts').append('<p class="bagItem stacked" id="' + currentItem + '">' + currentItem + ' (' + count(currentItem) + ')</p>');
			} else {/*console.log(console.log("This isn't the first " + currentItem + ", not posting."))*;*/}
		} else {
			//console.log("This is the only " + currentItem + ", posting with no amount.");
			$('#posts').append('<p class="bagItem" id="' + currentItem + '">' + currentItem + '</p>');
		}
		//console.log("Done with item " + i + ", moving on to item " + (i+1) + "...");
	}
	$('#posts').addClass('bag');
} //refreshes bag for after crafting

function addToBag(item) {
	inventory.push(item);
	notify("You obtain " + item + ".");
} //add an item to the inventory
permanentItems = ['flashlight', 'lighter']; //items that can't be removed
function removeFromBag(item) {
	if (!(xContainsY(permanentItems, item))) {
		for (i=inventory.length;i>=0;i--) {
			if (inventory[i] == item) {
				inventory.splice(i, 1);
				break;
			}
		}
	}
} //removes an item from the inventory

function count(item) {
	var number = 0;
	if (item === 'food') {
		for (i=0;i<inventory.length;i++) {
			if (xContainsY(food, inventory[i])) {
				number++;
			}
		}
	} else {
		for (i=0;i<inventory.length;i++) {
			if (inventory[i] === item) {
				number++;
			}
		}
	}
	return(number);
} //count the number of something in the bag

$(document).ready(function() {
	$('#posts').on('click', '.bagItem', function() {
		if (crafting) {
			$(this).fadeOut('fast');
		} else {
			var $this = $(this);
			var $thisText = $(this).text();
			var activeItem = 'unset';
			if ($this.hasClass('stacked')) {
				//console.log("activeItem: " + $thisText.substring(0, $thisText.length - 4));
				activeItem = $thisText.substring(0, $thisText.length - 4);
			} else {
				//console.log("activeItem: " + $thisText);
				activeItem = $thisText;
			}
			$(this).addClass('activeItem');
			if (xContainsY(food, activeItem)) {
				$(this).addClass('eating');
				eat(findXInY(activeItem, food), activeItem);
			} else {
				switch(activeItem) {
					case 'flashlight':
						notify("I can use this to go out at night.");
						break;
					case 'lighter':
						notify("I'll use this if the fire goes out.");
						break;
					case 'firewood':
						notify("Gotta keep the fire going.");
						break;
					case 'ashes':
						notify("Not much use for these.");
						break;
				};
			};
		}
	});
}); //interaction with the inventory screen

var food = ['jerky', 10, 'granola', 15, 'red berry', 5, 'blueberry', 5, "green berry", 5, 'pink berry', 5, 'strawberry', 5]; //list of foods and hunger values
var berries = ['red berry', 'blueberry', "green berry", "pink berry", "strawberry"]
function eat(foodIndex, foodName) {
	var foodHungerVal = food[foodIndex + 1];
	//console.log('Attempting to eat ' + foodName + ' with hunger value ' + foodHungerVal + '...')
	if ((hunger + foodHungerVal) <= 100) {
		//console.log('Success, eating now.');
		removeFromBag(foodName);
		refreshBag();
		hunger += foodHungerVal;
		notify('The ' + foodName + ' replenishes ' + foodHungerVal + ' hunger.');
	} else {notify("I'm not hungry enough to eat this.");};
}; //eat something by index in food array

var crafting = false;
var recipes = [['firewood', 'lighter', 'torch'], ['jerky', 'lighter', 'ashes']]; //0=item1, 1=item2, 3=given result
function craft() {
	crafting = true;
	//console.log("Initiating crafting...")
	clearButtons();
	newButton('cancel');
	$(document).on('click', '.button:contains("cancel")', function() {
		console.log("Aborting craft.");
		refreshBag();
		return;
	});
	var item1 = '';
	var item2 = '';
	//console.log("Waiting for item inputs.")
	$("#posts").on('click', 'p', function() {
		var $this = $(this);
		var $thisText = $(this).text();      
		if (item1.length === 0) {
			if ($this.hasClass('stacked')) {
				//console.log("item1: " + $thisText.substring(0, $thisText.length - 4));
				item1 = $thisText.substring(0, $thisText.length - 4);
			} else {
				//console.log("item1: " + $thisText);
				item1 = $thisText;
			}
		} else if (item2.length === 0) {
			if ($this.hasClass('stacked')) {
				//console.log("item2: " + $thisText.substring(0, $thisText.length - 4));
				item2 = $thisText.substring(0, $thisText.length - 4);
			} else {
				//console.log("item2: " + $thisText);
				item2 = $thisText;
			}
		} else {
			return;
		}
	})
	var readyToCraft = false;
	var craftInterval = setInterval(function() {
		if (item1.length > 0 && item2.length > 0) {
			readyToCraft = true;
			actuallyCraft();
		}
	})
	function actuallyCraft() {
		clearInterval(craftInterval);
		//console.log("Checking craftability...")
		var canCraft = false;
		var craftResult = '';
		for (i=0;i<recipes.length;i++) {
			for (j=0;j<=1;j++) {
				if (recipes[i][j] === item1) {
					if (j === 0) {
						if (recipes[i][1] === item2) {
							canCraft = true;
							craftResult = recipes[i][2];
						}
					} else {
						if (recipes[i][0] === item2) {
							canCraft = true;
							craftResult = recipes[i][2];
						}
					}
				} else if (recipes[i][j] === item2) {
					if (j === 0) {
						if (recipes[i][1] === item1) {
							canCraft = true;
							craftResult = recipes[i][2];
						}
					} else {
						if (recipes[i][0] === item1) {
							canCraft = true;
							craftResult = recipes[i][2];
						}
					}
				}
			}
		}
		if (canCraft) {
			//console.log("Success, crafting " + craftResult + ".");
			removeFromBag(item1);
			removeFromBag(item2);
			addToBag(craftResult);
			notify(item1 + " + " + item2 + " = " + craftResult, 4000);
		} else {
			//console.log("Failed, not crafting.")
			notify("I can't make anything with these.", 4000);
		}
		setTimeout(function() {refreshBag();}, 500);
		crafting = false;
		return;
	}
} //craft two items into a new item

function embark() {
	place = "home";
	fadePosts();
	triButtons('return', 'forage', 'adventure');
	postWithClass("Firewood: " + count('firewood'), 'firewoodCount');
	postWithClass("Food: " + count('food'), 'foodCount');
} //shows the embark screen

function forage() {
	var woodChance = Math.random();
	var numOfWood = 0;
	var berryChance = Math.random();
	var numOfBerries = 0;
	var timeItTook = Math.random();
	if (woodChance > 0.9) {
		addToBag('firewood');
		addToBag('firewood');
		addToBag('firewood');
		numOfWood = 3;
	} else if (woodChance > 0.7) {
		addToBag('firewood');
		addToBag('firewood');
		numOfWood = 2;
	} else if (woodChance > 0.5) {
		addToBag('firewood');
		numOfWood = 1;
	} else {
		numOfWood = 0;
	}
	if (berryChance > 0.9) {
		addToBag(pickRandomFrom(berries));
		addToBag(pickRandomFrom(berries));
		addToBag(pickRandomFrom(berries));
		numOfBerries = 3;
	} else if (berryChance > 0.7) {
		addToBag(pickRandomFrom(berries));
		addToBag(pickRandomFrom(berries));
		numOfBerries = 2;
	} else if (berryChance > 0.5) {
		addToBag(pickRandomFrom(berries));
		numOfBerries = 1;
	} else {
		numOfBerries = 0;
	}
	if (timeItTook > 0.75) {
		gameTick();
		timeItTook = 15;
	} else if (timeItTook > 0.5) {
		gameTick();
		gameTick();
		timeItTook = 30;
	} else {
		gameTick();
		gameTick();
		gameTick();
		timeItTook = 45;
	}
	notify("Firewood: +" + numOfWood + " | Berries: +" + numOfBerries + " | Time: " + timeItTook + " mins", 6000);
	overwrite("Firewood: " + count('firewood'), '.firewoodCount');
	overwrite("Food: " + count('food'), '.foodCount');
} //gathers berries and firewood