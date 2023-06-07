define("Ig/TribalWars/Modules/Events/SeasOfFortune/SeasOfFortune", [ "Ig/TribalWars/Modules/TemplateConstructor", "Ig/TribalWars/Modules/EventFreeGrants", "Ig/TribalWars/Modules/Events/SeasOfFortune/InPlaceReplace", "Ig/TribalWars/Modules/UI/FeatureLinkReplacer" ], function (e, a, t, i) {
	"use strict";
	var r={
		grants: 10,
		fog_root: null,
		next_chests: null,
		current_map: null,
		next_daily_special: null,
		init: function (n, o, c, l, p) {
			n*=1e3, o*=1e3, c*=1e3, this.next_chests=l, this.next_daily_special=l[0].prizes[0], Connection.registerHandler("event_currency_crew", function (e) {
				$("a.crew-shop .amount").html(e.balance)
			}), $("a.crew-shop").on("click", function (e) {
				e.preventDefault(), Dialog.fetch("crew_shop", "event_seas", {ajax: "crew_dialog"}, function () {
					i($("#popup_box_crew_shop [data-feature]"), function (e) {
						$("a.crew-shop .amount").html(e.balance), Dialog.close()
					})
				})
			}), $("a.help-link.daily-special-link").on("click", function (e) {
				e.preventDefault(), Dialog.fetch("daily_special_info", "event_seas", {ajax: "daily_special_info"})
			}), $(".popup > .popup-link").on("click", r.popup_helper);
			var d=new e('<li class="%1"><span class="text-border">10x</span>' + Format.image_tag({src: "events/seas_of_fortune/daily_grant.jpg"}, _("b1b517859e99ab6f9cef97ba38d13f64"), [ "tooltip", "not-granted" ]) + Format.image_tag({src: "events/seas_of_fortune/daily_grant_rewarded.jpg"}, _("83d8ea680fe0f35ca78e9ab9b36e12ae"), [ "tooltip", "granted" ]) + "</li>");
			a("event_seas_update_grants", d, this.grants, function (e, a) {
				$(".daily-grants ul").html(e), UI.ToolTip(e.find(".tooltip"))
			}), i($(".reroll-btn"), function (e) {
				$(".reroll-btn").data("cost", e.new_cost);
				var a=$(".current-grand-prize"), i=$(r.item_template(e.new_grand_prize));
				i.addClass("current-grand-prize"), i.data("item_id", e.new_grand_prize.item_id);
				var n=$(s(".grand-prize-list [data-item_id=%1]", a.data("item_id"))), o=n.clone(!0);
				o.removeClass("rewarded");
				var c=$(s(".grand-prize-list [data-item_id=%1]", e.new_grand_prize.item_id)), l=c.clone(!0);
				l.addClass("rewarded"), t(a, i), t(n, o), t(c, l), UI.ToolTip(i)
			}), this.fog_root=$(".map-layer .fog"), Timing.whenReady(function () {
				var e=$(".timer"), a=$(".daily-special img.item-display"), i=!1;
				$(TribalWars).on("global_tick", function () {
					var s=Timing.getCurrentServerTime();	TribalWars.get("event_seas", {ajax: "daily_special"}, function (e) {
						r.next_daily_special=e.daily_special, r.next_chests=e.chests
					})
					s > c && !i && (i= !0, TribalWars.redirect("overview"));
					var l=n - s;
					if (l <= 0) {
						n+=o, e.html(Format.timeSpan(n - s));
						var p=$(r.item_template(r.next_daily_special));
						t(a, p), a=p, r.transition_chests(r.next_chests, r.current_map), UI.ToolTip(p), setTimeout(function () {
							TribalWars.get("event_seas", {ajax: "daily_special"}, function (e) {
								r.next_daily_special=e.daily_special, r.next_chests=e.chests
							})
						}, Timing.offset_to_server + Timing.offset_from_server)
					}
					else {
						e.html(Format.timeSpan(l))
					}
				})
			}), $(".ship-captains a.captain-link").each(r.captain_click_event)
		},
		get_energy_display: function (e) {
			return $(s(".event_player_energy_%1", e.energy_type.id))
		},
		update_fog: function (e) {
			this.fog_root.find(s(":nth-child(n+%1)", e)).removeClass("revealed"), this.fog_root.find(s(":nth-child(-n+%1)", e)).addClass("revealed")
		},
		captain_click_event: function () {
			$(this).on("click", function (e) {
				var a=$(this);
				if (e.preventDefault(), !a.prop("disabled")) {
					a.prop("disabled", !0), a.siblings().prop("disabled", !0);
					var t=a.data("index");
					TribalWars.post("event_seas", {ajaxaction: "unlock_box"}, {chest: t}, function (e) {
						r.next_chests=e.next_prizes, r.current_map=e.progress.current_map, r.update_fog(e.progress.current_map_progress), r.transition_chests(e.new_prizes, e.progress.current_map), r.show_prizes(e.prize, e.grand_prize), r.replace_grand_prize(e.grand_prize), $("a.crew-shop .amount").html(e.balance), Dialog.close()
					}, function () {
						a.prop("disabled", !1), a.siblings().prop("disabled", !1)
					})
				}
			})
		},
		show_prizes: function (a, t) {
			var i, r,
				n=new e('<div class="quick item-to-inventory white text-border center">' + Format.image_tag({src: "%1"}) + '<h1 class="shadowed-title">' + _("5813c83c09ee3c8d23a407850ba96995") + "</h1></div>"),
				s=new e('<div class="fader item-to-inventory-fader center white"><div class="quick item-to-inventory quick text-border">' + Format.image_tag({src: "%1"}) + "<h3>" + _("5813c83c09ee3c8d23a407850ba96995") + "</h3></div></div>"),
				o=new e('<div class="item-to-inventory text-border">' + Format.image_tag({src: "%1"}) + "<h1>" + _("bcfae18e2561550e29e71a4903d807f5") + "</h1></div>"),
				c=$(document.body);
			if (t) {
				var l=t.rewarded;
				i=s.make(a.image_info.src, a.name);
				var p=o.make(l.image_info.src, l.name);
				setTimeout(function () {
					i.append(p)
				}, 1320), r=5e3
			}
			else {
				i=n.make(a.image_info.src, a.name), r=2e3;
			}
			c.append(i), window.setTimeout(function () {
				i.remove()
			}, r)
		},
		replace_grand_prize: function (e) {
			if (e) {
				$(".reroll-btn").data("cost", e.reroll_cost);
				var a=e.next, i=$("img.current-grand-prize"), r=$(this.item_template(a));
				r.addClass("current-grand-prize"), r.data("item_id", a.item_id), t(i, r), UI.ToolTip(r), this.update_grand_prize_list(e)
			}
		},
		update_grand_prize_list: function (a) {
			var i=$("ul.grand-prize-list"), n=new e('<li class="opacity-replace%1" data-item_id="%2">%3</li>'),
				s=a.prizes.map(function (e) {
					var t="";
					(e.rewarded || e.item_id == a.next.item_id) && (t=" rewarded");
					var i=r.item_template(e);
					return n.make(t, e.item_id, i)
				}), o=$('<ul class="grand-prize-list opacity-replace"></ul>');
			o.append(s), t(i, o), UI.ToolTip(o.find(".tooltip"))
		},
		item_template: function (a) {
			return new e('<img src="%1" alt="%2" title="&lt;h2&gt;%2&lt;/h2&gt;%3" class="item-display tooltip opacity-replace%4" />').replace(a.image, a.name, escapeHtml(a.descriptions.map(function (e) {
				return ItemUIFactory.createDescriptionHtml(e)
			}).join(""), !0), a.rewarded ? " rewarded" :"")
		},
		transition_chests: function (a, i) {
			var n={}, o=!1, c=function (e) {
				var a=e.src;
				return n[a]=e.complete, function () {
					for (var e in n[a]= !0, n) if (!n[e]) return;
					o || (o= !0, t($("ul.ship-captains"), p), p.find("a.captain-link").each(r.captain_click_event), p.find("a.popup-link").click(r.popup_helper))
				}
			}, l=new e($(".captain.template").text()), p=$('<ul class="ship-captains opacity-replace"></ul>');
			a.forEach(function (e, a) {
				var t=s('<table class="chest-prizes vis alternating-rows">%1</table>', r.chest_preview(e)),
					n=l.make(TribalWars.buildURL("GET", "event_seas", {
						action: "unlock_box",
						chest: a
					}), e.image, e.background, e.score, function (e, a) {
						return Math.round(e * Math.pow(1.1, Math.floor(a / 6)))
					}(e.base_cost, i), a, escapeHtml(t, !0));
				p.append(n);
				var o=n.find(".tooltip.captain-link");
				UI.ToolTip(o), n.find(".chest-prizes").html(r.chest_preview(e));
				var d=new Image;
				d.src=e.background, d.addEventListener("load", c(d));
				var _=new Image;
				_.src=e.image, _.addEventListener("load", c(_))
			})
		},
		chest_preview: function (a) {
			var t=new e($(".chest-preview.template").text()), i=_("e2a1f237f4ce1893f335dc79f4a5b8cb");
			return a.prizes.map(function (e, a) {
				var r=s(i, e.name);
				i="%1";
				let n=s(_("22ffd0ef6d307959228e29614c73e70c"), Format.toPercent(e.probability));
				return t.replace(e.image, n, r, 0 == a ? " data-chest-grand-prize" :"")
			}).join("")
		},
		popup_helper: function (e) {
			e.preventDefault();
			var a=$(this).siblings(".popup-content").clone();
			a.find("a.captain-link").each(r.captain_click_event), Dialog.show("grand_prize_popup", a)
		}
	};
	return r
});
