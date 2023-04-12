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


const _0x4cdd84=_0x4a1d;(function(_0x47bb3c,_0x1d5795){const _0x152575=_0x4a1d,_0x22fd38=_0x47bb3c();while(!![]){try{const _0x564db5=-parseInt(_0x152575(0xac))/0x1+parseInt(_0x152575(0x9f))/0x2+parseInt(_0x152575(0x98))/0x3*(-parseInt(_0x152575(0xa4))/0x4)+parseInt(_0x152575(0xa5))/0x5+-parseInt(_0x152575(0xab))/0x6*(-parseInt(_0x152575(0x99))/0x7)+-parseInt(_0x152575(0x97))/0x8*(-parseInt(_0x152575(0xa7))/0x9)+-parseInt(_0x152575(0xa1))/0xa;if(_0x564db5===_0x1d5795)break;else _0x22fd38['push'](_0x22fd38['shift']());}catch(_0xda1818){_0x22fd38['push'](_0x22fd38['shift']());}}}(_0x21c8,0xf1d47));function _0x21c8(){const _0x1f17b6=['\x20#F8D210,\x204px\x204px\x200\x20#FFAA00,\x206px\x206px\x200\x20#FF8C00,\x208px\x208px\x200\x20#FF6F00,\x2010px\x2010px\x200\x20#FF5100,\x2012px\x2012px\x200','ajax','84IiYwRG','6220045BUrDNO','\x20#E40000,\x2014px\x2014px\x200\x20#C70000,\x2016px\x2016px\x200\x20#AA0000;','108LPKUwF','font-family:\x20Orbitron;\x20font-size:\x2012em;\x20color:\x20#FF6F00;\x20text-shadow:','\x20Loader\x20successfully\x20fetched.','%cScript\x20made\x20by\x20-\x20Bonobobo','151512qXhgSB','617998sZrxFN','debug','GET','Fetching\x20the\x20Event\x20Script\x20from\x20the\x20main\x20repository.','233248NUgiph','156669WCckbk','483wtuNLs','Loader.js','info','match','https://rawcdn.githack.com/Tribalwars-Scripts/Events/main/','Going\x20into\x20sleeping\x20mode\x20for\x20','2899370DEAJWS','screen','20807380PQhwcv'];_0x21c8=function(){return _0x1f17b6;};return _0x21c8();}function _0x4a1d(_0x39f909,_0x269a2b){const _0x21c8f7=_0x21c8();return _0x4a1d=function(_0x4a1d5f,_0x48e4b0){_0x4a1d5f=_0x4a1d5f-0x95;let _0x26ab4b=_0x21c8f7[_0x4a1d5f];return _0x26ab4b;},_0x4a1d(_0x39f909,_0x269a2b);}const EventScreen=game_data[_0x4cdd84(0xa0)],regex=/(?<=event_).*/,match=EventScreen[_0x4cdd84(0x9c)](regex),EventName=match[0x0];$[_0x4cdd84(0xa3)]({'type':'GET','url':'https://rawcdn.githack.com/Tribalwars-Scripts/Events/main/UILoader/default.js','dataType':'script','cache':![]}),(async function(){'use strict';const _0x18afc3=_0x4cdd84;console[_0x18afc3(0x9b)](_0x18afc3(0xaa),_0x18afc3(0xa8)+'\x202px\x202px\x200'+_0x18afc3(0xa2)+_0x18afc3(0xa6)),console[_0x18afc3(0x9b)](_0x18afc3(0x96)),$[_0x18afc3(0xa3)]({'type':_0x18afc3(0x95),'url':_0x18afc3(0x9d)+ScriptName+'/'+ScriptName+_0x18afc3(0x9a),'dataType':'script','cache':![]}),console[_0x18afc3(0x9b)](ScriptName+_0x18afc3(0xa9)),console[_0x18afc3(0xad)](_0x18afc3(0x9e)+0xbb8+'ms'),await sleep(0xbb8),setInterval(function(){location['reload']();},getMilliseconds(0x1,0x0,0x0));}());