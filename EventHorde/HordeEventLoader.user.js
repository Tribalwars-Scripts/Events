// ==UserScript==
// @name                Horde Event - Beta
// @namespace           @brunommpreto[bonobobo]
// @icon                https://cdn.discordapp.com/avatars/432864216647598100/5af82b694e245c96aa31f9c3ac12fcfa.webp
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru the Horde Event
// @author		        Bruno Preto (bonobobo#1694)
// @include             https://**.tribalwars.**/game.php?**&screen=event_horde**
// @version     	    1.0.3
// @copyright           2023, brunommpreto (https://openuserjs.org/)
// @license             AGPL-3.0-or-later
// @supportURL          https://github.com/Tribalwars-Scripts/
// @updateURL           https://github.com/Tribalwars-Scripts/Events/raw/main/EventHorde/HordeEventLoader.user.js
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// @run-at              document-end
// @require             http://code.jquery.com/jquery-1.12.4.min.js
// @require             https://raw.githubusercontent.com/Tribalwars-Scripts/Essentials/main/Defaults/helpers.min.js
// ==/UserScript==

const EventScreen=game_data.screen;
const regex=/(?<=event_).*/;
const match=EventScreen.match(regex);
const EventName=match[0];

const Changelog={
	"1.0.0": "Initial Script",
	"1.0.1": "Fixed Subarray bug",
	"1.0.2": "Now it takes into account the blacklisted array",
	"1.0.3": "Minor bug in starting a new puzzle"
}

/***************************** Configuration ***************************

 This is deprecated, make use of the UI instead

 //*************************** Configuration *****************************/

// Set up initial variables

const Units=[
	"halberd",
	"morningstar",
	"bigaxe",
	"crossbow",
	"knives",
	"hammer",
	"scimitar"
];

//Default Slotting
const UnitsSlots = () =>{
	return [
		[ ...Units ],
		[ ...Units ],
		[ ...Units ],
		[ ...Units ],
		[ ...Units ],
	]
};

const remainingSlots=(DefaultUnits, Blacklisted) => {
	console.group("Calculating the diferences between the two arrays")
	if (Blacklisted.length === 0){
		console.debug("Disabled Units is a empty array => 1ºs time running the Script")
	}else{
		console.debug("Disabled Units is not an empty array;")
	}
	console.groupEnd();
	return (Blacklisted.length > 0 ) ? ( DefaultUnits.map((unitSlots, i) => {
		const blacklist = Blacklisted[i] || []; // Handle case where no blacklist is provided
		return unitSlots.filter((unit) => !blacklist.includes(unit));
	})) : DefaultUnits;
};

const FillSlots = async(_Units) => {
	console.group("Filling Slots function")
	console.debug("Original Array Input")
	console.dir(_Units)
	const DataSet = remainingSlots(_Units, EventHorde.disabled_unit_ids);
	const data = [];
	console.debug("New Dataset");
	console.dir(DataSet);
	for (let i=0; i < _Units.length; i++) {
		// Choose a random unit from the troops array
		const slot_X = $('#slot_' + i.toString())
		let unit =  DataSet[i][Math.floor(Math.random() * DataSet[i].length)];
		console.debug("Slot_" + i.toString() + " : " + unit);
		$('#horde_attempt')[0][i].value = unit;
		// console.debug("Fixed Unit for the Slot_" + i.toString() + " : " + $('#horde_attempt')[0][i].value);
		data.push($('#horde_attempt')[0][i].value)
		await sleep(3e2);
	}
	console.debug("Submitting the array: ");
	console.dir(data)
	await sleep(5e2);
	EventHorde.submitAttempt();
	console.groupEnd();
};

(async function () {
	'use strict';
	console.info('%cScript made by - Bonobobo', 'font-family: Orbitron; font-size: 12em; color: #FF6F00; text-shadow:' +
		' 2px 2px 0' +
		' #F8D210, 4px 4px 0 #FFAA00, 6px 6px 0 #FF8C00, 8px 8px 0 #FF6F00, 10px 10px 0 #FF5100, 12px 12px 0 #E40000, 14px 14px 0 #C70000, 16px 16px 0 #AA0000;')

	console.debug("-- Horde Event Script Started --");
	const lastVersion = Object.keys(Changelog)[Object.keys(Changelog).length - 1];
	console.log(Changelog[lastVersion]);
	console.debug("Going into sleeping mode for " + 3e3 + 'ms')
	await sleep(3e3);
	DoHording().then(r => {
		UI.BanneredRewardMessage('Used ' + r + ' Attackplans. Next Attack in 60 minutes.', 1000);
	});
	setInterval(function () {
		location.reload();
		DoHording().then(r => {

			UI.BanneredRewardMessage('Used ' + r + ' Attackplans. Next Attack in 60 minutes.', 1000);

		});
	}, getMilliseconds(1, 0, 0));
})();


const getEnergy=() => {
	return Number(EventHorde.player_energies[EventHorde.energy_id].getValue());
}

async function DoHording() {
	const snapshotE=getEnergy();
	while (getEnergy() > 0) {
		if (document.getElementsByClassName('horde-slot horde-red-border horde-green').length === 5) {
			console.info('Puzzle finished ! ');
			console.debug('Checking if there\'s enough energy to start a new one.')
			if (getEnergy() - 2) {
				EventHorde.startNewPuzzle();
				console.info('New Puzzle created.')
			}
			console.debug("Going into sleeping mode for " + 5e2 + 'ms')
			await sleep(5e3);
		}
		else {
			await FillSlots(UnitsSlots());
			await sleep(5e2);
		}
	}
	return snapshotE;
}