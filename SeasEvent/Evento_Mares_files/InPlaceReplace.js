define("Ig/TribalWars/Modules/Events/SeasOfFortune/InPlaceReplace", function () {
	return function (e, t) {
		var a=$(e), s=$(t), o=getComputedStyle(a[0]), i=o.animationDuration, n=o.transitionDuration,
			f=parseFloat(i) ? i :n, r=f.match(/s|ms/);
		if (r) {
			var l="ms" === r[0] ? 1 :1e3;
			f=parseFloat(f) * l
		}
		else {
			f=0;
		}
		a.last().after(s), a.addClass("replacing"), s.addClass("replacement"), s.css({
			left: a[0].offsetLeft,
			top: a[0].offsetTop,
			width: a[0].offsetWidth,
			height: a[0].offsetHeight
		}), setTimeout(function () {
			s.removeClass("replacement"), a.remove(), s.css({left: "", top: "", width: "", height: ""})
		}, f)
	}
});
