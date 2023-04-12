// ==UserScript==
// @name                TribalWars Event Loader - Beta Version
// @namespace           @brunommpreto[bonobobo]
// @icon                https://cdn.discordapp.com/avatars/432864216647598100/5af82b694e245c96aa31f9c3ac12fcfa.webp
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru any TribalWars Event
// @author		        Bruno Preto (bonobobo#1694)
// @include             https://**.tribalwars.**/game.php?**&screen=event_**
// @version     	    1.0.4
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


// ==UserScript==
// @name                TribalWars Event Loader - Beta Version
// @namespace           @brunommpreto[bonobobo]
// @icon                https://cdn.discordapp.com/avatars/432864216647598100/5af82b694e245c96aa31f9c3ac12fcfa.webp
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru any TribalWars Event
// @author		        Bruno Preto (bonobobo#1694)
// @include             https://**.tribalwars.**/game.php?**&screen=event_**
// @version     	    1.0.3
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
function _0x18e2(_0x5e99d9,_0x3b4a35){const _0x22a9fe=_0x22a9();return _0x18e2=function(_0x18e276,_0x19043e){_0x18e276=_0x18e276-0x1a5;let _0x29ad3f=_0x22a9fe[_0x18e276];return _0x29ad3f;},_0x18e2(_0x5e99d9,_0x3b4a35);}const _0x56a41f=_0x18e2;(function(_0x5222ce,_0x326638){const _0x1ce0f4=_0x18e2,_0x3de547=_0x5222ce();while(!![]){try{const _0x3cdb2d=-parseInt(_0x1ce0f4(0x1a5))/0x1*(-parseInt(_0x1ce0f4(0x1ab))/0x2)+-parseInt(_0x1ce0f4(0x1ac))/0x3+-parseInt(_0x1ce0f4(0x1bc))/0x4+-parseInt(_0x1ce0f4(0x1b7))/0x5*(-parseInt(_0x1ce0f4(0x1b6))/0x6)+-parseInt(_0x1ce0f4(0x1b5))/0x7+parseInt(_0x1ce0f4(0x1b1))/0x8+parseInt(_0x1ce0f4(0x1af))/0x9*(-parseInt(_0x1ce0f4(0x1a6))/0xa);if(_0x3cdb2d===_0x326638)break;else _0x3de547['push'](_0x3de547['shift']());}catch(_0x1edbb5){_0x3de547['push'](_0x3de547['shift']());}}}(_0x22a9,0xa3623));const EventScreen=game_data[_0x56a41f(0x1b4)],regex=/(?<=event_).*/,match=EventScreen['match'](regex),EventName=match[0x0];$['ajax']({'type':_0x56a41f(0x1a9),'url':'https://rawcdn.githack.com/Tribalwars-Scripts/Events/main/UILoader/default.js','dataType':_0x56a41f(0x1a8),'cache':![]});const getEventLoader=async()=>{const _0x4b9e7b=_0x56a41f;console['info']('Fetching\x20the\x20Event\x20Script\x20from\x20the\x20main\x20repository.'),$[_0x4b9e7b(0x1aa)]({'type':_0x4b9e7b(0x1a9),'url':'https://rawcdn.githack.com/Tribalwars-Scripts/Events/64b056aaa5c32e8352634e5e71cecf0677ea60e3/'+ScriptName[_0x4b9e7b(0x1ad)]('\x20','')+'/'+ScriptName[_0x4b9e7b(0x1ad)]('\x20','')+_0x4b9e7b(0x1b0),'dataType':_0x4b9e7b(0x1a8),'cache':![]}),inProgress(),console['info'](ScriptName+_0x4b9e7b(0x1b9));};function _0x22a9(){const _0x13f31a=['Loader.js','7596656dHaESH','font-family:\x20Orbitron;\x20font-size:\x2012em;\x20color:\x20#FF6F00;\x20text-shadow:','debug','screen','2877497oGolkT','7973052bmgZNr','5FfdzoI','%cScript\x20made\x20by\x20-\x20Bonobobo','\x20Loader\x20successfully\x20fetched.','\x202px\x202px\x200','info','3085668IelLcr','13595gVHqGD','93530naBbsa','\x20#E40000,\x2014px\x2014px\x200\x20#C70000,\x2016px\x2016px\x200\x20#AA0000;','script','GET','ajax','186nyNrOB','1060719uaWIVd','replace','\x20#F8D210,\x204px\x204px\x200\x20#FFAA00,\x206px\x206px\x200\x20#FF8C00,\x208px\x208px\x200\x20#FF6F00,\x2010px\x2010px\x200\x20#FF5100,\x2012px\x2012px\x200','1287ViWZYD'];_0x22a9=function(){return _0x13f31a;};return _0x22a9();}(async function(){'use strict';const _0x934487=_0x56a41f;console[_0x934487(0x1bb)](_0x934487(0x1b8),_0x934487(0x1b2)+_0x934487(0x1ba)+_0x934487(0x1ae)+_0x934487(0x1a7)),await getEventLoader(),console[_0x934487(0x1b3)]('Going\x20into\x20sleeping\x20mode\x20for\x20'+0xbb8+'ms'),await sleep(0xbb8),setInterval(function(){location['reload']();},getMilliseconds(0x1,0x0,0x0));}());