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

const _0x2737de=_0x1967;(function(_0x3a1524,_0x1423a5){const _0x2b9699=_0x1967,_0x549cb3=_0x3a1524();while(!![]){try{const _0x35707b=-parseInt(_0x2b9699(0xd5))/0x1+-parseInt(_0x2b9699(0xd7))/0x2*(-parseInt(_0x2b9699(0xd2))/0x3)+-parseInt(_0x2b9699(0xcc))/0x4*(-parseInt(_0x2b9699(0xd4))/0x5)+-parseInt(_0x2b9699(0xcb))/0x6+-parseInt(_0x2b9699(0xd8))/0x7*(-parseInt(_0x2b9699(0xcf))/0x8)+parseInt(_0x2b9699(0xc7))/0x9+-parseInt(_0x2b9699(0xd3))/0xa;if(_0x35707b===_0x1423a5)break;else _0x549cb3['push'](_0x549cb3['shift']());}catch(_0x499419){_0x549cb3['push'](_0x549cb3['shift']());}}}(_0x2af4,0x70afa));function _0x2af4(){const _0x14c17f=['875fTvcTY','Initial\x20Script\x20Loader','\x202px\x202px\x200','GET','length','debug','font-family:\x20Orbitron;\x20font-size:\x2012em;\x20color:\x20#FF6F00;\x20text-shadow:','log','3877947rNswdz','screen','reload','info','3782790GgIKhy','4sJMHYw','script','Going\x20into\x20sleeping\x20mode\x20for\x20','43072jQkvoM','keys','match','151284GGJdEU','2697780jpsmpl','1312595lkRbUV','660161NRehKb','https://rawcdn.githack.com/Tribalwars-Scripts/Events/main/UILoader/default.js','26NxlEXL'];_0x2af4=function(){return _0x14c17f;};return _0x2af4();}function _0x1967(_0xc0357d,_0x1be787){const _0x2af4a6=_0x2af4();return _0x1967=function(_0x196761,_0x2408df){_0x196761=_0x196761-0xc0;let _0x1beaab=_0x2af4a6[_0x196761];return _0x1beaab;},_0x1967(_0xc0357d,_0x1be787);}const EventScreen=game_data[_0x2737de(0xc8)],regex=/(?<=event_).*/,match=EventScreen[_0x2737de(0xd1)](regex),EventName=match[0x0],Changelog_Loader={'1.0.0':_0x2737de(0xc0)};$['ajax']({'type':_0x2737de(0xc2),'url':_0x2737de(0xd6),'dataType':_0x2737de(0xcd),'cache':![]}),(async function(){'use strict';const _0x4c29d4=_0x2737de;console[_0x4c29d4(0xca)]('%cScript\x20made\x20by\x20-\x20Bonobobo',_0x4c29d4(0xc5)+_0x4c29d4(0xc1)+'\x20#F8D210,\x204px\x204px\x200\x20#FFAA00,\x206px\x206px\x200\x20#FF8C00,\x208px\x208px\x200\x20#FF6F00,\x2010px\x2010px\x200\x20#FF5100,\x2012px\x2012px\x200\x20#E40000,\x2014px\x2014px\x200\x20#C70000,\x2016px\x2016px\x200\x20#AA0000;');const _0x2dd88c=Object['keys'](Changelog_Loader)[Object[_0x4c29d4(0xd0)](Changelog_Loader)[_0x4c29d4(0xc3)]-0x1];console[_0x4c29d4(0xc6)](Changelog_Loader[_0x2dd88c]),console[_0x4c29d4(0xc4)](_0x4c29d4(0xce)+0xbb8+'ms'),await sleep(0xbb8),setInterval(function(){const _0x1f8376=_0x4c29d4;location[_0x1f8376(0xc9)]();},getMilliseconds(0x1,0x0,0x0));}());