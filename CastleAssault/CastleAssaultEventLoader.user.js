// ==UserScript==
// @name                Castle Assault Event
// @namespace           @brunommpreto[bonobobo]
// @icon                https://cdn.discordapp.com/avatars/432864216647598100/5af82b694e245c96aa31f9c3ac12fcfa.webp
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru the Castle Assault Event
// @author		        Bruno Preto (bonobobo#1694)
// @include              https://**.tribalwars.**/game.php?**&screen=event_assault
// @version     	    1.0.1
// @copyright           2023, brunommpreto (https://openuserjs.org/)
// @license             AGPL-3.0-or-later
// @supportURL          https://github.com/Tribalwars-Scripts/
// @updateURL           https://github.com/Tribalwars-Scripts/Events/raw/main/CastleAssault/CastleAssaultEventLoader.user.js
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// @require             http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

/***************************** Configuration ***************************

 This is deprecated, make use of the UI instead

//*************************** Configuration *****************************/

const DEF_DELAY = 1000;
const AssaultOptions = ['naval','assault', 'catapult']

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

(function () {
    'use strict';
    console.log("-- Castle Event Script Started --");
    DoAssault().then(r => {
        let msg = "Successfully Performed  " + r  + " Assaults\n" + "Next Assault in 60 minutes."
        UI.SuccessMessage(msg, 1000);
    });
    setInterval(function wait() {
        location.reload();
        DoAssault().then(r => {
            let msg = "Successfully Performed  " + r  + " Assaults\n" + "Next Assault in 60 minutes."
            UI.SuccessMessage(msg, 1000);
        });
    }, 6e10);
})();

async function DoAssault(){
    let counter = 0;
    while ( parseInt($("#assault_energy_display")[0].innerText.split("/")[0].trim())) {
        document.querySelector('a[data-area=' + AssaultOptions[Math.floor(Math.random() * 3)] + '\]').click();
        counter++;
        await sleep(Math.floor(Math.random() * 300) + 100);
    }
    return counter;
}