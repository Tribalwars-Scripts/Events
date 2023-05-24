const EventScreen=game_data.screen;
const regex=/(?<=event_).*/;
const match = EventScreen.match(regex);
const EventName = match[0].includes('_') ? match[0].replace('_', ' ') : match[0];
const EName = EventName.includes(' ') ? (EventName.split(' ')[0].replace(/^\w/, c => c.toUpperCase())) + " " +  (EventName.split(' ')[1].replace(/^\w/, c => c.toUpperCase())) : EventName.replace(/^\w/, c => c.toUpperCase());
const ScriptName = EName + ' Event',
	ScriptTag = ScriptName.replace(' ','').replace(/^\w/, c => c.toLowerCase());

let ScriptVersion = '1.0.0',
	globalData = {
		debug: false,
		firstTime: true,
		safeMode: true,
		running: false,
		minimize: false,
		groupId: 0,
		version: ScriptVersion,
		time: undefined,
		time2: undefined,
	},
	Changelog = {
		'1.0.0' : 'Basic UI Loader',
	},
	UIIds = {
		currentWorldUrl: window.location.hostname,
		yesId: ScriptTag + 'YesButton',
		noId: ScriptTag + 'NoButton',
		changeLogId: ScriptTag + 'ChangeLog',
		divScriptId: ScriptTag + 'DivScript',
		divContentId: ScriptTag + 'DivContent',
		divCImgId: ScriptTag + 'DivContentImage',
		farmUntilInputId: ScriptTag + 'FarmUntilInput',
		farmUntilValueId: ScriptTag + 'FarmUntilValue',
		resetFarmUntilValueId: ScriptTag + 'ResetFarmUntilValue',
		delayValueId: ScriptTag + 'DelayValue',
		delayInputId: ScriptTag + 'DelayInput',
		safeModeValueId: ScriptTag + 'SafeModeValue',
		safeModeButtonId: ScriptTag + 'SafeModeButton',
		setPrefsId: ScriptTag + 'SetPrefs',
		resetPrefsId: ScriptTag + 'ResetPrefs',
		startButtonId: ScriptTag + 'StartButton',
		widgetId: ScriptTag + 'Widget',
		settingsName: ScriptName + ' Settings',
		versionString: ' (v' + ScriptVersion + ')',
		setEventSettingsId: ScriptTag + 'Set' + EName + 'Settings',
	}, StorageIds = {
		globalData:
			ScriptTag + '_GlobalData_ID_' + game_data.player.id + "_" + game_data.world,
	}


let userInputParent = document.querySelector("#content_value").firstElementChild;
const divScript = document.createElement("div");
divScript.setAttribute("id", UIIds.divScriptId);
divScript.setAttribute("class", "vis movable widget");
divScript.setAttribute("style", "");

const h4 = document.createElement("h4");
h4.setAttribute("class", "head with-button ui-sortable-handle");
h4.innerHTML = '<img style="cursor: pointer;position: absolute;right: 3px;" id="' + UIIds.widgetId + '" src="graphic/minus.png" alt="">' + UIIds.settingsName + '</h4><span style="font-size: 10px; color: DarkSlateGrey;">' + UIIds.versionString + '</span><span id="countdown" style="font-size: 12px; color: DarkSlateGrey; position: absolute; right: 25px;"></span>';
divScript.appendChild(h4);

//left side content
const divContent = document.createElement("div");
divContent.setAttribute("id", UIIds.divContentId);
divContent.setAttribute("class", "widget_content");

// const divImageContent = document.createElement("div");
// divImageContent.setAttribute("id", UIIds.divCImgId);
// divImageContent.setAttribute("class", "event-top-section-right");
//
// const displayImage = document.createElement("img");
// displayImage.src = "https://cdn.discordapp.com/avatars/" + 432864216647598100 + "/5af82b694e245c96aa31f9c3ac12fcfa.webp"
// displayImage.src = "graphic/events/assault/logo.png"
// displayImage.style.borderRadius = "50%"
//
// divImageContent.appendChild(displayImage);


let table = document.createElement("table");
table.className = "vis";
table.setAttribute("width", "100%");


let tbody = document.createElement("tbody");
table.appendChild(tbody);


let tr1 = document.createElement("tr");
tbody.appendChild(tr1);
let td1 = document.createElement("td");
td1.style.padding = "4px";
tr1.appendChild(td1);

let delayText = document.createTextNode("Delay between Refreshes: ");
td1.appendChild(delayText);

let delayValueSpan = document.createElement("span");
delayValueSpan.id = UIIds.delayValueId;
delayValueSpan.style.color = "DarkViolet";
td1.appendChild(delayValueSpan);

let delayValueText = document.createTextNode(" seconds -> ");
td1.appendChild(delayValueText);

let delayInput = document.createElement("input");
delayInput.id = UIIds.delayInputId;
delayInput.setAttribute("data-title", "Recommended to be at least 15 seconds.")
td1.appendChild(delayInput);

////

let tr2 = document.createElement("tr");
tbody.appendChild(tr2);

let td2 = document.createElement("td");
td2.style.padding = "4px";
tr2.appendChild(td2);

let farmUntilText = document.createTextNode(ScriptName + ' until : ');
td2.appendChild(farmUntilText);

let farmUntilValueSpan = document.createElement("span");
farmUntilValueSpan.id = UIIds.farmUntilValueId;
farmUntilValueSpan.style.color = "DarkViolet";
td2.appendChild(farmUntilValueSpan);

let farmUntilValueText = document.createTextNode(" -> ");
td2.appendChild(farmUntilValueText);

let farmUntilInput = document.createElement("input");
farmUntilInput.id = UIIds.farmUntilInputId;
farmUntilInput.classList.add("btn-disabled");
farmUntilInput.classList.add("disabled");
farmUntilInput.setAttribute("data-title", "There will be no requests after this hour.")
td2.appendChild(farmUntilInput);

let resetFarmUntilValueBtn = document.createElement("button");
resetFarmUntilValueBtn.id = UIIds.resetFarmUntilValueId;
resetFarmUntilValueBtn.classList.add("btn");
resetFarmUntilValueBtn.classList.add("btn-disabled");
resetFarmUntilValueBtn.style.margin = "4px";
resetFarmUntilValueBtn.innerText = "Reset Date";
td2.appendChild(resetFarmUntilValueBtn);

let farmUntilNote = document.createElement("span");
farmUntilNote.style.fontSize = "10px";
farmUntilNote.style.color = "DarkSlateGrey";
farmUntilNote.innerText = "There will be no requests after this hour.";
td2.appendChild(farmUntilNote);


/////

let tr3 = document.createElement("tr");
tbody.appendChild(tr3);
let td3 = document.createElement("td");
td3.setAttribute("style", "padding: 4px;");

let scavengeSettings = document.createTextNode("Event Settings: ");
td3.appendChild(scavengeSettings);

let setScavengeSettingsBtn = document.createElement("button");
setScavengeSettingsBtn.id=UIIds.setScavengeSettingsId;
setScavengeSettingsBtn.classList.add("btn");
setScavengeSettingsBtn.classList.add("btn-disabled");
setScavengeSettingsBtn.setAttribute("style", "margin: 4px;");
setScavengeSettingsBtn.innerHTML = "Set";
td3.appendChild(setScavengeSettingsBtn);

let scavengeSettingsInfo = document.createTextNode("This feature will be available in the next update");
let scavengeSettingsInfoSpan = document.createElement("span");
scavengeSettingsInfoSpan.setAttribute("style", "font-size: 10px; color: DarkSlateGrey;");
scavengeSettingsInfoSpan.appendChild(scavengeSettingsInfo);
td3.appendChild(scavengeSettingsInfoSpan);

tr3.appendChild(td3);

let emptyTr = document.createElement("tr");
tbody.appendChild(emptyTr);
let emptyTd = document.createElement("td");
emptyTd.setAttribute("style", "padding: 4px;");
emptyTr.appendChild(emptyTd);

//

// let tr4 = document.createElement("tr");
// tbody.appendChild(tr4);
// let td4 = document.createElement("td");
// td4.style.padding = "4px";
// let spanAutoUnlockScavengeValue = document.createElement("span");
// spanAutoUnlockScavengeValue.id = UIIds.autoUnlockScavengeValueId;
// spanAutoUnlockScavengeValue.style.color = "DarkViolet";
// let buttonAutoUnlockScavenge = document.createElement("button");
// buttonAutoUnlockScavenge.id = UIIds.autoUnlockScavengeButtonId;
// buttonAutoUnlockScavenge.className = "btn";
// buttonAutoUnlockScavenge.style.margin = "4px";
// td4.innerHTML = "Auto Unlock Scavenge: " + spanAutoUnlockScavengeValue.outerHTML + " -> " + buttonAutoUnlockScavenge.outerHTML;
// tr4.appendChild(td4);

// let tr5 = document.createElement("tr");
// tbody.appendChild(tr5);
// let td5 = document.createElement("td");
// td5.style.padding = "4px";
// let spanAutoUnlockDelayValue = document.createElement("span");
// spanAutoUnlockDelayValue.id = UIIds.autoUnlockDelayValueId;
// spanAutoUnlockDelayValue.style.color = "DarkViolet";
// let inputAutoUnlockDelay = document.createElement("input");
// inputAutoUnlockDelay.id = UIIds.autoUnlockDelayInputId;
// td5.innerHTML = "Auto Unlock Scavenge Delay: " + spanAutoUnlockDelayValue.outerHTML + " seconds -> " + inputAutoUnlockDelay.outerHTML;
// tr5.appendChild(td5);

///
//
// let emptyTr1 = document.createElement("tr");
// tbody.appendChild(emptyTr1);
// let emptyTd1 = document.createElement("td");
// emptyTd1.setAttribute("style", "padding: 4px;");
// emptyTr1.appendChild(emptyTd1);

////

// create a table row element
let tr6 = document.createElement("tr");
tbody.appendChild(tr6);

// create a table data element
let td6 = document.createElement("td");
td6.style.padding = "4px";

// create a span element for safe mode
let safeModeValue = document.createElement("span");
safeModeValue.id = UIIds.safeModeValueId;
safeModeValue.style.color = "DarkViolet";

// create a button for safe mode
let safeModeButton = document.createElement("button");
safeModeButton.id = UIIds.safeModeButtonId;
safeModeButton.classList.add("btn");
safeModeButton.classList.add("btn-disabled");
safeModeButton.style.margin = "4px";
safeModeButton.textContent = "Safe Mode";
// append the elements to the table data element
td6.appendChild(document.createTextNode("Safe mode: "));
td6.appendChild(safeModeValue);
td6.appendChild(document.createTextNode(" -> "));
td6.appendChild(safeModeButton);

// append the table data element to the table row element
tr6.appendChild(td6);

// create another table row element
let tr7 = document.createElement("tr");
tbody.appendChild(tr7);

// create another table data element
let td7 = document.createElement("td");

// create a button for set settings
let setPrefsButton = document.createElement("button");
setPrefsButton.id = UIIds.setPrefsId;
setPrefsButton.classList.add("btn");
setPrefsButton.classList.add("btn-disabled");
setPrefsButton.style.margin = "4px";
setPrefsButton.textContent = "Set Settings";

// create a button for reset settings
let resetPrefsButton = document.createElement("button");
resetPrefsButton.id = UIIds.resetPrefsId;
resetPrefsButton.classList.add("btn");
resetPrefsButton.classList.add("btn-disabled");
resetPrefsButton.style.margin = "4px";
resetPrefsButton.textContent = "Reset Settings";

// create a button for start
let startButton = document.createElement("button");
startButton.id = UIIds.startButtonId;
startButton.classList.add("btn");
startButton.classList.add("btn-disabled");
startButton.style.margin = "4px";
startButton.textContent = "Start";

// append the buttons to the table data element
td7.appendChild(setPrefsButton);
td7.appendChild(resetPrefsButton);
td7.appendChild(startButton);

const authorInfo = document.createElement("span");
authorInfo.style.fontFamily = "Verdana, Arial";
authorInfo.style.float = "right";
authorInfo.style.margin = "7px";

const authorDiscord = document.createElement("a");
authorDiscord.style.color = "-webkit-link";
authorDiscord.href = "https://discord.gg/YZ8b5c97nD";
authorDiscord.innerText = "Discord";

const authorName = document.createElement("a");
authorName.href = game_data.link_base_pure + "info_player&id=2172335";
authorName.setAttribute("data-title", "- Bonobobo");
authorName.innerText = "- Bonobobo";

const DesignBy = document.createElement("a");
DesignBy.href = game_data.link_base_pure + "info_player&id=2871948";
DesignBy.setAttribute("data-title", "Im Kumin");
DesignBy.innerText = "Im Kumin";


authorInfo.appendChild(document.createTextNode("Problems? Join the "));
authorInfo.appendChild(authorDiscord);
authorInfo.appendChild(document.createTextNode(" | made by "));
authorInfo.appendChild(authorName);
authorInfo.appendChild(document.createTextNode(" , UI powered by "));
authorInfo.appendChild(DesignBy);

td7.appendChild(authorInfo);

tr7.appendChild(td7);


divContent.appendChild(table)
// divContent.appendChild(divImageContent)

divScript.appendChild(divContent);


userInputParent.parentNode.insertBefore(divScript, userInputParent);

document
	.getElementById(UIIds.widgetId)
	.addEventListener('click', function () {
		handleSettingsDisplay()
	})

function handleSettingsDisplay() {
	if (globalData.minimize) {
		globalData.minimize = false
		saveLocalStorage(StorageIds.globalData, globalData)
		document.getElementById(UIIds.widgetId).src = 'graphic/minus.png'
		document.getElementById(UIIds.divContentId).style.display = 'block'
	} else {
		globalData.minimize = true
		saveLocalStorage(StorageIds.globalData, globalData)
		document.getElementById(UIIds.widgetId).src = 'graphic/plus.png'
		document.getElementById(UIIds.divContentId).style.display = 'none'
	}
}

function getLocalStorage(LS_Name) {
	const LS2Load = localStorage.getItem(LS_Name)
	if (LS2Load) {
		return JSON.parse(LS2Load)
	}
	return null
}
function saveLocalStorage(LS_Name, LS2Save) {
	if (typeof LS2Save != 'string') {
		localStorage.setItem(LS_Name, JSON.stringify(LS2Save))
	} else {
		localStorage.setItem(LS_Name, LS2Save)
	}
}
function removeLocalStorage(LS_Name) {
	localStorage.removeItem(LS_Name)
}


const getEventLoader = async() =>{
	console.info('Fetching the Event Script from the main repository.');
	$.ajax({
		type: 'GET',
		url: 'https://rawcdn.githack.com/Tribalwars-Scripts/Events/64b056aaa5c32e8352634e5e71cecf0677ea60e3/' + ScriptName.replace(' ','') + '/' + ScriptName.replace(' ','') + 'Loader.js',
		dataType: 'script',
		cache: false,
	});

	//inProgress();
	console.info(ScriptName + ' Loader successfully fetched.');
}

(async function () {
	await getEventLoader();
})();