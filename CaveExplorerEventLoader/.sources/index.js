var CaveExplorerEvent;
!function () {
	'use strict';
	CaveExplorerEvent=function () {
		return {
			initEnergy: function (a, b, d, e) {
				c.init(a, b, d, e)
			},
			init: function (c) {
				b.update(c), Timing.tickHandlers.timers.initTimers("countdown", function () {
					$(this).html(_("dd2677d07f29951449ecbd2ab3b896eb")), setTimeout(function () {
						window.location.reload()
					}, 5e3)
				})
			},
			initActiveEvent: function (c) {
				b.parseNodeEvent(c)
			},
			parseAjaxData: function (a) {
				a.force_reload && window.location.reload(), a.player_energies && c.setEnergies(a.player_energies), a.node_event ? b.parseNodeEvent(a.node_event, a) :(a.player && b.update(a.player), a.currency && b.updateCurrency(a)), a.ranking_defeated_enemies && d.setDefeatedEnemiesRankings(a.ranking_defeated_enemies), a.ranking_highest_level && d.setHighestLevelRanking(a.ranking_highest_level)
			},
			initRanking: function (b, c, a) {
				d.init(b, c, a)
			}
		}
	}();
	var b=function () {
			function b(b) {
				h=b,
					function () {
						var b=$(".player-health");
						c(b, parseInt(b.html()), h.health, "omg-message-health"), b.html(h.health), 50 > h.health ? b.addClass("red") :b.removeClass("red");
						var a=$(".player-damage");
						c(a, parseInt(a.html()), h.damage, "omg-message-health"), a.html(h.damage);
						var d=$(".player-armor");
						c(d, parseInt(d.html()), h.armor, "omg-message-health"), d.html(h.armor);
						var e=$(".player-critical-hit span");
						c(e, parseInt(e.html()), h.critical_hit, "omg-message-health"), e.html(h.critical_hit),
							function () {
								var b, c=$(".heal-button");
								b=h.free_heal ? "<button class=\"btn-cave-explorer-heal btn btn-pp-tooltip\" title=\"" + s(_("26875458e6c6365c3773bbb8018a3de4")) + "\">" + _("b671fb398a8a3667186f8521b324d43c") + "</button>" :"<button class=\"btn btn-pp btn-cave-explorer-heal btn-pp-tooltip\" data-feature=\"\\Ig\\TribalWars\\Events\\CaveExplorer\\PremiumFeature\\EventCaveExplorerHeal\" data-cost=\"" + (h.heal_feature_used + 1) * h.heal_feature_cost + "\" title=\"" + _("a14619da85e5cce0f590ccd8085aed18") + "\">" + _("e7da498077862ed275570d7e83468850") + "</button>", c.html(b), 100 <= h.health && $(".btn-cave-explorer-heal").addClass("btn-disabled"), UI.ToolTip(".btn-pp-tooltip")
							}(), g="", $.each(h.inventory, function (b, c) {
							g+="<div class=\"inventory-slot slot-" + b + " item-" + c.item + " tooltip\" title=\"" + c.name + "\"></div>"
						}), $(".player-inventory").html(g), UI.ToolTip(".tooltip"), f="<div class=\"cave cave-" + h.cave_variation + "\">", f+="<div class=\"cave-level\">" + _("516488a1788113bc6224e1cd3a9b8199") + h.cave_level + "</div>", f+=Object.entries(h.nodes).map(function (a) {
							return function (b, c) {
								var a="",
									d="";
								switch (a="<div id=\"node-" + c.position + "\" data-id=\"" + c.position + "\" class=\"cave-node node-tooltip node-" + c.type + "-" + c.status + " node-" + c.status, "unlocked" !== c.status && "active" !== c.status && (a+=" node-disabled"), a+="\"", c.type) {
									case "battle":
										d=_("0888becd185c9dd285bec223b8ceaf2d");
										break;
									case "boss":
										d=_("dbee755ef620b4e8160579674d2e1d10");
										break;
									case "event":
										d=_("6f878702e2d39c6bdca35df214873a04");
										break;
									case "treasure":
										d=_("950bd28d86ce610748cc5a9d3afff7ec");
										break;
									case "merchant":
										d=_("cc7050154f83f52f86865ab97c980443");
										break;
									case "exit":
										d=_("4b2a4747d5d0cd2d487efd8d4e21c572");
								}
								return a+=" title=\"" + d + "\"></div>"
							}(a[0], a[1])
						}).join(""), f+="</div>", $(".cave-layout").html(f), UI.ToolTip(".node-tooltip");
						var f, g
					}(), $(".node-unlocked, .node-active").click(function (a) {
					$(this).hasClass("node-disabled") || (a.preventDefault(), TribalWars.post("event_cave_explorer", {
						ajaxaction: "node_action"
					}, {
						node_id: $(this).attr("data-id")
					}, function (a) {
						CaveExplorerEvent.parseAjaxData(a)
					}))
				}), $(".btn-cave-explorer-heal").click(function (b) {
					$(this).hasClass("btn-disabled") || ($(this).addClass("btn-disabled"), b.preventDefault(), h.free_heal ? d() :Premium.check($(this).data("feature"), $(this).data("cost"), function () {
						d()
					}), $(this).removeClass("btn-disabled"))
				})
			}

			function a(b) {
				if (b.currency) {
					var c=$(".event-currency-display");
					c.html(Format.number(b.currency)), b.currency_reward && UI.OmgMessage(c, "+" + b.currency_reward)
				}
			}

			function c(b, c, a, d) {
				var e=a - c;
				0 < e ? UI.OmgMessage(b, "+" + e, d) :0 > e && UI.OmgMessage(b, e, d + "-minus")
			}

			function d() {
				TribalWars.post("event_cave_explorer", {
					ajaxaction: "heal"
				}, {}, function (a) {
					CaveExplorerEvent.parseAjaxData(a)
				})
			}

			function f(b, c) {
				var a;
				a=c ? new ImageBasedAnimation("events/cave_explorer/critical_hit_animation.png", {
					frame_count: 5,
					frame_rate: 10
				}) :new ImageBasedAnimation("events/cave_explorer/attack_animation.png", {
					frame_count: 6,
					frame_rate: 10
				}), b.append(a.getCanvas()), a.play(), $(a).on("play_ended", function () {
					$("canvas").remove()
				})
			}

			function g(b, c, a) {
				var d="-" + c,
					e="omg-message-attack";
				a && (e="omg-message-critical-hit", d+="!"), UI.OmgMessage(b, d, e)
			}

			var h;
			return {
				update: b,
				parseNodeEvent: function (c, d) {
					switch (c.html && (Dialog.show("#cave-dialog", c.html, function () {
						b(d.player), a(d)
					}), $("#cave-dialog").attr("data-id", c.position)), c.type) {
						case "battle":
						case "boss":
							!function (b) {
								var d=$(".node-dialog-buttons");
								d.hide();
								var a=$(".battle-player-health");
								a.html(b.stats.player.health), $(".battle-player-damage").html(b.stats.player.damage), $(".battle-player-armor").html(b.stats.player.armor), $(".battle-player-critical-hit span").html(b.stats.player.critical_hit);
								var e=$(".battle-enemy-health");
								e.html(b.stats.enemy.health), $(".battle-enemy-damage").html(b.stats.enemy.damage), $(".battle-enemy-armor").html(b.stats.enemy.armor), $(".battle-enemy-critical-hit span").html(b.stats.enemy.critical_hit);
								var h=0;
								$.each(b.rounds, function (i, j) {
									setTimeout(function () {
										if (f($(".battle-enemy-info"), j.player.critical_hit), g(e, j.player.damage, j.player.critical_hit), e.html(j.enemy.health), j.is_battle_end && !j.is_player_dead) {
											var c=_("c18a583dee9464bc32f8cfea78b755de");
											b.extra_ec && (c+="<br><br>", c+=s(_("5e0f9923ea87d4f074a25c1abc37cac7"), b.extra_ec)), $(".node-dialog-message").html(c), d.show()
										}
										else {
											setTimeout(function () {
												f($(".battle-player-info"), j.enemy.critical_hit), g(a, j.enemy.damage, j.enemy.critical_hit), a.html(j.player.health), j.is_player_dead && ($(".node-dialog-message").html(_("297e63fb0f7f12de38f8e49b1928dc8a")), $(".btn-move-on").html(_("dd278947664d0301c2472379bb5b704a")), d.show())
											}, 1500)
										}
									}, 3e3 * h++)
								})
							}(c);
					}
					$(".btn-move-on").click(function () {
						$("#cave-dialog").attr("data-id", ""), Dialog.close("#cave-dialog")
					}), $(".btn-clickable").click(function (a) {
						$(this).hasClass("btn-disabled") || (a.preventDefault(), TribalWars.post("event_cave_explorer", {
							ajaxaction: "make_node_selection"
						}, {
							node_id: $("#cave-dialog").attr("data-id"),
							selection: $(this).attr("data-option")
						}, function (a) {
							$("#cave-dialog").attr("data-id", ""), Dialog.close("#cave-dialog"), CaveExplorerEvent.parseAjaxData(a)
						}))
					})
				},
				updateCurrency: a
			}
		}(),
		c=function () {
			function b() {
				var a=$("#cave-explorer-energy-parent"),
					b=$("#cave-explorer-energy-display"),
					e=$("#buy-energy-link"),
					i=f[g],
					j=i.energy_type,
					k=i.getValue(),
					c=i.getMaxValue();
				b.text(s("%1 / %2", k, c));
				var l=j.description + " :: ";
				if (k >= c) {
					e.hide(), l=s(_("fb5e695fa5955b5b5cfabe927729f717"), j.name_plural);
				}
				else {
					d.enabled && e.show();
					var n=Format.timeSpan(1e3 * i.getNextChargeWaitSeconds());
					l+=s(_("313b40dd3a7d943c02050a81b9d0e6dd"), j.name, n)
				}
				a.attr("title", l).trigger("tooltip_change"), $(".btn-need-energy").toggleClass("btn-disabled", 1 > k)
			}

			function c(a) {
				d=new EventEnergyShop(a, f), $("#buy-energy-link").off("click"), $("#buy-energy-link").on("click", function (a) {
					a.preventDefault(), d.ui.openPopup()
				})
			}

			var f, d, g;
			return {
				init: function (d, a, e) {
					g=a, f=EventPlayerEnergy.createMapFromDTO(d), c(e), f[g].onChange(function () {
						b()
					}), $(window.TribalWars).on("global_tick", function () {
						b()
					}), $(window.TribalWars).on("update_energy_shop", function (b, d) {
						c(d)
					}), UI.ToolTip(".tooltip")
				},
				getEnergyValue: function (b) {
					return f[b].getValue()
				},
				setEnergies: function (b) {
					$.each(f, function (a, c) {
						b[a] && c.update(b[a])
					})
				}
			}
		}(),
		d=function () {
			function b(b, a) {
				var d=$("div." + b + " tbody.entries"),
					e=a.map(function (b) {
						return a=b, "<tr" + (window.game_data.player.id == a.object_id ? " class=\"is_me\"" :"") + "><td>" + a.rank + "</td><td>" + Format.playerAnchor(a.player_id, a.player_name) + "</td><td>" + a.score + "</td><td><img src=\"" + c + "\" class=\"event-mini-icon\"> " + a.reward + "</td></tr>";
						var a
					}).join("");
				d.html(e)
			}

			var c, d;
			return {
				init: function (a, e, f) {
					c=a, d=f, b("defeated-enemies", e), b("highest-level", d)
				},
				setDefeatedEnemiesRankings: function (a) {
					b("defeated-enemies", a)
				},
				setHighestLevelRanking: function (a) {
					b("highest-level", d=a)
				}
			}
		}()
}();