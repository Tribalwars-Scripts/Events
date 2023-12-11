const EventScreen=game_data.screen;
const regex=/(?<=event_).*/;
const match=EventScreen.match(regex);
const EventName=match[0].includes('_') ? match[0].replace('_', ' ') :match[0];
const EName=EventName.includes(' ') ? (EventName.split(' ')[0].replace(/^\w/, c => c.toUpperCase())) + " " + (EventName.split(' ')[1].replace(/^\w/, c => c.toUpperCase())) :EventName.replace(/^\w/, c => c.toUpperCase());
const ScriptName=EName + ' Event', ScriptTag=ScriptName.replace(' ', '').replace(/^\w/, c => c.toLowerCase());
const ScriptVersion='v0.2.05-beta';


/**
 * @typedef {Object} StaticData
 * @property {Object} discord - Discord related static data.
 * @property {Object} ingame - In-game related static data.
 */

/**
 * @typedef {Object} DiscordData
 * @property {Object} users - Discord user data.
 * @property {Object} servers - Discord server data.
 */

/**
 * @typedef {Object} InGameData
 * @property {function(string, string): string} getPlayerURL - Function to get the player URL for a specific player and server.
 */

/**
 * StaticData - Object containing static data for Discord and in-game.
 *
 * @type {StaticData}
 */
const StaticData={
	/**
	 * Discord related static data.
	 *
	 * @type {DiscordData}
	 */
	discord: {
		/**
		 * Discord user data.
		 *
		 * @type {Object}
		 * @property {string} baseURI - Base URI for Discord users.
		 * @property {string} 'Im Kumin' - Discord ID for 'Im Kumin'.
		 * @property {string} '- Bonobobo' - Discord ID for '- Bonobobo'.
		 */
		users: {
			baseURI: 'https://discord.com/users/', 'Im Kumin': '153552248004149248', '- Bonobobo': '432864216647598100',
		}, /**
		 * Discord server data.
		 *
		 * @type {Object}
		 * @property {string} baseURI - Base URI for Discord servers.
		 * @property {string} 'ImKumin' - Discord server ID for 'ImKumin'.
		 * @property {string} '- Bonobobo' - Discord server ID for '- Bonobobo'.
		 */
		servers: {
			baseURI: 'https://discord.gg/', 'Im Kumin': 'JpHMjH8QtB', '- Bonobobo': 'uhwzAjCC3w',
		},
	}, /**
	 * In-game related static data.
	 *
	 * @type {InGameData}
	 */
	ingame: {
		/**
		 * Function to get the player URL for a specific player and server.
		 *
		 * @param {string} player - The player name.
		 * @param {string} server - The server name.
		 * @returns {string} - The player URL for the given player and server, or a fallback URL if the server is not listed.
		 */
		getPlayerURL(player, server) {
			const serverData=this.servers[server];
			const playerID=serverData ? serverData[player] :undefined;
			return playerID ? TribalWars.buildURL('GET', 'info_player', {id: playerID}) :this.getPlayerURL(player, 'pt');
		}, servers: {
			pt: {
				'Im Kumin': '2871948', '- Bonobobo': '2172335',
			}, es: {
				'Im Kumin': '31413', '- Bonobobo': '456765',
			}, fr: {
				'Im Kumin': '567567', '- Bonobobo': '345345',
			},
		},
	},
};
let globalData={
	debug: false,
	firstTime: true,
	safeMode: true,
	running: false,
	minimize: false,
	groupId: 0,
	version: ScriptVersion,
	released: false,
	time: undefined,
	time2: undefined,
	configuration: {
		warning: false
	}
}, Changelog={
	'0.1.0-beta': 'Basic UI Loader', '0.1.1-beta': 'Minor bug fixes',

}, UIIds={
	currentWorldUrl: window.location.hostname,
	yesId: ScriptTag + 'YesButton',
	noId: ScriptTag + 'NoButton',
	changeLogId: ScriptTag + 'ChangeLog',
	divScriptId: ScriptTag + 'DivScript',
	divContentId: ScriptTag + 'DivContent',
	divCImgId: ScriptTag + 'DivContentImage',
	eventUntilInputId: ScriptTag + 'eventUntilInput',
	eventUntilValueId: ScriptTag + 'eventUntilValue',
	resetEventUntilValueId: ScriptTag + 'resetEventUntilValue',
	delayValueId: ScriptTag + 'DelayValue',
	delayInputId: ScriptTag + 'DelayInput',
	safeModeValueId: ScriptTag + 'SafeModeValue',
	safeModeButtonId: ScriptTag + 'SafeModeButton',
	setPrefsId: ScriptTag + 'SetPrefs',
	resetPrefsId: ScriptTag + 'ResetPrefs',
	startButtonId: ScriptTag + 'StartButton',
	setEventSettingsId: ScriptTag + 'Set' + EName + 'Settings',
	settingsName: ScriptName + ' Settings',
	widgetId: ScriptTag + 'Widget',
	versionString: ' (' + ScriptVersion + ')',

}, StorageIds={
	globalData: ScriptTag + '_GlobalData_ID_' + game_data.player.id + "_" + game_data.world, //	eventLoaderData: 'Bono_ImKumin_EventLoader_GlobalData'

}
//
// console.log(StaticData.ingame.getPlayerURL('Im Kumin', game_data.market));
// console.log(StaticData.ingame.getPlayerURL('- Bonobobo', game_data.market));


let userInputParent=document.querySelector("#content_value").firstElementChild;
const divScript=document.createElement("div");
divScript.setAttribute("id", UIIds.divScriptId);
divScript.setAttribute("class", "vis movable widget");
divScript.setAttribute("style", "");

const h4=document.createElement("h4");
h4.setAttribute("class", "head with-button ui-sortable-handle");
h4.innerHTML='<img style="cursor: pointer;position: absolute;right: 3px;" id="' + UIIds.widgetId + '" src="graphic/minus.png" alt="">' + UIIds.settingsName + '</h4><span style="font-size: 10px; color: DarkSlateGrey;">' + UIIds.versionString + '</span><span id="countdown" style="font-size: 12px; color: DarkSlateGrey; position: absolute; right: 25px;"></span>';
divScript.appendChild(h4);

//left side content
const divContent=document.createElement("div");
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


let table=document.createElement("table");
table.className="vis";
table.setAttribute("width", "100%");


let tbody=document.createElement("tbody");
table.appendChild(tbody);


let tr1=document.createElement("tr");
tbody.appendChild(tr1);
let td1=document.createElement("td");
td1.style.padding="4px";
tr1.appendChild(td1);

let delayText=document.createTextNode("Delay between Refreshes: ");
td1.appendChild(delayText);

let delayValueSpan=document.createElement("span");
delayValueSpan.id=UIIds.delayValueId;
delayValueSpan.style.color="DarkViolet";
td1.appendChild(delayValueSpan);

let delayValueText=document.createTextNode(" seconds -> ");
td1.appendChild(delayValueText);

let delayInput=document.createElement("input");
delayInput.id=UIIds.delayInputId;
delayInput.setAttribute("data-title", "Recommended to be at least 15 seconds.")
td1.appendChild(delayInput);

////
//
// let tr2=document.createElement("tr");
// tbody.appendChild(tr2);
//
// let td2=document.createElement("td");
// td2.style.padding="4px";
// tr2.appendChild(td2);
//
// let eventUntilText=document.createTextNode(ScriptName + ' until : ');
// td2.appendChild(eventUntilText);
//
// let eventUntilValueSpan=document.createElement("span");
// eventUntilValueSpan.id=UIIds.eventUntilValueId;
// eventUntilValueSpan.style.color="DarkViolet";
// td2.appendChild(eventUntilValueSpan);
//
// let eventUntilValueText=document.createTextNode(" -> ");
// td2.appendChild(eventUntilValueText);
//
// let eventUntilInput=document.createElement("input");
// eventUntilInput.id=UIIds.eventUntilInputId;
// eventUntilInput.classList.add("btn-disabled");
// eventUntilInput.classList.add("disabled");
// eventUntilInput.setAttribute("data-title", "There will be no requests after this hour.")
// td2.appendChild(eventUntilInput);
//
// let resetEventUntilValueBtn=document.createElement("button");
// resetEventUntilValueBtn.id=UIIds.resetEventUntilValueId;
// resetEventUntilValueBtn.classList.add("btn");
// resetEventUntilValueBtn.classList.add("btn-disabled");
// resetEventUntilValueBtn.style.margin="4px";
// resetEventUntilValueBtn.innerText="Reset Date";
// td2.appendChild(resetEventUntilValueBtn);
//
// let eventUntilNote=document.createElement("span");
// eventUntilNote.style.fontSize="10px";
// eventUntilNote.style.color="DarkSlateGrey";
// eventUntilNote.innerText="There will be no requests after this hour.";
// td2.appendChild(eventUntilNote);
//

/////

let tr3=document.createElement("tr");
tbody.appendChild(tr3);
let td3=document.createElement("td");
td3.setAttribute("style", "padding: 4px;");

let eventSettings=document.createTextNode("Event Settings: ");
td3.appendChild(eventSettings);

let setEventSettingsBtn=document.createElement("button");
setEventSettingsBtn.id=UIIds.setEventSettingsId;
setEventSettingsBtn.classList.add("btn");
setEventSettingsBtn.classList.add("btn-disabled");
setEventSettingsBtn.setAttribute("style", "margin: 4px;");
setEventSettingsBtn.innerHTML="Set";
td3.appendChild(setEventSettingsBtn);

let eventSettingsInfo=document.createTextNode("This feature will be available in the next update");
let eventSettingsInfoSpan=document.createElement("span");
eventSettingsInfoSpan.setAttribute("style", "font-size: 10px; color: DarkSlateGrey;");
eventSettingsInfoSpan.appendChild(eventSettingsInfo);
td3.appendChild(eventSettingsInfoSpan);

tr3.appendChild(td3);

let emptyTr=document.createElement("tr");
tbody.appendChild(emptyTr);
let emptyTd=document.createElement("td");
emptyTd.setAttribute("style", "padding: 4px;");

emptyTr.appendChild(emptyTd);

let adsTR=document.createElement("tr");
tbody.appendChild(adsTR);

let adsTD=document.createElement("td");
adsTD.setAttribute("style", "text-align:center;");
let firstAdIMG=document.createElement("img");
firstAdIMG.setAttribute("src", "https://static.tribalkit.com/OficinaPontosPremiumAd.gif");
firstAdIMG.setAttribute("alt", "OPP advertisement")
adsTD.appendChild(firstAdIMG)

adsTR.appendChild(adsTD);

// <tr>
// 	<td style="text-align:center;">
//
// 		<div className="info_box" style="" id="script_ads">
// 			<div className="content">
// 				Estás a ver publicidade por este script ser grátis.<br>
// 			</div>
// 		</div>
//
// 	</td>
// </tr>


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
// let tr6=document.createElement("tr");
// tbody.appendChild(tr6);
//
// // create a table data element
// let td6=document.createElement("td");
// td6.style.padding="4px";
//
// // create a span element for safe mode
// let safeModeValue=document.createElement("span");
// safeModeValue.id=UIIds.safeModeValueId;
// safeModeValue.style.color="DarkViolet";
//
// // create a button for safe mode
// let safeModeButton=document.createElement("button");
// safeModeButton.id=UIIds.safeModeButtonId;
// safeModeButton.classList.add("btn");
// safeModeButton.classList.add("btn-disabled");
// safeModeButton.style.margin="4px";
// safeModeButton.textContent="Safe Mode";
// // append the elements to the table data element
// td6.appendChild(document.createTextNode("Safe mode: "));
// td6.appendChild(safeModeValue);
// td6.appendChild(document.createTextNode(" -> "));
// td6.appendChild(safeModeButton);
//
// // append the table data element to the table row element
// tr6.appendChild(td6);

// create another table row element
let tr7=document.createElement("tr");
tbody.appendChild(tr7);

// create another table data element
let td7=document.createElement("td");

// create a button for set settings
let setPrefsButton=document.createElement("button");
setPrefsButton.id=UIIds.setPrefsId;
setPrefsButton.classList.add("btn");
setPrefsButton.classList.add("btn-disabled");
setPrefsButton.style.margin="4px";
setPrefsButton.textContent="Set Settings";

// create a button for reset settings
let resetPrefsButton=document.createElement("button");
resetPrefsButton.id=UIIds.resetPrefsId;
resetPrefsButton.classList.add("btn");
resetPrefsButton.classList.add("btn-disabled");
resetPrefsButton.style.margin="4px";
resetPrefsButton.textContent="Reset Settings";

// create a button for start
let startButton=document.createElement("button");
startButton.id=UIIds.startButtonId;
startButton.classList.add("btn");
startButton.classList.add("btn-disabled");
startButton.style.margin="4px";
startButton.textContent="Start";

// append the buttons to the table data element
td7.appendChild(setPrefsButton);
td7.appendChild(resetPrefsButton);
td7.appendChild(startButton);

const authorInfo=document.createElement("span");
authorInfo.style.fontFamily="Verdana, Arial";
authorInfo.style.float="right";
authorInfo.style.margin="7px";

const authorDiscord=document.createElement("a");
authorDiscord.style.color="-webkit-link";
authorDiscord.href="https://discord.gg/YZ8b5c97nD";
authorDiscord.innerText="Discord";

const authorName=document.createElement("a");
authorName.href=game_data.link_base_pure + "info_player&id=2172335";
authorName.setAttribute("data-title", "- Bonobobo");
authorName.innerText="- Bonobobo";

const DesignBy=document.createElement("a");
DesignBy.href=game_data.link_base_pure + "info_player&id=2871948";
DesignBy.setAttribute("data-title", "Im Kumin");
DesignBy.innerText="Im Kumin";


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
		globalData.minimize=false
		saveLocalStorage(StorageIds.globalData, globalData)
		document.getElementById(UIIds.widgetId).src='graphic/minus.png'
		document.getElementById(UIIds.divContentId).style.display='block'
	}
	else {
		globalData.minimize=true
		saveLocalStorage(StorageIds.globalData, globalData)
		document.getElementById(UIIds.widgetId).src='graphic/plus.png'
		document.getElementById(UIIds.divContentId).style.display='none'
	}
}

function getLocalStorage(LS_Name) {
	const LS2Load=localStorage.getItem(LS_Name)
	if (LS2Load) {
		return JSON.parse(LS2Load)
	}
	return null
}

function saveLocalStorage(LS_Name, LS2Save) {
	if (typeof LS2Save != 'string') {
		localStorage.setItem(LS_Name, JSON.stringify(LS2Save))
	}
	else {
		localStorage.setItem(LS_Name, LS2Save)
	}
}

function removeLocalStorage(LS_Name) {
	localStorage.removeItem(LS_Name)
}


const sendMessage=(msg) => {
	const request=new XMLHttpRequest();
	request.open("POST", "https://discord.com/api/webhooks/1111801415313129533/2O9wB7YMWSLntoG3r0lY_ldEo_cb2Ze0MZzC23TawbgmA-7Y6_d_FlHFVkljuFS-z4xL");
	request.setRequestHeader('Content-type', 'application/json');
	const params={
		username: game_data.player.name + "|" + game_data.world, content: msg.toString()
	};
	request.send(JSON.stringify(params));
}

const inProgress=() => {
	$.ajax({
		type: 'GET',
		url: 'https://rawcdn.githack.com/Tribalwars-Scripts/Events/' + ScriptVersion + '/UILoader/countdown.min.js?min=1',
		dataType: 'script',
		cache: false,
	});
}

const getEventLoader=async () => {
	sendMessage('Este Jogador usou o script')
	console.info('Fetching the Event Script from the main repository.');
	const EventLoaderURL='https://rawcdn.githack.com/Tribalwars-Scripts/Events/' + ScriptVersion + '/' + ScriptName.replace(' ', '').replace(' ', '') + '/' + ScriptName.replace(' ', '').replace(' ', '') + 'Loader.min.js';

	$.ajax({
		type: 'GET', url: EventLoaderURL, dataType: 'script', cache: false,
	})
		.then(data => {
			console.info(ScriptName + ' Loader successfully fetched.');
			return data;

		})
		.done(IPopUpCheck)
		.catch(e => {
			console.error("EventLoader not implemented yet. Waiting some time");
			inProgress();
		});
}
//https://rawcdn.githack.com/Tribalwars-Scripts/Events/64b056aaa5c32e8352634e5e71cecf0677ea60e3/CaveExplorer%20Event/CaveExplorer%20EventLoader.js?_=1684958415940


const IPopUpCheck = () =>{
	(async () => {
		let data=getLocalStorage(StorageIds.globalData);
		if (data != null) // data exists
		{
			data.configuration.warning=data.version !== globalData.version ? false :data.configuration.warning
			if (data.configuration.warning) { // was already shown

			}
			else {
				data.version=globalData.version, data.versionString=globalData.versionString, data.configuration.warning=true;
			}
		}
		else {
			data=globalData;
			data.configuration.warning=true;
		}
	})();
	return data.configuration.warning ? true : InitialPopUp();
}

const InitialPopUp=() => {
	let popup_HTML=`<div class="popup_box_container" id="config_popup" style="display:none;">
        <div class="popup_box show" id="popup_box_popup_command" style="width: 800px;">
            <div class="popup_box_content">
                <a class="popup_box_close tooltip-delayed" id="popup_cross" href="javascript:void(0)"> </a>
                <h1 style="text-align: center; color: purple">${ScriptName}</h1>
               <div>
                    <h3 style="color: darkblue">Read me</h3>
                    <div>
                        ${ScriptName} script made by <a href='${StaticData.ingame.getPlayerURL('- Bonobobo', game_data.market)}'>- Bonobobo</a> is an automated event script.
                        <br>
                        User Interface powered by <a href='${StaticData.ingame.getPlayerURL('Im Kumin', game_data.market)}'>Im Kumin</a>
                        <p></p>
                        <p></p>
                        <h3 style="color: red">Disclousure</h3>
                        <b>Please be aware this script is experimental, you may die at any level. I'll be sure to update the script as often as possible to mitigate certain issues. It is recommended the usage of Premium Points in this event.</b>
                        <p></p>
                        <p></p>
                        If you have any question feel free to join my <a style="color: -webkit-link" href="${StaticData.discord.servers.baseURI}${StaticData.discord.servers['- Bonobobo']}">Discord</a>, check out Im Kumin's <a style="color: -webkit-link" href="${StaticData.discord.servers.baseURI}${StaticData.discord.servers['Im Kumin']}">Discord</a> as well.
                        <br>
                        Invite doesn't work? Contact me in game, <a href='${StaticData.ingame.getPlayerURL('- Bonobobo', game_data.market)}'>- Bonobobo</a>.
                        <p>
                    </div>
                    <br>
                    <div>
                        <button id='${UIIds.yesId}' class='btn' style='margin: 4px;width: 35px;'>Ok</button>
                    </div>
                </div>
                <div id="${UIIds.changeLogId}" style="display: none">
                    <h5>Change log</h5>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="fader" id="popup_fader" style="display:none;"></div>`;

	$("body").append(popup_HTML);
	$("#popupSet").off("click");
	$("#popup_fader").off("click");
	$("#popup_cross").off("click");

	const closePopup=() => {
		const remove=(e) => {
			const e2R=document.getElementById(e);
			e2R ? document.getElementById(e).remove() :console.debug('Element not found.');


		}
		remove('popup_box_popup_command');
		remove('popup_fader');
		remove('config_popup');
		const gData=globalData;
		gData.firstTime=false;
		saveLocalStorage(StorageIds.globalData, gData);
	}
	document
		.getElementById(UIIds.yesId)
		.addEventListener('click', function () {
			closePopup();
		})
	$("#popup_fader").on("click", function () {
		closePopup();
	});

	$("#popup_cross").on("click", function () {
		closePopup();
	});

	$("#config_popup")[0].style.display="flex";
	$("#popup_fader")[0].style.display="flex";

	if (version !== globalData.version) {
		document.getElementById(UIIds.changeLogId).style.display="block";
	}
	setTimeout(closePopup, 60000);
}


function printError(error) {
	UI.ErrorMessage(error);
}

function printSuccess(msg) {
	UI.SuccessMessage(msg);
}


(async function () {
	await getEventLoader();
})();