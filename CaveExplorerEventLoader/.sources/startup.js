var CaveExplorerEvent;
!function () {
	"use strict";
	CaveExplorerEvent=function () {
		return {
			initEnergy: function (e, t, n, i) {
				a.init(e, t, n, i)
			}, init: function (a) {
				e.update(a), Timing.tickHandlers.timers.initTimers("countdown", function () {
					$(this).html(_("dd2677d07f29951449ecbd2ab3b896eb")), setTimeout(function () {
						window.location.reload()
					}, 5e3)
				})
			}, initActiveEvent: function (a) {
				e.parseNodeEvent(a)
			}, parseAjaxData: function (n) {
				n.force_reload && window.location.reload(), n.player_energies && a.setEnergies(n.player_energies), n.node_event ? e.parseNodeEvent(n.node_event, n) :(n.player && e.update(n.player), n.currency && e.updateCurrency(n)), n.ranking_defeated_enemies && t.setDefeatedEnemiesRankings(n.ranking_defeated_enemies), n.ranking_highest_level && t.setHighestLevelRanking(n.ranking_highest_level)
			}, initRanking: function (e, a, n) {
				t.init(e, a, n)
			}
		}
	}();
	var e=function () {
		var e;

		function a(a) {
			e=a, function () {
				var a=$(".player-health");
				n(a, parseInt(a.html()), e.health, "omg-message-health"), a.html(e.health), e.health < 50 ? a.addClass("red") :a.removeClass("red");
				var t=$(".player-damage");
				n(t, parseInt(t.html()), e.damage, "omg-message-health"), t.html(e.damage);
				var i=$(".player-armor");
				n(i, parseInt(i.html()), e.armor, "omg-message-health"), i.html(e.armor);
				var r=$(".player-critical-hit span");
				n(r, parseInt(r.html()), e.critical_hit, "omg-message-health"), r.html(e.critical_hit), function () {
					var a, t=$(".heal-button");
					a=e.free_heal ? '<button class="btn-cave-explorer-heal btn btn-pp-tooltip" title="' + s(_("26875458e6c6365c3773bbb8018a3de4")) + '">' + _("b671fb398a8a3667186f8521b324d43c") + "</button>" :'<button class="btn btn-pp btn-cave-explorer-heal btn-pp-tooltip" data-feature="\\Ig\\TribalWars\\Events\\CaveExplorer\\PremiumFeature\\EventCaveExplorerHeal" data-cost="' + (e.heal_feature_used + 1) * e.heal_feature_cost + '" title="' + _("a14619da85e5cce0f590ccd8085aed18") + '">' + _("e7da498077862ed275570d7e83468850") + "</button>";
					t.html(a), e.health >= 100 && $(".btn-cave-explorer-heal").addClass("btn-disabled");
					UI.ToolTip(".btn-pp-tooltip")
				}(), o="", $.each(e.inventory, function (e, a) {
					o+='<div class="inventory-slot slot-' + e + " item-" + a.item + ' tooltip" title="' + a.name + '"></div>'
				}), $(".player-inventory").html(o), UI.ToolTip(".tooltip"), l='<div class="cave cave-' + e.cave_variation + '">', l+='<div class="cave-level">' + _("516488a1788113bc6224e1cd3a9b8199") + e.cave_level + "</div>", l+=Object.entries(e.nodes).map(function (e) {
					return function (e, a) {
						var t="", n="";
						switch (t='<div id="node-' + a.position + '" data-id="' + a.position + '" class="cave-node node-tooltip node-' + a.type + "-" + a.status + " node-" + a.status, "unlocked" !== a.status && "active" !== a.status && (t+=" node-disabled"), t+='"', a.type) {
							case"battle":
								n=_("0888becd185c9dd285bec223b8ceaf2d");
								break;
							case"boss":
								n=_("dbee755ef620b4e8160579674d2e1d10");
								break;
							case"event":
								n=_("6f878702e2d39c6bdca35df214873a04");
								break;
							case"treasure":
								n=_("950bd28d86ce610748cc5a9d3afff7ec");
								break;
							case"merchant":
								n=_("cc7050154f83f52f86865ab97c980443");
								break;
							case"exit":
								n=_("4b2a4747d5d0cd2d487efd8d4e21c572")
						}
						return t+=' title="' + n + '"></div>'
					}(e[0], e[1])
				}).join(""), l+="</div>", $(".cave-layout").html(l), UI.ToolTip(".node-tooltip");
				var l;
				var o
			}(), $(".node-unlocked, .node-active").click(function (e) {
				$(this).hasClass("node-disabled") || (e.preventDefault(), TribalWars.post("event_cave_explorer", {ajaxaction: "node_action"}, {node_id: $(this).attr("data-id")}, function (e) {
					CaveExplorerEvent.parseAjaxData(e)
				}))
			}), $(".btn-cave-explorer-heal").click(function (a) {
				$(this).hasClass("btn-disabled") || ($(this).addClass("btn-disabled"), a.preventDefault(), e.free_heal ? i() :Premium.check($(this).data("feature"), $(this).data("cost"), function () {
					i()
				}), $(this).removeClass("btn-disabled"))
			})
		}

		function t(e) {
			if (e.currency) {
				var a=$(".event-currency-display");
				a.html(Format.number(e.currency)), e.currency_reward && UI.OmgMessage(a, "+" + e.currency_reward)
			}
		}

		function n(e, a, t, n) {
			var i=t - a;
			i > 0 ? UI.OmgMessage(e, "+" + i, n) :i < 0 && UI.OmgMessage(e, i, n + "-minus")
		}

		function i() {
			TribalWars.post("event_cave_explorer", {ajaxaction: "heal"}, {}, function (e) {
				CaveExplorerEvent.parseAjaxData(e)
			})
		}

		function r(e, a) {
			var t;
			t=a ? new ImageBasedAnimation("events/cave_explorer/critical_hit_animation.png", {
				frame_count: 5,
				frame_rate: 10
			}) :new ImageBasedAnimation("events/cave_explorer/attack_animation.png", {
				frame_count: 6,
				frame_rate: 10
			}), e.append(t.getCanvas()), t.play(), $(t).on("play_ended", function () {
				$("canvas").remove()
			})
		}

		function l(e, a, t) {
			var n="-" + a, i="omg-message-attack";
			t && (i="omg-message-critical-hit", n+="!"), UI.OmgMessage(e, n, i)
		}

		return {
			update: a, parseNodeEvent: function (e, n) {
				switch (e.html && (Dialog.show("#cave-dialog", e.html, function () {
					a(n.player), t(n)
				}), $("#cave-dialog").attr("data-id", e.position)), e.type) {
					case"battle":
					case"boss":
						!function (e) {
							var a=$(".node-dialog-buttons");
							a.hide();
							var t=$(".battle-player-health");
							t.html(e.stats.player.health), $(".battle-player-damage").html(e.stats.player.damage), $(".battle-player-armor").html(e.stats.player.armor), $(".battle-player-critical-hit span").html(e.stats.player.critical_hit);
							var n=$(".battle-enemy-health");
							n.html(e.stats.enemy.health), $(".battle-enemy-damage").html(e.stats.enemy.damage), $(".battle-enemy-armor").html(e.stats.enemy.armor), $(".battle-enemy-critical-hit span").html(e.stats.enemy.critical_hit);
							var i=0;
							$.each(e.rounds, function (o, c) {
								setTimeout(function () {
									if (r($(".battle-enemy-info"), c.player.critical_hit), l(n, c.player.damage, c.player.critical_hit), n.html(c.enemy.health), c.is_battle_end && !c.is_player_dead) {
										var i=_("c18a583dee9464bc32f8cfea78b755de");
										e.extra_ec && (i+="<br><br>", i+=s(_("5e0f9923ea87d4f074a25c1abc37cac7"), e.extra_ec)), $(".node-dialog-message").html(i), a.show()
									}
									else {
										setTimeout(function () {
											r($(".battle-player-info"), c.enemy.critical_hit), l(t, c.enemy.damage, c.enemy.critical_hit), t.html(c.player.health), c.is_player_dead && ($(".node-dialog-message").html(_("297e63fb0f7f12de38f8e49b1928dc8a")), $(".btn-move-on").html(_("dd278947664d0301c2472379bb5b704a")), a.show())
										}, 1500)
									}
								}, 3e3 * i++)
							})
						}(e)
				}
				$(".btn-move-on").click(function (e) {
					$("#cave-dialog").attr("data-id", ""), Dialog.close("#cave-dialog")
				}), $(".btn-clickable").click(function (e) {
					$(this).hasClass("btn-disabled") || (e.preventDefault(), TribalWars.post("event_cave_explorer", {ajaxaction: "make_node_selection"}, {
						node_id: $("#cave-dialog").attr("data-id"),
						selection: $(this).attr("data-option")
					}, function (e) {
						$("#cave-dialog").attr("data-id", ""), Dialog.close("#cave-dialog"), CaveExplorerEvent.parseAjaxData(e)
					}))
				})
			}, updateCurrency: t
		}
	}(), a=function () {
		var e, a, t;

		function n() {
			var n=$("#cave-explorer-energy-parent"), i=$("#cave-explorer-energy-display"), r=$("#buy-energy-link"),
				l=e[t], o=l.energy_type, c=l.getValue(), d=l.getMaxValue();
			i.text(s("%1 / %2", c, d));
			var m=o.description + " :: ";
			if (c >= d) {
				r.hide(), m=s(_("fb5e695fa5955b5b5cfabe927729f717"), o.name_plural);
			}
			else {
				a.enabled && r.show();
				var h=Format.timeSpan(1e3 * l.getNextChargeWaitSeconds());
				m+=s(_("313b40dd3a7d943c02050a81b9d0e6dd"), o.name, h)
			}
			n.attr("title", m).trigger("tooltip_change"), $(".btn-need-energy").toggleClass("btn-disabled", c < 1)
		}

		function i(t) {
			a=new EventEnergyShop(t, e), $("#buy-energy-link").off("click"), $("#buy-energy-link").on("click", function (e) {
				e.preventDefault(), a.ui.openPopup()
			})
		}

		return {
			init: function (a, r, l) {
				t=r, e=EventPlayerEnergy.createMapFromDTO(a), i(l), e[t].onChange(function () {
					n()
				}), $(window.TribalWars).on("global_tick", function () {
					n()
				}), $(window.TribalWars).on("update_energy_shop", function (e, a) {
					i(a)
				}), UI.ToolTip(".tooltip")
			}, getEnergyValue: function (a) {
				return e[a].getValue()
			}, setEnergies: function (a) {
				$.each(e, function (e, t) {
					a[e] && t.update(a[e])
				})
			}
		}
	}(), t=function () {
		var e, a;

		function t(a, t) {
			var n=$("div." + a + " tbody.entries"), i=t.map(function (a) {
				return t=a, "<tr" + (window.game_data.player.id == t.object_id ? ' class="is_me"' :"") + "><td>" + t.rank + "</td><td>" + Format.playerAnchor(t.player_id, t.player_name) + "</td><td>" + t.score + '</td><td><img src="' + e + '" class="event-mini-icon"> ' + t.reward + "</td></tr>";
				var t
			}).join("");
			n.html(i)
		}

		return {
			init: function (n, i, r) {
				e=n, a=r, t("defeated-enemies", i), t("highest-level", a)
			}, setDefeatedEnemiesRankings: function (e) {
				t("defeated-enemies", e)
			}, setHighestLevelRanking: function (e) {
				t("highest-level", a=e)
			}
		}
	}()
}();