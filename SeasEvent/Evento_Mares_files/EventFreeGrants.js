define("Ig/TribalWars/Modules/EventFreeGrants",function(){"use strict";return function(n,r,e,t){Connection.registerHandler(n,function(n){var a=n.grants;delete n.grants;for(var i=new Array(e),o=e-1;o>=0;--o)i[o]=r.make(o>=a?"granted":"");var s=$([]);i.forEach(function(n){s=s.add(n)}),t(s,n)})}});
