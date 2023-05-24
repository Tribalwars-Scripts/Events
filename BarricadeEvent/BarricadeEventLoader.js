// ==UserScript==
// @name                Barricade Event
// @namespace           @brunommpreto[bonobobo]
// @icon                https://cdn.discordapp.com/avatars/432864216647598100/5af82b694e245c96aa31f9c3ac12fcfa.webp
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru the Castle Assault Event
// @author		        Bruno Preto (bonobobo#1694)
// @include             https://**.tribalwars.**/game.php?**&screen=event_barricade**
// @version     	    1.0.0
// @copyright           2023, brunommpreto (https://openuserjs.org/)
// @license             AGPL-3.0-or-later
// @supportURL          https://github.com/Tribalwars-Scripts/
// @updateURL           https://github.com/Tribalwars-Scripts/Events/raw/main/EventBarricade/EventBarricadeLoader.js
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// @run-at              document-end
// @require             http://code.jquery.com/jquery-1.12.4.min.js
// @require             https://raw.githubusercontent.com/Tribalwars-Scripts/Essentials/main/Defaults/helpers.min.js
// ==/UserScript==

const Changelog={
	"1.0.0": "Initial Script",
}

/***************************** Configuration ***************************

 This is deprecated, make use of the UI instead

 //*************************** Configuration *****************************/

// Set up initial variables

const Units=[ 'skirmisher', 'longbow', 'bill', 'knight', 'pike' ];
const UnitsInfo = {
	skirmisher: {
		id: "skirmisher",
		strength: 14,
		damage_bonuses: [
			{ unit_type_id: "knight", percent_increase: 50 },
			{ unit_type_id: "longbow", percent_increase: 25 }
		]
	},
	longbow: {
		id: "longbow",
		strength: 13,
		damage_bonuses: [{ unit_type_id: "pike", percent_increase: 50 }]
	},
	bill: {
		id: "bill",
		strength: 12,
		damage_bonuses: [
			{ unit_type_id: "skirmisher", percent_increase: 50 },
			{ unit_type_id: "longbow", percent_increase: 25 }
		]
	},
	knight: {
		id: "knight",
		strength: 16,
		damage_bonuses: [{ unit_type_id: "bill", percent_increase: 50 }]
	},
	pike: {
		id: "pike",
		strength: 20,
		damage_bonuses: [
			{ unit_type_id: "skirmisher", percent_increase: 50 },
			{ unit_type_id: "bill", percent_increase: 25 }
		]
	}
};

const calculateBattleUnits = (playerUnits, board) => {
	const calculatedUnits = {};
	const unitsModel = {
		"skirmisher": { "strength": 14 },
		"longbow": { "strength": 13 },
		"bill": { "strength": 12 },
		"knight": { "strength": 16 },
		"pike": { "strength": 20 },
	};

	// Get the attacker_unit_capacity from the board object
	const maxUnits = board.attacker_unit_capacity;

	// Calculate the total units available for all unit types
	let totalUnits = 0;

	// Loop through each unit type in the board.unit_counts object
	for (const unitType in board.unit_counts) {
		// Get the player's available unit count for the current unit type
		const availableUnits = playerUnits.unit_pools[unitType].count_owned -  playerUnits.unit_pools[unitType].count_wounded;

		// Calculate the unit count to send to battle (minimum of availableUnits and maxUnits)
		const unitsToSend = Math.min(availableUnits, maxUnits - totalUnits);

		// Store the calculated unit count in the result object
		calculatedUnits[unitType] = unitsToSend;

		// Add the calculated unit count to the total units
		totalUnits += unitsToSend;
	}

	return calculatedUnits;
};

// Example usage
const playerUnits = {
	unit_pools: {
		skirmisher: { unit_type: "skirmisher", count_owned: 965, count_wounded: 0 },
		longbow: { unit_type: "longbow", count_owned: 965, count_wounded: 0 },
		bill: { unit_type: "bill", count_owned: 955, count_wounded: 0 },
		knight: { unit_type: "knight", count_owned: 421, count_wounded: 89 },
		pike: { unit_type: "pike", count_owned: 284, count_wounded: 0 },
	},
};

const board = {
	id: 2,
	flavor_text: '"Protejam o barão. Não desistam!"',
	attacker_unit_capacity: 720,
	unlock_time: 1681481462,
	unit_counts: {
		skirmisher: 0,
		longbow: 450,
		bill: 0,
		knight: 450,
		pike: 0,
	},
};

const calculatedUnits = calculateBattleUnits(playerUnits, board);

console.log(calculatedUnits); // Example output: { skirmisher: 365, longbow: 365, bill: 0, knight: 0, pike: 0 }


const player_units: {
	unit_pools: {
		skirmisher:     { unit_type: "skirmisher", count_owned: 965, count_wounded: 0 },
		longbow: {unit_type: "longbow", count_owned: 965, count_wounded: 0 },
		bill: { unit_type: "bill", count_owned: 955, count_wounded: 0 },
		knight: { unit_type: "knight", count_owned: 421, count_wounded: 89 },
		pike: { unit_type: "pike", count_owned: 284, count_wounded: 0 }
	}
}

const board: {
	stages:  {
		1: { id: 1, flavor_text: '"Pára! Quem vem aí?"', attacker_unit_capacity: 288, ... },
		2    : {
			id: 2,
			flavor_text  :  '"Protejam o barão. Não desistam!"',
			attacker_unit_capacity:    720,
			unlock_time:    1681481462,
			unit_counts: {
				skirmisher:    0,
				longbow:    450,
				bill:    0,
				knight:    450,
				pike:    0
			}
		}}}
// const Units=[
// 	"halberd",
// 	"morningstar",
// 	"bigaxe",
// 	"crossbow",
// 	"knives",
// 	"hammer",
// 	"scimitar"
// ];
//
// //Default Slotting
// const UnitsSlots = () =>{
// 	return [
// 		[ ...Units ],
// 		[ ...Units ],
// 		[ ...Units ],
// 		[ ...Units ],
// 		[ ...Units ],
// 	]
// };


const inProgress=() => {
	const date=new Date('April 13, 2023 03:00:00');
	// Get the Unix timestamp in seconds by dividing the time value by 1000 to convert from milliseconds to seconds, and then rounding down
	const unixTimestamp=Math.floor(date.getTime() / 1000);

// Function to update the countdown timer
	function updateCountdown() {
		// Get the current timestamp in seconds
		const now=Math.floor(Date.now() / 1000);

		// Calculate the time remaining in seconds
		const timeRemaining=unixTimestamp - now;

		// Check if time has run out
		if (timeRemaining < 0) {
			clearInterval(countdownInterval);
			document.getElementById("countdown").textContent="Script Will be live a few moments.";
			return;
		}

		// Convert the time remaining to hours, minutes, and seconds
		const hours=Math.floor(timeRemaining / 3600);
		const minutes=Math.floor((timeRemaining % 3600) / 60);
		const seconds=timeRemaining % 60;

		// Update the countdown text
		document.getElementById("countdown").textContent=`Script will be released in: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
	}

// Call the updateCountdown function every 1 second
	const countdownInterval=setInterval(updateCountdown, 1000);

}

console.log("I AM GOD AND U ARE SHIT.");

(async function () {
	'use strict';
	const lastVersion=Object.keys(Changelog)[Object.keys(Changelog).length - 1];
	console.log(Changelog[lastVersion]);
	console.debug("Going into sleeping mode for " + 3e3 + 'ms')
	await sleep(3e3);
	inProgress();
	setInterval(function () {
		location.reload();
	}, getMilliseconds(1, 0, 0));
})();