// ==UserScript==
// @name                Castle Assault Event
// @namespace           @brunommpreto[bonobobo]
// @icon                https://cdn.discordapp.com/avatars/432864216647598100/5af82b694e245c96aa31f9c3ac12fcfa.webp
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru the Castle Assault Event
// @author		        Bruno Preto (bonobobo#1694)
// @match               https://*.tribalwars.com.pt/game.php?*village=*&screen=event_assault*
// @version     	    1.0.0
// @copyright           2023, brunommpreto (https://openuserjs.org/)
// @license             AGPL-3.0-or-later
// @supportURL          https://github.com/Tribalwars-Scripts/
// @updateURL           https://raw.githubusercontent.com/Tribalwars-Scripts/Events/CastleAssault/CastleAssaultEventLoader.js
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}