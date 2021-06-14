const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;

const JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

const itemImage = (itemId) => `<img src="ItemIDs/${itemId}.png"></img>`;

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
	var hitPercent = (data.PlayerHP / 96) * 100;
	var hitPercent2 = (data.PlayerHP / 140) * 100;
	var playerName;
	if(data.PlayerPoison == 144 || data.PlayerPoison == 146){
		playerName = "Jill: ";
	}
	if(data.PlayerPoison == 16 || data.PlayerPoison == 18){
		playerName = "Chris: ";
	}
	// Player 1
	if (hitPercent > 66 && data.PlayerPoison == 144) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar fine" style="width:${hitPercent}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${96}</div><div class="green" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 66 && hitPercent > 33 && data.PlayerPoison == 144) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar caution" style="width:${hitPercent}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${96}</div><div class="yellow" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 33 && hitPercent > 0 && data.PlayerPoison == 144){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar danger" style="width:${hitPercent}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${96}</div><div class="red" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	} else if(data.PlayerPoison == 146){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar poison" style="width:${hitPercent}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${96}</div><div class="white" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if(hitPercent == 0 || hitPercent < 0 && data.PlayerPoison == 144 || hitPercent == 0 || hitPercent < 0 && data.PlayerPoison == 146){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar dead" style="width:${100}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${96}</div><div class="grey" id="percenthp">${0}%</div></div></div>`;
	}
	else if (hitPercent2 > 66 && data.PlayerPoison == 16) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar fine" style="width:${hitPercent2}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${140}</div><div class="green" id="percenthp">${hitPercent2.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent2 <= 66 && hitPercent2 > 33 && data.PlayerPoison == 16) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar caution" style="width:${hitPercent2}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${140}</div><div class="yellow" id="percenthp">${hitPercent2.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent2 <= 33 && hitPercent2 > 0 && data.PlayerPoison == 16){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar danger" style="width:${hitPercent2}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${140}</div><div class="red" id="percenthp">${hitPercent2.toFixed(1)}%</div></div></div>`;
	} else if(data.PlayerPoison == 18){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar poison" style="width:${hitPercent2}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${140}</div><div class="white" id="percenthp">${hitPercent2.toFixed(1)}%</div></div></div>`;
	}
	else{
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar dead" style="width:${100}%">
				<div id="data.PlayerHPhp"><div style="font-size: 24px">${playerName}${data.PlayerHP} / ${140}</div><div class="grey" id="percenthp">${0}%</div></div></div>`;
	}
}


function appendData(data) {
	//console.log(data);
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";

	//Player HP
	GetPlayerHP(data);
	
	//Inventory Display
    let inventory = '<div class="inventory">';
    for (const invItem of data.InvItem) {
        inventory += `<div class="inventory-item">${itemImage(invItem.PlayerInv)}<div style="position: relative">${invItem.PlayerAmmo}</div></div>`;
    }
    inventory += "</div>"
    mainContainer.innerHTML += inventory;

	//SRTVersion, GameVersion
	mainContainer.innerHTML += `
	<div id="SRTVersion">
		<div class="title"></div><font color="#FFFFFF">${"TV: " + data.VersionInfo}</font>
		<div class="title"></div><font color="#FFFFFF">${"GV: " + data.GameInfo}</font>
	</div>`;


	
}