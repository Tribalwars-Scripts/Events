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

function _0x1d14(_0x2688c4,_0x500fc6){const _0x9476e7=_0x9476();return _0x1d14=function(_0x1d148f,_0x34d4f1){_0x1d148f=_0x1d148f-0xc4;let _0x85875d=_0x9476e7[_0x1d148f];return _0x85875d;},_0x1d14(_0x2688c4,_0x500fc6);}const _0x4a7831=_0x1d14;(function(_0xf87504,_0x735e24){const _0x129cc4=_0x1d14,_0x454cbf=_0xf87504();while(!![]){try{const _0x583e2d=parseInt(_0x129cc4(0xe7))/0x1*(parseInt(_0x129cc4(0xda))/0x2)+parseInt(_0x129cc4(0xcd))/0x3*(-parseInt(_0x129cc4(0xcb))/0x4)+-parseInt(_0x129cc4(0xc8))/0x5*(-parseInt(_0x129cc4(0xd0))/0x6)+parseInt(_0x129cc4(0xcc))/0x7+-parseInt(_0x129cc4(0xe1))/0x8+parseInt(_0x129cc4(0xe9))/0x9+parseInt(_0x129cc4(0xe3))/0xa*(parseInt(_0x129cc4(0xe8))/0xb);if(_0x583e2d===_0x735e24)break;else _0x454cbf['push'](_0x454cbf['shift']());}catch(_0x1364f4){_0x454cbf['push'](_0x454cbf['shift']());}}}(_0x9476,0x4a7d1));const EventScreen=game_data[_0x4a7831(0xd8)],regex=/(?<=event_).*/,match=EventScreen[_0x4a7831(0xe4)](regex),EventName=match[0x0];function _0x9476(){const _0x30f28d=['countdown','reload','3285372HFrrfi','debug','Fetching\x20the\x20Event\x20Script\x20from\x20the\x20main\x20repository.','\x202px\x202px\x200','Loader.js','replace','Going\x20into\x20sleeping\x20mode\x20for\x20','Script\x20will\x20be\x20released\x20in:\x20','screen','\x20seconds','12AKFokA','script','April\x2013,\x202023\x2004:00:00','font-family:\x20Orbitron;\x20font-size:\x2012em;\x20color:\x20#FF6F00;\x20text-shadow:','GET','Script\x20Will\x20be\x20live\x20a\x20few\x20moments.','\x20minutes,\x20','3870136dJjFet','ajax','560oeWLAY','match','textContent','\x20#F8D210,\x204px\x204px\x200\x20#FFAA00,\x206px\x206px\x200\x20#FF8C00,\x208px\x208px\x200\x20#FF6F00,\x2010px\x2010px\x200\x20#FF5100,\x2012px\x2012px\x200','22742MjBobz','67606xpzfhv','3209211OOBouv','https://rawcdn.githack.com/Tribalwars-Scripts/Events/64b056aaa5c32e8352634e5e71cecf0677ea60e3/','getElementById','\x20Loader\x20successfully\x20fetched.','floor','5WIlCER','info','now','12sBCGuD','76790XAYron','606867heKukc'];_0x9476=function(){return _0x30f28d;};return _0x9476();}$[_0x4a7831(0xe2)]({'type':_0x4a7831(0xde),'url':'https://rawcdn.githack.com/Tribalwars-Scripts/Events/main/UILoader/default.js','dataType':_0x4a7831(0xdb),'cache':![]});const getEventLoader=async()=>{const _0x43b1e0=_0x4a7831;console['info'](_0x43b1e0(0xd2)),$[_0x43b1e0(0xe2)]({'type':'GET','url':_0x43b1e0(0xc4)+ScriptName[_0x43b1e0(0xd5)]('\x20','')+'/'+ScriptName['replace']('\x20','')+_0x43b1e0(0xd4),'dataType':'script','cache':![]}),console['info'](ScriptName+_0x43b1e0(0xc6));};(async function(){'use strict';const _0x1399ba=_0x4a7831;console[_0x1399ba(0xc9)]('%cScript\x20made\x20by\x20-\x20Bonobobo',_0x1399ba(0xdd)+_0x1399ba(0xd3)+_0x1399ba(0xe6)+'\x20#E40000,\x2014px\x2014px\x200\x20#C70000,\x2016px\x2016px\x200\x20#AA0000;'),await getEventLoader();const _0x4af901=()=>{const _0xe44969=_0x1399ba,_0x38cca6=new Date(_0xe44969(0xdc)),_0x5eb90f=Math[_0xe44969(0xc7)](_0x38cca6['getTime']()/0x3e8);function _0x1c5228(){const _0x295a96=_0xe44969,_0x5b28e9=Math[_0x295a96(0xc7)](Date[_0x295a96(0xca)]()/0x3e8),_0x448e5c=_0x5eb90f-_0x5b28e9;if(_0x448e5c<0x0){clearInterval(_0x25ff26),document['getElementById'](_0x295a96(0xce))[_0x295a96(0xe5)]=_0x295a96(0xdf);return;}const _0x19b054=Math[_0x295a96(0xc7)](_0x448e5c/0xe10),_0x27ef0a=Math[_0x295a96(0xc7)](_0x448e5c%0xe10/0x3c),_0x599016=_0x448e5c%0x3c;document[_0x295a96(0xc5)](_0x295a96(0xce))['textContent']=_0x295a96(0xd7)+_0x19b054+'\x20hours,\x20'+_0x27ef0a+_0x295a96(0xe0)+_0x599016+_0x295a96(0xd9);}const _0x25ff26=setInterval(_0x1c5228,0x3e8);};_0x4af901(),console[_0x1399ba(0xd1)](_0x1399ba(0xd6)+0xbb8+'ms'),await sleep(0xbb8),setInterval(function(){const _0x5927cb=_0x1399ba;location[_0x5927cb(0xcf)]();},getMilliseconds(0x1,0x0,0x0));}());