// ==UserScript==
// @name                Dragon Event Testing
// @namespace           @brunommpreto[bonobobo]
// @icon                https://dspt.innogamescdn.com/asset/d89e00c7/graphic/favicon.png
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru the Dragon Event
// @author		        Bruno Preto
// @match               https://*.tribalwars.com.pt/game.php?*village=*&screen=event_dragons
// @version     	    0.0.1
// @copyright           2022, brunommpreto (https://openuserjs.org/)
// @version             0.0.1
// @license             AGPL-3.0-or-later
// @supportURL
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// @require             http://code.jquery.com/jquery-1.12.4.min.js
// @run-at              document-end
// ==/UserScript==

//*************************** Configuration ***************************//


//*************************** /Configuration ***************************//
let nIntervId = 0;
let tIntervID = 0;
let interaction = 0;
const DEF_DELAY = 1000;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

function getMiliseconds(hrs, min, sec) {
	return ((hrs * 60 * 60 + min * 60 + sec) * 1000);
}

let PBLoader=function(){let appendTo="#main_body";let RewardMessage="Sample Reward Message";let PBaction=["Running","Tests"];let PBlength=0;let index=0;function startLoader(appendTo=getAppendTo(),length=getLength()){console.group("Starting Loader");let width=$(appendTo)[0].clientWidth;const PBhtml=`
<div id="progressbar" class="progress-bar progress-bar-alive">
    <span class="count label">0/${length}</span>
    <div id="progress"><span class="count label" style="width: ${width}px;">0/${length}</span></div>
</div>`;$(appendTo).eq(0).prepend(PBhtml);console.log("Loader is loaded");console.groupEnd()}function loaded(num=getIndex(),length=getLength(),action=getAction()){index=num+1;$("#progress").css("width",`${(num+1)/length*100}%`);$(".count").text(`${action[0]} ${num+1} / ${length}  ${action[1]}.`)}function endLoader(RewardMessage=getRewardMessage()){const progressBar=$("#progressbar");if(progressBar.length>0&&progressBar.width()===progressBar.parent().width()){progressBar.remove();UI.BanneredRewardMessage(RewardMessage,1e4)}}function setAppendTo(eID,type="#"){appendTo=type+eID}function setLength(length){PBlength=length}function setAction(actionArr){PBaction=actionArr}function setRewardMessage(RewardMSG){RewardMessage=RewardMSG}function getLength(){return PBlength}function getIndex(){return index}function getAction(){return PBaction}function getRewardMessage(){return RewardMessage}function getAppendTo(){return appendTo}return{startLoader:startLoader,loaded:loaded,endLoader:endLoader,setAppendTo:setAppendTo,setLength:setLength,setRewardMessage:setRewardMessage,setAction:setAction,getLength:getLength,getAction:getAction,getIndex:getIndex}}();

function reloadAfterInterval() {
	const reloadTime = getMiliseconds(1, 10, 0); // 1 hour in milliseconds
	const elapsedTime = Timing.getElapsedTimeSinceLoad();
	elapsedTime > reloadTime ? location.reload() : setTimeout(reloadAfterInterval, 1000);
}

function getRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

(async function () {
	'use strict';
	console.log("-- Dragon Event Script Started --");

	try {
		//await getPBLoader(); // Wait until ProgressBarLoader.min.js is loaded
		await sleep(5e3);
		await RollDice();
		reloadAfterInterval();
	} catch (error) {
		console.error("Error occurred:", error);
	}
})();

const DragonE={
	rollDice: async function () {
		return new Promise((resolve, reject) => {
			let serverResponse={}
			TribalWars.post(
				"event_dragons",
				{ajaxaction: "roll"},
				{},
				function (t) {
					serverResponse=t;
					DragonsEvent._setDiceUIRolling(!1, t);
					DragonsEvent.parseAjaxData(t);
					DragonsEvent.animateCounter(t.rolls);
					DragonsEvent.handleActions(t, 0);
				},
				function () {
					DragonsEvent._setDiceUIRolling(!1, {rolls: [ 0, 0, 0 ]});
					DragonsEvent.coin_moving= !1;
					reject("Something went wrong"); // Reject the promise with the error object t
				}
			);
			resolve(serverResponse); // Resolve the promise with the server response
		});
	},
};

async function RollDice() {
	const getDices = () => {return Number(document.getElementById("dragons_energy_display").textContent.split('/')[0].trim())}
	const condition2check = (index = Math.floor(Math.random() * (3 - 0 + 1)) + 0) => [...[Timing.getElapsedTimeSinceData(), Timing.getElapsedTimeSinceLoad(), Timing.getCurrentServerTime(), Date.now()]][index];

	PBLoader.setLength(getDices());
	PBLoader.setAppendTo('event-container', '.');
	PBLoader.setAction(['Dice roll', 'rolls']);
	PBLoader.startLoader();
	while (getDices() > 0) {
		if (condition2check() % 2) {
			await sleep(getRandomNumber(200,300));
			await DragonE.rollDice();
			PBLoader.loaded();
			await sleep(getRandomNumber(200,300));
		}
		await sleep(getRandomNumber(150,350));
	}
	PBLoader.setRewardMessage("Successfully rolled " + PBLoader.getLength() + " times.");
	PBLoader.getLength() ? PBLoader.endLoader() : console.info("Nothing to roll, ignoring");
}