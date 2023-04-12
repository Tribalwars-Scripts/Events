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


const inProgress = () => {
	const date = new Date('April 13, 2023 03:00:00');
	// Get the Unix timestamp in seconds by dividing the time value by 1000 to convert from milliseconds to seconds, and then rounding down
	const unixTimestamp = Math.floor(date.getTime() / 1000);
// Function to update the countdown timer
	function updateCountdown() {
		// Get the current timestamp in seconds
		const now = Math.floor(Date.now() / 1000);

		// Calculate the time remaining in seconds
		const timeRemaining = unixTimestamp - now;

		// Check if time has run out
		if (timeRemaining < 0) {
			clearInterval(countdownInterval);
			document.getElementById("countdown").textContent = "Script Will be live a few moments.";
			return;
		}

		// Convert the time remaining to hours, minutes, and seconds
		const hours = Math.floor(timeRemaining / 3600);
		const minutes = Math.floor((timeRemaining % 3600) / 60);
		const seconds = timeRemaining % 60;

		// Update the countdown text
		document.getElementById("countdown").textContent = `Script will be released in: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
	}

// Call the updateCountdown function every 1 second
	const countdownInterval = setInterval(updateCountdown, 1000);

}

(async function () {
	'use strict';
	const lastVersion = Object.keys(Changelog)[Object.keys(Changelog).length - 1];
	console.log(Changelog[lastVersion]);
	console.debug("Going into sleeping mode for " + 3e3 + 'ms')
	await sleep(3e3);
	inProgress();
	setInterval(function () {
		location.reload();
	}, getMilliseconds(1, 0, 0));
})();