const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;
const JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

const itemImage = (itemId) => `<img src="ItemIDs/${itemId}.png"></img>`;

var NoPoison = [
	0,1,
	4,5,
	8,9,
	12,13,
	16,17,
	20,21,
	24,25,
	28,29,
	32,33,
	36,37,
	40,41,
	44,45,
	48,49,
	52,53,
	56,57,
	60,61,
	64,65,
	68,69,
	72,73,
	76,77,
	80,81,
	84,85,
	88,89,
	92,93,
	96,97,
	100,101,
	104,105,
	108,109,
	112,113,
	116,117,
	120,121,
	124,125,
	128,129,
	132,133,
	136,137,
	140,141,
	144,145,
	148,149,
	152,153,
	156,157,
	160,161,
	164,165,
	168,169,
	172,173,
	176,177,
	180,181,
	184,185,
	188,189,
	192,193,
	196,197,
	200,201,
	204,205,
	208,209,
	212,213,
	216,217,
	220,221,
];

window.onload = function () {
	getData();
	setInterval(getData, POLLING_RATE);
};

var Asc = function (a, b) {
	if (a > b) return +1;
	if (a < b) return -1;
	return 0;
};

var Desc = function (a, b) {
	if (a > b) return -1;
	if (a < b) return +1;
	return 0;
};

function getData() {
	fetch(JSON_ENDPOINT)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendData(data);
		})
		.catch(function (err) {
			console.log("Error: " + err);
		});
}

function GetPlayerHP(data) {
	let mainContainer = document.getElementById("srtQueryData");
	var isPoisoned = !NoPoison.includes(data.PlayerPoison);
	var hitPercent = (data.PlayerHP / data.PlayerMaxHP) * 100;
	var playerName;
	if(data.PlayerMaxHP == 96){
		playerName = "Jill: ";
	} else {
		playerName = "Chris: ";
	}
	// Player HP
	if(isPoisoned){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar poison" style="width:${hitPercent}%">
				<div id="currenthp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${data.PlayerMaxHP}</div><div class="white" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent > 75 && hitPercent <= 100) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar fine" style="width:${hitPercent}%">
				<div id="currenthp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${data.PlayerMaxHP}</div><div class="green" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent > 50 && hitPercent <= 75) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar fineToo" style="width:${hitPercent}%">
				<div id="currenthp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${data.PlayerMaxHP}</div><div class="yellow" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent > 25 && hitPercent <= 50) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar caution" style="width:${hitPercent}%">
				<div id="currenthp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${data.PlayerMaxHP}</div><div class="orange" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent >= 0 && hitPercent <= 25){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar danger" style="width:${hitPercent}%">
				<div id="currenthp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${data.PlayerMaxHP}</div><div class="red" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else{
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar dead" style="width:${100}%">
				<div id="currenthp"><div style="font-size: 24px">${playerName}0 / ${data.PlayerMaxHP}</div><div class="grey" id="percenthp">${0}%</div></div></div>`;
	}
}

function formatGameTime(gameTimeSecs) {
	const hours = Math.floor(gameTimeSecs / 3600);
	gameTimeSecs = gameTimeSecs % 3600;
	const minutes = Math.floor(gameTimeSecs / 60);
	gameTimeSecs = gameTimeSecs % 60;
	return `${hours}:${minutes}:${gameTimeSecs.toFixed(3)}`
}

function GetCurrentItemAmmo(inventory, currentWeaponID) {
	for (var i = 0; i < inventory.length; i++) {
	  if (inventory[i].PlayerInv == currentWeaponID)
	  {
		let quantity = inventory[i].PlayerInv <= 18 && inventory[i].PlayerInv >= 2 ? inventory[i].PlayerAmmo : "";
		return quantity;
	  }
	}
  }

function appendData(data) {
	//console.log(data);
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";
	if (data.PlayerMaxHP == 140) {
		data.InvItem = data.InvItem.slice(0, 6);
	}

	//Player HP
	GetPlayerHP(data);

	//IGT
	mainContainer.innerHTML += `
	<div id="IGT">
		<div class="title">IGT: </div><font color="#FFFFFF">${formatGameTime(data.IGT / 30.0)}</font>
	</div>`;
	
	//Inventory Display
	let inventory = '<div class="inventory">';
    for (const invItem of data.InvItem) {
		let quantity = invItem.PlayerInv <= 18 && invItem.PlayerInv >= 2? invItem.PlayerAmmo : "";
		inventory += `<div class="inventory-item">${itemImage(invItem.PlayerInv)}<div class="inventory-item-quantity"><font color="#00FF00">${quantity}</font></div></div>`
    }
    inventory += "</div>"
    mainContainer.innerHTML += inventory;

	//Equipped Weapon
	mainContainer.innerHTML += `<div class="inventory-item">${itemImage(data.CurrentWeapon)}<div class="inventory-item-quantity"><font color="#00FF00">${GetCurrentItemAmmo(data.InvItem, data.CurrentWeapon)}</font></div></div>`;

	//SRTVersion, GameVersion 
	mainContainer.innerHTML += `
	<div id="SRTVersion">
		<div class="title"></div><font color="#FFFFFF">${"TV: " + data.VersionInfo}</font>
		<div class="title"></div><font color="#FFFFFF">${"GV: " + data.GameInfo}</font>
	</div>`;
}
