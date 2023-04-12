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

const _0x330dbd=_0x53ff;(function(_0x8071f0,_0x12742d){const _0x8dc539=_0x53ff,_0x33d10c=_0x8071f0();while(!![]){try{const _0x2db31f=-parseInt(_0x8dc539(0x15d))/0x1+parseInt(_0x8dc539(0x152))/0x2+-parseInt(_0x8dc539(0x15c))/0x3+-parseInt(_0x8dc539(0x15f))/0x4*(-parseInt(_0x8dc539(0x163))/0x5)+-parseInt(_0x8dc539(0x150))/0x6*(-parseInt(_0x8dc539(0x151))/0x7)+parseInt(_0x8dc539(0x164))/0x8+-parseInt(_0x8dc539(0x159))/0x9*(parseInt(_0x8dc539(0x168))/0xa);if(_0x2db31f===_0x12742d)break;else _0x33d10c['push'](_0x33d10c['shift']());}catch(_0x30d130){_0x33d10c['push'](_0x33d10c['shift']());}}}(_0x26cd,0x1bae5));function _0x53ff(_0x2797ff,_0xa71738){const _0x26cd75=_0x26cd();return _0x53ff=function(_0x53ff10,_0x242247){_0x53ff10=_0x53ff10-0x150;let _0x2e5594=_0x26cd75[_0x53ff10];return _0x2e5594;},_0x53ff(_0x2797ff,_0xa71738);}function _0x26cd(){const _0x469b93=['\x20#E40000,\x2014px\x2014px\x200\x20#C70000,\x2016px\x2016px\x200\x20#AA0000;','reload','ajax','\x20#F8D210,\x204px\x204px\x200\x20#FFAA00,\x206px\x206px\x200\x20#FF8C00,\x208px\x208px\x200\x20#FF6F00,\x2010px\x2010px\x200\x20#FF5100,\x2012px\x2012px\x200','https://rawcdn.githack.com/Tribalwars-Scripts/Events/64b056aaa5c32e8352634e5e71cecf0677ea60e3/','375012znjKtv','%cScript\x20made\x20by\x20-\x20Bonobobo','match','316419ofPGqB','110808QUvUwm','GET','80452qGANhF','replace','\x202px\x202px\x200','debug','35PSINpB','911848FCUlxT','screen','Loader.js','Going\x20into\x20sleeping\x20mode\x20for\x20','20rmOknW','font-family:\x20Orbitron;\x20font-size:\x2012em;\x20color:\x20#FF6F00;\x20text-shadow:','28218MsFJCD','21uJlWzB','288234DPReNK','info'];_0x26cd=function(){return _0x469b93;};return _0x26cd();}const EventScreen=game_data[_0x330dbd(0x165)],regex=/(?<=event_).*/,match=EventScreen[_0x330dbd(0x15b)](regex),EventName=match[0x0];$[_0x330dbd(0x156)]({'type':_0x330dbd(0x15e),'url':'https://rawcdn.githack.com/Tribalwars-Scripts/Events/main/UILoader/default.js','dataType':'script','cache':![]}),(async function(){'use strict';const _0x2502a3=_0x330dbd;console[_0x2502a3(0x153)](_0x2502a3(0x15a),_0x2502a3(0x169)+_0x2502a3(0x161)+_0x2502a3(0x157)+_0x2502a3(0x154)),console[_0x2502a3(0x153)]('Fetching\x20the\x20Event\x20Script\x20from\x20the\x20main\x20repository.'),$[_0x2502a3(0x156)]({'type':_0x2502a3(0x15e),'url':_0x2502a3(0x158)+ScriptName[_0x2502a3(0x160)]('\x20','')+'/'+ScriptName[_0x2502a3(0x160)]('\x20','')+_0x2502a3(0x166),'dataType':'script','cache':![]}),inProgress(),console[_0x2502a3(0x153)](ScriptName+'\x20Loader\x20successfully\x20fetched.'),console[_0x2502a3(0x162)](_0x2502a3(0x167)+0xbb8+'ms'),await sleep(0xbb8),setInterval(function(){const _0x2e10ae=_0x2502a3;location[_0x2e10ae(0x155)]();},getMilliseconds(0x1,0x0,0x0));}());