// ==UserScript==
// @name                TribalWars Event Loader - Beta Version
// @namespace           @brunommpreto[bonobobo]
// @icon                https://cdn.discordapp.com/avatars/432864216647598100/5af82b694e245c96aa31f9c3ac12fcfa.webp
// @website             https://www.brunommpreto.github.io/
// @email               brunommpreto@disroot.org
// @description 	    Script to automatically go thru any TribalWars Event
// @author		        Bruno Preto (bonobobo#1694)
// @include             https://**.tribalwars.**/game.php?**&screen=event_**
// @version     	    1.0.9
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

const _0x253e24=_0x5d84;(function(_0x8d1b7,_0x4d466f){const _0xb76060=_0x5d84,_0xf63fdc=_0x8d1b7();while(!![]){try{const _0x4a39b4=-parseInt(_0xb76060(0xab))/0x1*(parseInt(_0xb76060(0xa9))/0x2)+-parseInt(_0xb76060(0xad))/0x3+parseInt(_0xb76060(0xa8))/0x4+parseInt(_0xb76060(0xb8))/0x5+-parseInt(_0xb76060(0xb9))/0x6+-parseInt(_0xb76060(0xc0))/0x7+parseInt(_0xb76060(0xbf))/0x8;if(_0x4a39b4===_0x4d466f)break;else _0xf63fdc['push'](_0xf63fdc['shift']());}catch(_0x4d2522){_0xf63fdc['push'](_0xf63fdc['shift']());}}}(_0x3f54,0x7450b));function _0x5d84(_0x46e395,_0x56e41f){const _0x3f546b=_0x3f54();return _0x5d84=function(_0x5d84ba,_0x1251a7){_0x5d84ba=_0x5d84ba-0xa8;let _0x300dbf=_0x3f546b[_0x5d84ba];return _0x300dbf;},_0x5d84(_0x46e395,_0x56e41f);}const EventScreen=game_data['screen'],regex=/(?<=event_).*/,match=EventScreen[_0x253e24(0xb3)](regex),EventName=match[0x0],getUILoader=async()=>{const _0x56bf9c=_0x253e24;$[_0x56bf9c(0xba)]({'type':'GET','url':_0x56bf9c(0xaa),'dataType':_0x56bf9c(0xc3),'cache':![]});};function _0x3f54(){const _0x27266b=['1187092zNnOMZ','18qLMQxa','https://rawcdn.githack.com/Tribalwars-Scripts/Events/main/UILoader/default.js','72255EIaTbg','\x20hours,\x20','2789463GGSRXn','getTime','now','\x20seconds','countdown','\x20minutes,\x20','match','getElementById','\x20#E40000,\x2014px\x2014px\x200\x20#C70000,\x2016px\x2016px\x200\x20#AA0000;','Script\x20Will\x20be\x20live\x20a\x20few\x20moments.','info','1269130qwEMSe','2199840qXYfcH','ajax','textContent','debug','\x202px\x202px\x200','floor','18262256ahiVnd','2871386TtrQVI','\x20#F8D210,\x204px\x204px\x200\x20#FFAA00,\x206px\x206px\x200\x20#FF8C00,\x208px\x208px\x200\x20#FF6F00,\x2010px\x2010px\x200\x20#FF5100,\x2012px\x2012px\x200','Script\x20will\x20be\x20released\x20in:\x20','script'];_0x3f54=function(){return _0x27266b;};return _0x3f54();}(async function(){'use strict';const _0x446738=_0x253e24;await getUILoader(),console[_0x446738(0xb7)]('%cScript\x20made\x20by\x20-\x20Bonobobo','font-family:\x20Orbitron;\x20font-size:\x2012em;\x20color:\x20#FF6F00;\x20text-shadow:'+_0x446738(0xbd)+_0x446738(0xc1)+_0x446738(0xb5));const _0x109c53=()=>{const _0x536ba2=_0x446738,_0x2b9bd1=new Date('April\x2013,\x202023\x2004:00:00'),_0x5b5d3d=Math[_0x536ba2(0xbe)](_0x2b9bd1[_0x536ba2(0xae)]()/0x3e8);function _0x3c61bc(){const _0x181b27=_0x536ba2,_0x2f7e87=Math[_0x181b27(0xbe)](Date[_0x181b27(0xaf)]()/0x3e8),_0x4d728c=_0x5b5d3d-_0x2f7e87;if(_0x4d728c<0x0){clearInterval(_0x12c5f8),document[_0x181b27(0xb4)](_0x181b27(0xb1))[_0x181b27(0xbb)]=_0x181b27(0xb6);return;}const _0xd5850e=Math[_0x181b27(0xbe)](_0x4d728c/0xe10),_0x34623d=Math[_0x181b27(0xbe)](_0x4d728c%0xe10/0x3c),_0x568867=_0x4d728c%0x3c;document['getElementById'](_0x181b27(0xb1))['textContent']=_0x181b27(0xc2)+_0xd5850e+_0x181b27(0xac)+_0x34623d+_0x181b27(0xb2)+_0x568867+_0x181b27(0xb0);}const _0x12c5f8=setInterval(_0x3c61bc,0x3e8);};_0x109c53(),console[_0x446738(0xbc)]('Going\x20into\x20sleeping\x20mode\x20for\x20'+0xbb8+'ms'),await sleep(0xbb8),setInterval(function(){location['reload']();},getMilliseconds(0x1,0x0,0x0));}());