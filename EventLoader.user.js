// ==UserScript==
// @name                TribalWars Event Loader - Beta Version
// @namespace           @brunommpreto[bonobobo]
// @icon                https://cdn.discordapp.com/avatars/432864216647598100/5af82b694e245c96aa31f9c3ac12fcfa.webp
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru any TribalWars Event
// @author		        Bruno Preto (bonobobo#1694)
// @include             https://**.tribalwars.**/game.php?**&screen=event_**
// @version     	    1.1.8
// @copyright           2023, brunommpreto (https://openuserjs.org/)
// @license             AGPL-3.0-or-later
// @supportURL          https://github.com/Tribalwars-Scripts/
// @updateURL           https://github.com/Tribalwars-Scripts/Events/raw/main/EventLoader.user.js
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// @run-at              document-end
// @require             http://code.jquery.com/jquery-1.12.4.min.js
// @require             https://raw.githubusercontent.com/Tribalwars-Scripts/Essentials/main/Defaults/helpers.min.js
// ==/UserScript==

const EventScreen=game_data.screen;const regex=/(?<=event_).*/;const match=EventScreen.match(regex);const EventName=match[0];const getUILoader=async()=>{$.ajax({type:"GET",url:"https://rawcdn.githack.com/Tribalwars-Scripts/Events/seasevent/UILoader/default.min.js?min=1",dataType:"script",cache:false})};(async function(){"use strict";await getUILoader();console.info("%cScript made by - Bonobobo","font-family: Orbitron; font-size: 12em; color: #FF6F00; text-shadow:"+" 2px 2px 0"+" #F8D210, 4px 4px 0 #FFAA00, 6px 6px 0 #FF8C00, 8px 8px 0 #FF6F00, 10px 10px 0 #FF5100, 12px 12px 0"+" #E40000, 14px 14px 0 #C70000, 16px 16px 0 #AA0000;");await sleep(1e4);console.debug("Going into sleeping mode for "+3e3+"ms");await sleep(3e3);setInterval(function(){location.reload()},getMilliseconds(1,0,0))})();