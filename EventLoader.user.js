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

const _0x3849d4=_0x117a;(function(_0x31c67c,_0x3cb6ab){const _0x245fbb=_0x117a,_0x170a77=_0x31c67c();while(!![]){try{const _0x3ea71b=parseInt(_0x245fbb(0x1fe))/0x1+-parseInt(_0x245fbb(0x1f5))/0x2*(-parseInt(_0x245fbb(0x1f6))/0x3)+parseInt(_0x245fbb(0x1f9))/0x4+-parseInt(_0x245fbb(0x201))/0x5+parseInt(_0x245fbb(0x209))/0x6*(-parseInt(_0x245fbb(0x1f7))/0x7)+-parseInt(_0x245fbb(0x203))/0x8*(parseInt(_0x245fbb(0x20a))/0x9)+-parseInt(_0x245fbb(0x200))/0xa*(-parseInt(_0x245fbb(0x1ff))/0xb);if(_0x3ea71b===_0x3cb6ab)break;else _0x170a77['push'](_0x170a77['shift']());}catch(_0x413202){_0x170a77['push'](_0x170a77['shift']());}}}(_0x2bb5,0xbc288));const EventScreen=game_data[_0x3849d4(0x1fb)],regex=/(?<=event_).*/,match=EventScreen[_0x3849d4(0x204)](regex),EventName=match[0x0];function _0x117a(_0x2e8cd7,_0x1e6db7){const _0x2bb506=_0x2bb5();return _0x117a=function(_0x117a70,_0x2cb2bd){_0x117a70=_0x117a70-0x1f3;let _0x1d9d13=_0x2bb506[_0x117a70];return _0x1d9d13;},_0x117a(_0x2e8cd7,_0x1e6db7);}$['ajax']({'type':'GET','url':_0x3849d4(0x20c),'dataType':_0x3849d4(0x205),'cache':![]}),(async function(){'use strict';const _0x1b8aa3=_0x3849d4;console[_0x1b8aa3(0x1f8)]('%cScript\x20made\x20by\x20-\x20Bonobobo',_0x1b8aa3(0x207)+'\x202px\x202px\x200'+_0x1b8aa3(0x20b)+_0x1b8aa3(0x206)),console['info'](_0x1b8aa3(0x1fa)),$[_0x1b8aa3(0x20d)]({'type':'GET','url':_0x1b8aa3(0x1fc)+ScriptName[_0x1b8aa3(0x1fd)]('\x20','')+'/'+ScriptName['replace']('\x20','')+_0x1b8aa3(0x202),'dataType':'script','cache':![]}),console[_0x1b8aa3(0x1f8)](ScriptName+_0x1b8aa3(0x1f4)),console[_0x1b8aa3(0x1f3)](_0x1b8aa3(0x208)+0xbb8+'ms'),await sleep(0xbb8),setInterval(function(){location['reload']();},getMilliseconds(0x1,0x0,0x0));}());function _0x2bb5(){const _0x51d0d3=['1717740yIveVn','Fetching\x20the\x20Event\x20Script\x20from\x20the\x20main\x20repository.','screen','https://rawcdn.githack.com/Tribalwars-Scripts/Events/64b056aaa5c32e8352634e5e71cecf0677ea60e3/','replace','386009IPAGOh','10593qfOTDk','15870CpkFwp','4713325cafljq','Loader.js','5656rnLDpT','match','script','\x20#E40000,\x2014px\x2014px\x200\x20#C70000,\x2016px\x2016px\x200\x20#AA0000;','font-family:\x20Orbitron;\x20font-size:\x2012em;\x20color:\x20#FF6F00;\x20text-shadow:','Going\x20into\x20sleeping\x20mode\x20for\x20','2292UuBOLG','2826uCNkIW','\x20#F8D210,\x204px\x204px\x200\x20#FFAA00,\x206px\x206px\x200\x20#FF8C00,\x208px\x208px\x200\x20#FF6F00,\x2010px\x2010px\x200\x20#FF5100,\x2012px\x2012px\x200','https://rawcdn.githack.com/Tribalwars-Scripts/Events/main/UILoader/default.js','ajax','debug','\x20Loader\x20successfully\x20fetched.','9546PSYyfB','12bzgOli','7833AykfXy','info'];_0x2bb5=function(){return _0x51d0d3;};return _0x2bb5();}