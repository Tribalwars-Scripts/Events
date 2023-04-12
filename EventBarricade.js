/**** game/Modules/EventBarricade/Messages/MessagePlayerAttackedStage.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Messages/MessagePlayerAttackedStage", [ "module" ], function (e) {
	"use strict";

	function t(e, a, r, s, i) {
		this.type=t.TYPE, this.player_id=e, this.stage_id=a, this.prev_clear_count=r, this.battle_result=s, this.rewards=i
	}

	return t.TYPE=e.id + "/PLAYER_ATTACKED_STAGE", t.SERVER_MESSAGE_TYPE="Ig\\TribalWars\\Events\\BarricadeEvent\\Messages\\MessagePlayerAttackedStage", t.createFromDTO=function (e) {
		return new t(e.player_id, e.stage_id, e.prev_clear_count, e.battle_result, e.rewards)
	}, t
});

;/**** game/Modules/EventBarricade/Messages/MessagePlayerBoughtUnits.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Messages/MessagePlayerBoughtUnits", [ "module" ], function (e) {
	"use strict";

	function s(e, t, i, n) {
		this.type=s.TYPE, this.player_id=e, this.pp_spent=t, this.unit_counts=i, this.prize=n
	}

	return s.TYPE=e.id + "/PLAYER_BOUGHT_UNITS", s.SERVER_MESSAGE_TYPE="Ig\\TribalWars\\Events\\BarricadeEvent\\Messages\\MessagePlayerBoughtUnits", s.createFromDTO=function (e) {
		return new s(e.player_id, e.pp_spent, e.unit_counts, e.prize)
	}, s
});

;/**** game/Modules/EventBarricade/Models/Board/Board.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/Board/Board", [ "Ig/TribalWars/Modules/EventBarricade/Models/Board/Stage", "Ig/TribalWars/Modules/EventBarricade/Models/Board/Path" ], function (t, a) {
	function e() {
		this.stages={}, this.paths=[]
	}

	return e.prototype={
		addStage: function (t) {
			this.stages[t.id]=t
		}, createPath: function (t, e) {
			if (!this.hasStage(t)) throw"from stage does not exist on this board";
			if (!this.hasStage(e)) throw"to stage does not exist on this board";
			var s=this.stages[t], o=this.stages[e];
			this.paths.push(new a(s, o)), s.addSuccessorStage(o), o.addPredecessorStage(s)
		}, hasStage: function (t) {
			return void 0 !== this.stages[t]
		}, update: function (t) {
			var a=this;
			$.each(t.stages, function (t, e) {
				a.stages[t].update(e)
			})
		}
	}, e.createFromDTO=function (a) {
		var s=new e;
		return $.each(a.stages, function (a, e) {
			s.addStage(t.createFromDTO(e))
		}), a.paths.forEach(function (t) {
			s.createPath(t.from, t.to)
		}), s
	}, e
});

;/**** game/Modules/EventBarricade/Models/Board/Path.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/Board/Path", function () {
	function t(t, i) {
		this.from=t, this.to=i
	}

	return t.prototype={
		isAccessible: function () {
			return this.from.wasCleared()
		}, getId: function () {
			return s("%1-%2", this.from.id, this.to.id)
		}
	}, t
});

;/**** game/Modules/EventBarricade/Models/Board/Stage.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/Board/Stage", function () {
	function t(t, e, s, i, n, c, a) {
		this.id=t, this.ui_position=e, this.flavor_text=s, this.attacker_unit_capacity=i, this.rewards=n, this.bosses=c, this.unit_counts={}, this.succesor_stages=[], this.predecessor_stages=[], this.attacked=a
	}

	return t.STATUS_LOCKED="locked", t.STATUS_UNLOCKED="unlocked", t.STATUS_TEMPORARILY_LOCKED="temporarily_locked", t.prototype={
		unlock_time: null,
		cleared_count: 0,
		canBeAttacked: function (e) {
			return this.status(e) === t.STATUS_UNLOCKED
		},
		status: function (e) {
			return null === this.unlock_time ? t.STATUS_LOCKED :this.unlock_time > e ? t.STATUS_TEMPORARILY_LOCKED :t.STATUS_UNLOCKED
		},
		wasCleared: function () {
			return this.cleared_count > 0
		},
		getEarnableRewards: function () {
			var t=this;
			return this.rewards.filter(function (e) {
				return t.cleared_count < 1 || e.can_win_multiple
			})
		},
		getUnitCount: function (t) {
			return this.unit_counts[t] || 0
		},
		addSuccessorStage: function (t) {
			this.succesor_stages.push(t)
		},
		addPredecessorStage: function (t) {
			this.predecessor_stages.push(t)
		},
		update: function (t) {
			this.unlock_time=t.unlock_time, this.cleared_count=t.cleared_count, this.attacker_unit_capacity=t.attacker_unit_capacity, this.unit_counts=t.unit_counts
		}
	}, t.createFromDTO=function (e) {
		var s=new t(e.id, e.ui_position, e.flavor_text, e.attacker_unit_capacity, e.rewards, e.bosses, e.attacked);
		return s.update(e), s
	}, t
});

;/**** game/Modules/EventBarricade/Models/ActiveUnit.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/ActiveUnit", [ "module", "Ig/TribalWars/Modules/Common/Event/FiresEventsTrait" ], function (t, i) {
	function e() {
		(new i).mixinTo(this)
	}

	return e.EVENT_CHANGED=t.id + "/EVENT_CHANGED", e.prototype={
		_unit_type: null, setUnitType: function (t) {
			t !== this._unit_type && (this._unit_type=t, this.trigger(e.EVENT_CHANGED, {}))
		}, getUnitType: function () {
			return this._unit_type
		}
	}, e
});

;/**** game/Modules/EventBarricade/Models/EventState.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/EventState", [ "Ig/TribalWars/Modules/EventBarricade/Models/Player" ], function (e) {
	"use strict";
	var t=function () {
		this.player=new e, this.current_cycles={medic: null, daily: null}, this.daily_ranking={
			last_update: null,
			entries: []
		}, this.event_ranking={last_update: null, entries: []}, this.daily_cycle_history={
			last_update: null,
			entries: []
		}
	};
	return t.prototype={
		player: null, update: function (e) {
			this.player.update(e.player), this.updateCurrentCycles(e.current_cycles), this.updateDailyRanking(e.daily_ranking), this.updateEventRanking(e.event_ranking), this.updateDailyCycleHistory(e.daily_cycle_history)
		}, updateCurrentCycles: function (e) {
			var t=this;
			$.each(e, function (e, n) {
				var i=t.current_cycles[e];
				n && i && n.number === i.number || (t.current_cycles[e]=n)
			})
		}, updateDailyRanking: function (e) {
			this.daily_ranking.entries=e, this.daily_ranking.last_update=Timing.getCurrentServerTime()
		}, updateEventRanking: function (e) {
			this.event_ranking.entries=e, this.event_ranking.last_update=Timing.getCurrentServerTime()
		}, updateDailyCycleHistory: function (e) {
			this.daily_cycle_history.entries=e, this.daily_cycle_history.last_update=Timing.getCurrentServerTime()
		}
	}, t.createFromDTO=function (n, i) {
		var r=new t;
		return r.player=e.createFromDTO(n.player, i), r.update(n), r
	}, t
});

;/**** game/Modules/EventBarricade/Models/Medic.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/Medic", function () {
	function e(e, t) {
		this.cost_initial=e, this.cost_increase=t
	}

	return e.prototype={
		enabled: !0, feature: "HealUnits", calcNextVisitCost: function (e) {
			return this.cost_initial + e * this.cost_increase
		}
	}, e.createFromDTO=function (t) {
		var i=new e(t.cost_initial, t.cost_increase);
		return i.enabled=t.enabled, i.feature=t.feature, i
	}, e
});

;/**** game/Modules/EventBarricade/Models/PendingAttack.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/PendingAttack", [ "module", "Ig/TribalWars/Modules/Common/Event/FiresEventsTrait" ], function (t, n) {
	function i() {
		(new n).mixinTo(this), this._unit_counts={}, this._unit_sum=0
	}

	return i.EVENT_CHANGED=t.id + "/EVENT_CHANGED", i.prototype={
		setUnitCount: function (t, n) {
			var i=$.extend({}, this._unit_counts);
			i[t]=n, this.setUnitCounts(i)
		}, setUnitCounts: function (t) {
			var n={}, u=0;
			$.each(t, function (t, i) {
				n[t]=parseInt(i), u+=parseInt(i)
			}), this._unit_counts=n, this._unit_sum=u, this.trigger(i.EVENT_CHANGED, {})
		}, getUnitCount: function (t) {
			return this._unit_counts[t] || 0
		}, getUnitCounts: function () {
			return this._unit_counts
		}, sumUnitCounts: function () {
			return this._unit_sum
		}
	}, i
});

;/**** game/Modules/EventBarricade/Models/Player.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/Player", [ "Ig/TribalWars/Modules/EventBarricade/Models/UnitPool", "Ig/TribalWars/Modules/EventBarricade/Models/Board/Board" ], function (e, n) {
	"use strict";
	var a=function () {
		this.unit_pools={}, this.board=new n
	};
	return a.prototype={
		player_id: 0,
		currency_balance: 0,
		daily_healings_done: 0,
		daily_units_bought_random: 0,
		daily_units_found: 0,
		received_event_rank_reward: !1,
		stages_cleared: 0,
		update: function (e) {
			this.currency_balance=e.currency_balance, $.each(this.unit_pools, function (n, a) {
				a.update(e.unit_pools[n])
			}), this.daily_healings_done=e.daily_healings_done, this.daily_units_found=e.daily_units_found, this.daily_units_bought_random=e.daily_units_bought_random, this.received_event_rank_reward=e.received_event_rank_reward, this.stages_cleared=e.stages_cleared, this.board.update(e.board)
		},
		hasWoundedUnit: function () {
			for (var e in this.unit_pools) if (this.unit_pools.hasOwnProperty(e) && this.unit_pools[e].count_wounded > 0) return !0;
			return !1
		}
	}, a.createFromDTO=function (r, t) {
		var i=$.extend(!0, new a, r);
		return $.each(r.unit_pools, function (n, a) {
			i.unit_pools[n]=e.createFromDTO(a, t)
		}), i.board=n.createFromDTO(r.board), i
	}, a
});

;/**** game/Modules/EventBarricade/Models/UnitPool.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/UnitPool", [ "module", "Ig/TribalWars/Modules/Common/Event/FiresEventsTrait" ], function (n, t) {
	"use strict";
	var o=function (n, o, e) {
		(new t).mixinTo(this), this.unit_type=n, this.count_owned=o, this.count_wounded=e
	};
	return o.EVENT_COUNTS_CHANGED=n.id + "/COUNTS_CHANGED", o.prototype={
		countOwned: function () {
			return this.count_owned
		}, countWounded: function () {
			return this.count_wounded
		}, countUsable: function () {
			return this.count_owned - this.count_wounded
		}, update: function (n) {
			this.count_owned=n.count_owned, this.count_wounded=n.count_wounded, this.trigger(o.EVENT_COUNTS_CHANGED, {})
		}
	}, o.createFromDTO=function (n, t) {
		return new o(t[n.unit_type], n.count_owned, n.count_wounded)
	}, o
});

;/**** game/Modules/EventBarricade/Models/UnitType.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/UnitType", function () {
	function e(e, n, t, a, r, i) {
		this.id=e, this.name=n, this.name_plural=t, this.strength=a, this.pp_value=r, this.damage_bonuses=i
	}

	return e.ROLE_GOOD="good", e.ROLE_BAD="bad", e.prototype={
		getDamageBonusPercentAgainst: function (e) {
			for (var n=0; n < this.damage_bonuses.length; n++) {
				var t=this.damage_bonuses[n];
				if (t.unit_type_id === e) return t.percent_increase
			}
			return 0
		}, imageSrc: function (n) {
			return n=n || e.ROLE_GOOD, image_base + s("events/barricade/units/%1/%2.png", n, this.id)
		}
	}, e.createFromDTO=function (n) {
		return new e(n.id, n.name, n.name_plural, n.strength, n.pp_value, n.damage_bonuses)
	}, e.createMapFromDTO=function (n) {
		var t={};
		return $.each(n, function (n, a) {
			t[n]=e.createFromDTO(a)
		}), t
	}, e
});

;/**** game/Modules/EventBarricade/Models/UnitVendor.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Models/UnitVendor", function () {
	function e(e, t, r) {
		this.pp_cost_initial=e, this.unit_treasure_pool=t, this.currency_treasure_pool=r
	}

	return e.prototype={
		enabled: !0, feature: "BuyUnits", calcNextPurchaseCostRandom: function (e) {
			return this.pp_cost_initial + e * this.pp_cost_initial
		}
	}, e.createFromDTO=function (t) {
		var r=new e(t.pp_cost_initial, t.unit_treasure_pool, t.currency_treasure_pool);
		return r.enabled=t.enabled, r.feature=t.feature, r
	}, e
});

;/**** game/Modules/EventBarricade/Services/PlayerService.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Services/PlayerService", [ "module", "Ig/TribalWars/Modules/Common/Event/FiresEventsTrait", "Ig/TribalWars/Modules/Common/Event/Messages/MessageServerPublishedMessage" ], function (e, t, a) {
	function s(e, a) {
		(new t).mixinTo(this), this.event_state=e, this.player=e.player, this.message_bus=a
	}

	return s.EVENT_UPDATED_PLAYER=e + "/UPDATED_PLAYER", s.prototype={
		healUnits: function (e) {
			var t=this;
			TribalWars.post("event_barricade", {ajaxaction: "heal_units"}, {}, function (a) {
				t.handleFreshEventStateData(a.event_state), "function" == typeof e && e()
			})
		}, buyUnitsRandom: function (e, t) {
			var a=this;
			TribalWars.post("event_barricade", {ajaxaction: "buy_units_random"}, {}, function (t) {
				a.handleFreshEventStateData(t.event_state), a.dispatchServerMessages(t.messages), "function" == typeof e && e()
			}, t)
		}, attackStage: function (e, t, a, s) {
			var n=this;
			TribalWars.post("event_barricade", {ajaxaction: "attack_stage"}, {stage: e, units: t}, function (e) {
				n.handleFreshEventStateData(e.event_state), n.dispatchServerMessages(e.messages), "function" == typeof a && a()
			}, s)
		}, handleFreshEventStateData: function (e) {
			this.event_state.update(e), this.trigger(s.EVENT_UPDATED_PLAYER)
		}, dispatchServerMessages: function (e) {
			var t=this;
			e.forEach(function (e) {
				var s=new a(e);
				t.message_bus.dispatch(s.type, s)
			})
		}
	}, s
});

;/**** game/Modules/EventBarricade/Services/StageService.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Services/StageService", [ "Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StageWidget", "Ig/TribalWars/Modules/EventBarricade/Messages/MessagePlayerAttackedStage", "Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryAttackResult" ], function (e, t, a) {
	"use strict";
	var i=function (e, t, a, i, s) {
		this.board=e, this.unit_pools=t, this.unit_types=a, this.player_service=i, this.bus=s, this.watchBus()
	};
	return i.prototype={
		watchBus: function () {
			var e=this;
			this.bus.registerHandler(t.TYPE, function (t) {
				Dialog.close(), e.board.stages[t.stage_id].attacked="defender" === t.battle_result.winner, e.openAttackResultPopup(e.board.stages[t.stage_id], t.battle_result, t.rewards, e.player_service)
			})
		}, openStagePopup: function (t) {
			if (!this.board.hasStage(t)) throw"stage #" + t + " does not exist";
			var a="event-barricade-stage-" + t,
				i=new e(this.board.stages[t], this.unit_pools, this.unit_types, this.player_service);
			Dialog.openWidget(a, i, null, {
				class_name: "dialog-event-barricade-stage",
				priority: Dialog.PRIORITY_IMPORTANT
			})
		}, openAttackResultPopup: function (e, t, i, s) {
			var r=$(new a(this.unit_types, e, t, i, s).createHtml()), n=this;
			r.find(".button-continue").click(function (e) {
				e.preventDefault(), Dialog.close()
			}), r.find(".button-attack-again").click(function (t) {
				t.preventDefault(), Dialog.close(), n.openStagePopup(e.id)
			}), Dialog.show("event-barricade-attack-result", r, null, {priority: Dialog.PRIORITY_IMPORTANT})
		}
	}, i
});

;/**** game/Modules/EventBarricade/Services/UnitStatsService.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Services/UnitStatsService", [ "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsWidget" ], function (t) {
	"use strict";
	var i=function (t, i) {
		this.unit_types=t, this.unit_pools=i
	};
	return i.prototype={
		openUnitStatsPopup: function (i) {
			var e="event-barricade-unit-stats-" + i, n=new t(this.unit_pools[i], this.unit_types);
			Dialog.openWidget(e, n, null, {class_name: "dialog-event-barricade-unit-stats"})
		}
	}, i
});

;/**** game/Modules/EventBarricade/Services/UnitVendorService.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Services/UnitVendorService", [ "Ig/TribalWars/Modules/EventBarricade/Messages/MessagePlayerBoughtUnits", "Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryUnitPurchaseConfirm", "Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryUnitPurchaseResult" ], function (e, t, r) {
	"use strict";

	function i(e, t, r, i) {
		this.unit_vendor=e, this.unit_types=t, this.player_service=r, this.bus=i, this.watchBus()
	}

	return i.prototype={
		watchBus: function () {
			var t=this;
			this.bus.registerHandler(e.TYPE, function (e) {
				Dialog.close(), t.openPurchaseResultPopup(e.unit_counts, e.prize)
			})
		}, openPurchaseConfirmationPopup: function () {
			var e=this.unit_vendor,
				r=e.calcNextPurchaseCostRandom(this.player_service.player.daily_units_bought_random), i=this, n={
					id: "barricade-unit-purchase-confirmation-box", createContentHtml: function (n) {
						return new t(r, e.unit_treasure_pool, e.currency_treasure_pool, i.unit_types).createHtml()
					}
				};
			Premium.check(e.feature, r, function () {
				i.player_service.buyUnitsRandom()
			}, null, null, n)
		}, openPurchaseResultPopup: function (e, t) {
			var i=new r(this.unit_types, e, t).createHtml();
			Dialog.show("event-barricade-unit-purchase-result", i)
		}
	}, i
});

;/**** game/Modules/EventBarricade/UIFactories/UIFactoryAttackResult.js ****/
define("Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryAttackResult", [ "Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryReward", "Ig/TribalWars/Modules/EventBarricade/Models/UnitType" ], function (t, e) {
	function a(t, e, a, i, s) {
		this.unit_types=t, this.stage=e, this.battle_result=a, this.rewards=i, this.player=s
	}

	return a.prototype={
		createHtml: function () {
			return '<div class="attack-result"><div class="win-status-header ' + this.winStatusClass() + '">' + this.createWinStatusHtml() + '</div><div class="armies-section"><div class="attacker-section"><div class="attacker-label">' + _("b37fef749e23bf4ac9d7db5bca576550") + '</div><div class="attacker-units">' + this.createAttackerUnitsHtml() + '</div></div><div class="defender-section"><div class="defender-label">' + _("2b3656783601d7befbefbcd0feddf9b2") + '</div><div class="defender-units">' + this.createDefenderUnitsHtml() + '</div></div></div><div class="rewards-section"><div class="titled-border-top"><div class="left-line"></div><div class="title rewards-label">' + this.rewardsLabel() + '</div><div class="right-line"></div></div><div class="titled-border-content"><div class="rewards">' + this.createRewardsHtml() + '</div></div></div><div class="action-container">' + this.createAttackButtonHtml() + '<a href="#" class="btn btn-default button-continue">' + _("606a619cc5b693301d9f293f510f482c") + "</a></div></div>"
		}, createAttackButtonHtml: function () {
			var t=!1;
			return $.each(this.player.player.unit_pools, function (e, a) {
				a.countUsable() > 0 && (t= !0)
			}), "defender" === this.battle_result.winner && t ? '<a href="#" class="btn btn-default button-attack-again">' + _("f88dae257f68cdc6b7496fa810fbc1ea") + "</a>" :""
		}, createWinStatusHtml: function () {
			return '<div class="' + [ "win-status", this.winStatusClass() ].join(" ") + '">' + this.winStatusText() + "</div>"
		}, winStatusText: function () {
			return "attacker" === this.battle_result.winner ? _("1f5c647d9066bc9e350b70aa2d16aec4") :_("570e9d24849e2161b5a969599fb03446")
		}, winStatusClass: function () {
			return "attacker" === this.battle_result.winner ? "win" :"lose"
		}, createAttackerUnitsHtml: function () {
			var t=this, a="";
			return $.each(this.unit_types, function (i, s) {
				a+=t.createUnitHtml(s, t.battle_result.attacker_units[i], t.battle_result.attacker_units_lost[i], e.ROLE_GOOD)
			}), a
		}, createDefenderUnitsHtml: function () {
			var t=this, a="";
			return $.each(this.unit_types, function (i, s) {
				a+=t.createUnitHtml(s, t.battle_result.defender_units[i], t.battle_result.defender_units_lost[i], e.ROLE_BAD)
			}), a
		}, createUnitHtml: function (t, e, a, i) {
			return mobile ? this.createUnitHtmlMobile(t, e, a, i) :this.createUnitHtmlDesktop(t, e, a, i)
		}, createUnitHtmlDesktop: function (t, e, a, i) {
			var s=[ "unit" ];
			return 0 === e && s.push("faded"), '<div class="' + s.join(" ") + '"><div class="portrait" style="background-image:url(' + t.imageSrc(i) + ');"></div><div class="unit-name">' + t.name + '</div><div class="count">' + e + '</div><div class="count-lost">' + -a + "</div></div>"
		}, createUnitHtmlMobile: function (t, e, a, i) {
			var s=[ "unit" ];
			0 === e && s.push("faded");
			var r='<div class="portrait" style="background-image:url(' + t.imageSrc(i) + ');"></div>';
			return '<div class="' + s.join(" ") + '">' + ("good" === i ? r :"") + '<div class="content"><div class="count">' + e + '</div><div class="count-lost">' + -a + "</div></div>" + ("bad" === i ? r :"") + "</div>"
		}, rewardsLabel: function () {
			return this.rewards.length > 0 ? _("0d1c608c1498367815da8105e26b0a9e") :_("6415235591a1c653f82a1042f9969b26")
		}, createRewardsHtml: function () {
			return (this.rewards.length > 0 ? this.rewards :this.stage.getEarnableRewards()).map(function (e) {
				return new t(e).createHtml()
			}).join("")
		}
	}, a
});

;/**** game/Modules/EventBarricade/UIFactories/UIFactoryDailyUnitsInfo.js ****/
define("Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryDailyUnitsInfo", function () {
	function a(a) {
		this.reward=a
	}

	return a.prototype={
		createHeaderHtml: function () {
			return '<div class="daily-units-info-header"><span class="icon-info"></span><span class="icon-package"></span></div>'
		}, createMessageHtml: function () {
			return '<div class="daily-units-info-message"><p>' + _("7ac9a8d03eda86e476aa92856c94f429") + "</p><ul><li>" + _("b12137fba1fa5950c0a1c66bc35f866d") + "</li><li>" + _("7b5dc3752f6273d38b35c8f0738c309d") + "</li><li>" + _("87661106e0399b96a646e331f3afed17") + "</li><li>" + _("e3cd5b2c64ca319aadec7c28c6c6feba") + "</li><li>" + _("1b4f187ce28a20f74c91241dc95d5a34") + "</li></ul></div>"
		}
	}, a
});

;/**** game/Modules/EventBarricade/UIFactories/UIFactoryReward.js ****/
define("Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryReward", function () {
	function r(r) {
		this.reward=r
	}

	return r.prototype={
		createHtml: function () {
			return '<div class="reward ' + this.reward.type + '">' + this.createContentHtml() + "</div>"
		}, createContentHtml: function () {
			switch (this.reward.type) {
				case"item":
					return this.createItemHtml(this.reward.item);
				case"currency":
					return this.createCurrencyHtml(this.reward.currency, this.reward.currency_amount);
				default:
					return JSON.stringify(this.reward)
			}
		}, createItemHtml: function (r) {
			return ItemUIFactory.createDetailHtml(r)
		}, createCurrencyHtml: function (r, e) {
			return '<img class="currency-image" src="' + (image_base + "events/barricade/currency_80.png") + '"><span class="currency-amount">' + e + "</span>"
		}
	}, r
});

;/**** game/Modules/EventBarricade/UIFactories/UIFactoryUnitPurchaseConfirm.js ****/
define("Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryUnitPurchaseConfirm", function () {
	function e(e, a, r, t) {
		this.pp_cost=e, this.unit_treasure_pool=a, this.currency_treasure_pool=r, this.unit_types=t
	}

	return e.prototype={
		createHtml: function () {
			return '<div class="unit-purchase-confirm"><h3>' + _("fde65b75a6249d63a5280dfc2dd40a99") + '</h3><div class="treasure-pools"><div class="units-section"><div class="header">' + _("5d4b25d443c5be649c01ad1e3347fa2e") + "</div>" + this.createUnitTreasurePoolHtml() + '</div><div class="plus">' + _("be5d5d37542d75f93a87094459f76678") + '</div><div class="currency-section"><div class="header">' + _("bead2ea310281be0efafa8cb1e269034") + "</div>" + this.createCurrencyTreasurePoolHtml() + '</div></div><p class="message">' + this.createMessageText() + "</p></div>"
		}, createMessageText: function () {
			return s(_("2a8a83c6b751b1848f60ac30e473f882"), this.pp_cost)
		}, createUnitTreasurePoolHtml: function () {
			var e=this;
			return this.createTreasurePoolHtml(this.unit_treasure_pool, _("19c562a36aeb455d09534f93b4f5236f"), function (a) {
				var r=e.unit_types[a.unit_id];
				return '<span class="treasure-image" style="background-image: url(' + r.imageSrc() + ');"></span><span>' + s("%1 %2", a.unit_amount, r.name_plural) + "</span>"
			})
		}, createCurrencyTreasurePoolHtml: function () {
			return this.createTreasurePoolHtml(this.currency_treasure_pool, _("35281ac0e8d77e142fdcd41c07ce47dd"), function (e) {
				return '<span class="treasure-image" style="background-image: url(' + image_base + 'events/barricade/currency_80.png);"></span><span>' + s("%1 %2", e.currency_amount, e.currency.name_plural) + "</span>"
			})
		}, createTreasurePoolHtml: function (e, a, r) {
			var t=this;
			return '<table class="treasure-pool vis"><tr><th>' + a + "</th><th>" + _("7fcbebe44a3ba2d162be939560e75688") + "</th></tr>" + e.possible_packages.map(function (e) {
				return t.createPossiblePackageHtml(e, r)
			}).join("") + "</table>"
		}, createPossiblePackageHtml: function (e, a) {
			var r=e.treasure_package.treasures[0], t=[];
			return r.extra.is_jackpot && t.push("jackpot"), '<tr class="' + t.join(" ") + '"><td>' + a(r) + "</td><td>" + e.chance_percent + "%</td></tr>"
		}
	}, e
});

;/**** game/Modules/EventBarricade/UIFactories/UIFactoryUnitPurchaseResult.js ****/
define("Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryUnitPurchaseResult", function () {
	function e(e, i, t) {
		this.unit_types=e, this.unit_counts=i, this.prize=t
	}

	return e.prototype={
		createHtml: function () {
			return '<div class="unit-purchase-result"><div class="header">' + _("a03645c47dd08b4455fbe3dd5d6b577a") + '</div><div class="rewards">' + this.createRewardHtmlEntries().join("") + '</div><div class="action-container"><a href="#" class="btn btn-confirm-yes" onclick="return Dialog.close();">' + _("a0bfb8e59e6c13fc8d990781f77694fe") + "</a></div></div>"
		}, createRewardHtmlEntries: function () {
			var e=[], i=this;
			return $.each(this.unit_counts, function (t, r) {
				e.push(i.createUnitHtml(t, r))
			}), e.push(this.createPrizeHtml(this.prize.currency_amount, this.prize.extra.is_jackpot)), e
		}, createUnitHtml: function (e, i) {
			var t=this.unit_types[e];
			return '<div class="reward unit"><div class="image" style="background-image:url(' + t.imageSrc() + ');"></div><div class="amount">' + s("%1 %2", i, t.name_plural) + "</div></div>"
		}, createPrizeHtml: function (e, i) {
			var t=image_base + "events/barricade/currency_80.png";
			return '<div class="reward currency"><div class="image ' + (i ? "jackpot" :"") + '" style="background-image:url(' + t + ');"></div><div class="amount">' + s("%1 %2", e, this.prize.currency.name_plural) + "</div></div>"
		}
	}, e
});

;/**** game/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController", "Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/ViewEvents", "Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/StateReductionActions", "Ig/TribalWars/Modules/EventBarricade/Models/PendingAttack", "Ig/TribalWars/Modules/EventBarricade/Models/ActiveUnit" ], function (t, e, i, n, a) {
	"use strict";

	function r() {
		t.apply(this)
	}

	return r.prototype=Object.create(t.prototype), $.extend(r.prototype, {
		_watchModels: function () {
			var t=this._widget, e=this._models.pending_attack;
			this._watchModelForEvent(e, n.EVENT_CHANGED, function (e) {
				var i=Timing.getCurrentServerTime();
				t.update(i)
			}), this._watchModelForEvent(this._models.active_attacker, a.EVENT_CHANGED, function (e) {
				var i=Timing.getCurrentServerTime();
				t.update(i)
			})
		}, _watchView: function () {
			var t=this, n=this._widget, a=this._models.pending_attack, r=this._models.unit_pool.unit_type,
				o=this._models.active_attacker;
			this._models.stage;
			this._watchViewForEvent(e.USER_STARTED_EDITING, function (t) {
				var e=Timing.getCurrentServerTime();
				n.applyActionToState(i.USER_EDIT_MODE_ENTER, {}, e)
			}), this._watchViewForEvent(e.USER_STOPPED_EDITING, function (t) {
				var e=Timing.getCurrentServerTime();
				n.applyActionToState(i.USER_EDIT_MODE_EXIT, {}, e)
			}), this._watchViewForEvent(e.UNIT_COUNT_EDITED, function (t) {
				var e=Timing.getCurrentServerTime();
				a.setUnitCount(r.id, t.new_count), n.update(e)
			}), this._watchViewForEvent(e.USER_FOCUS_STARTED, function (t) {
				o.setUnitType(r)
			}), this._watchViewForEvent(e.USER_FOCUS_ENDED, function (t) {
				o.setUnitType(null)
			}), this._watchViewForEvent(e.USABLE_COUNT_PRESSED, function (e) {
				t.fillUnits()
			}), this._watchViewForEvent(e.PORTRAIT_PRESSED, function (e) {
				mobile ? o.setUnitType(r) :t.fillUnits()
			})
		}, fillUnits: function () {
			var t=this._widget, e=this._models.pending_attack, i=this._models.unit_pool, n=i.unit_type,
				a=this._models.stage, r=e.getUnitCount(n.id), o=e.sumUnitCounts() - r,
				s=Math.max(0, a.attacker_unit_capacity - o), c=Math.min(s, i.countUsable());
			c === r && (c=0);
			var _=Timing.getCurrentServerTime();
			e.setUnitCount(n.id, c), t.update(_)
		}
	}), r
});

;/**** game/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer", "Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/StateReductionActions" ], function (t, e) {
	"use strict";

	function n() {
		t.apply(this)
	}

	return n.prototype=Object.create(t.prototype), $.extend(n.prototype, {
		newStateFromNothing: function () {
			return {
				image_src: "",
				unit_name: "bob",
				count_usable: 42,
				count_filled: 0,
				are_too_many_filled: !1,
				is_user_editing: !1,
				is_unit_active: !1
			}
		}, newStateFromModels: function (t, e, n) {
			var i=e.unit_pool.unit_type, r=$.extend(!0, {}, t, {
				image_src: i.imageSrc(),
				unit_name: i.name,
				count_usable: e.unit_pool.countUsable(),
				count_filled: e.pending_attack.getUnitCount(i.id),
				is_unit_active: i === e.active_attacker.getUnitType()
			});
			return r.are_too_many_filled=r.count_filled > r.count_usable, r
		}
	}), n.prototype._action_reducers[e.USER_EDIT_MODE_ENTER]=function (t, e, n) {
		var i=$.extend(!0, {}, t);
		return i.is_user_editing= !0, i
	}, n.prototype._action_reducers[e.USER_EDIT_MODE_EXIT]=function (t, e, n) {
		var i=$.extend(!0, {}, t);
		return i.is_user_editing= !1, i
	}, n
});

;/**** game/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView", "Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/ViewEvents" ], function (t, i) {
	"use strict";

	function n() {
		t.apply(this)
	}

	return n.MAX_DIGITS_FOR_UNIT_COUNT=5, n.prototype=Object.create(t.prototype), $.extend(n.prototype, {
		_initStructure: function (t) {
			var i=$(this.createHtml());
			this.$portrait=i.find(".portrait"), this.$unit_name=i.find(".unit-name"), this.$count_usable=i.find(".count-usable"), this.$input_count=i.find(".input-count"), this._setRootElement(i)
		}, createHtml: function () {
			return mobile ? this.createHtmlMobile() :this.createHtmlDesktop()
		}, createHtmlDesktop: function () {
			return '<div class="attacking-unit-widget"><div class="portrait"></div><div class="unit-name"></div><div class="count-usable-container"><a href="#" class="count-usable"></a></div><div class="input-count-section"><input type="text" class="input-count"/></div></div>'
		}, createHtmlMobile: function () {
			return '<div class="attacking-unit-widget"><div class="portrait"></div><div class="content"><div class="count-usable-container"><a href="#" class="count-usable"></a></div><div class="input-count-section"><input type="text" class="input-count"/></div></div></div>'
		}, _initEventPublishing: function () {
			var t=this;
			this.$input_count.on("keydown", function () {
				t.trigger(i.USER_STARTED_EDITING, {})
			}).on("keyup focusout", function () {
				t.trigger(i.USER_STOPPED_EDITING, {})
			}).on("change keyup", function () {
				t.trigger(i.UNIT_COUNT_EDITED, {new_count: Math.abs(parseInt(t.$input_count.val().substr(0, n.MAX_DIGITS_FOR_UNIT_COUNT)) || 0)})
			}).on("focus", function () {
				t.trigger(i.USER_FOCUS_STARTED, {})
			}), this._$root.on("mouseover", function () {
				t.trigger(i.USER_FOCUS_STARTED, {})
			}).on("mouseout", function () {
				t.trigger(i.USER_FOCUS_ENDED, {})
			}), this.$count_usable.on("click", function (n) {
				n.preventDefault(), t.trigger(i.USABLE_COUNT_PRESSED, {})
			}), this.$portrait.on("click", function () {
				t.trigger(i.PORTRAIT_PRESSED, {})
			})
		}, _render: function (t, i) {
			t && i.image_src === t.image_src || this.$portrait.css("background-image", "url(" + i.image_src + ")"), t && i.unit_name === t.unit_name || this.$unit_name.html(i.unit_name), t && i.count_usable === t.count_usable || this.$count_usable.html(i.count_usable), i.is_user_editing || this.$input_count.val(i.count_filled || ""), t && i.are_too_many_filled === t.are_too_many_filled || this.$input_count.toggleClass("warn", i.are_too_many_filled), t && i.is_unit_active === t.is_unit_active || this._$root.toggleClass("unit-active", i.is_unit_active)
		}
	}), n
});

;/**** game/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitView", "Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitController", "Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitStateReducer" ], function (t, e, i, a) {
	"use strict";

	function n(n, r, s, d) {
		t.apply(this), this._models={
			unit_pool: n,
			pending_attack: r,
			active_attacker: s,
			stage: d
		}, this._services={}, this._view=new e, this._controller=new i, this._state_reducer=new a
	}

	return n.prototype=Object.create(t.prototype), $.extend(n.prototype, {}), n
});

;/**** game/Modules/EventBarricade/Widgets/AttackingUnitWidget/StateReductionActions.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/StateReductionActions", [ "module" ], function (e) {
	return {USER_EDIT_MODE_ENTER: e.id + "/user_edit_mode_enter", USER_EDIT_MODE_EXIT: e.id + "/user_edit_mode_exit"}
});

;/**** game/Modules/EventBarricade/Widgets/AttackingUnitWidget/ViewEvents.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/ViewEvents", [ "module" ], function (e) {
	return {
		UNIT_COUNT_EDITED: e.id + "/unit_count_edited",
		USER_STARTED_EDITING: e.id + "/user_started_editing",
		USER_STOPPED_EDITING: e.id + "/user_stopped_editing",
		USER_FOCUS_STARTED: e.id + "/user_selected",
		USER_FOCUS_ENDED: e.id + "/user_deselected",
		USABLE_COUNT_PRESSED: e.id + "/usable_count_pressed",
		PORTRAIT_PRESSED: e.id + "/portrait_pressed"
	}
});

;/**** game/Modules/EventBarricade/Widgets/BoardWidget/BoardController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/BoardWidget/BoardController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController" ], function (t) {
	"use strict";

	function e() {
		t.apply(this)
	}

	return e.prototype=Object.create(t.prototype), $.extend(e.prototype, {}), e
});

;/**** game/Modules/EventBarricade/Widgets/BoardWidget/BoardStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/BoardWidget/BoardStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (e) {
	"use strict";

	function t() {
		e.apply(this)
	}

	return t.prototype=Object.create(e.prototype), $.extend(t.prototype, {
		newStateFromNothing: function () {
			return {is_visible: !0}
		}, newStateFromModels: function (e, t, r) {
			return {is_visible: t.time_end_play > r / 1e3}
		}
	}), t
});

;/**** game/Modules/EventBarricade/Widgets/BoardWidget/BoardView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/BoardWidget/BoardView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView" ], function (t) {
	"use strict";

	function i() {
		t.apply(this)
	}

	return i.prototype=Object.create(t.prototype), $.extend(i.prototype, {
		_initStructure: function (t) {
			var i=$(this.createHtml(t));
			this.$paths_container=i.find(".paths-container"), this.$stages_container=i.find(".stages-container"), this._setRootElement(i)
		}, createHtml: function (t) {
			return '<div class="board-widget"><div class="map"><div class="background"></div><div class="paths-container"></div><div class="stages-container"></div></div></div>'
		}, _render: function (t, i) {
			t && i.is_visible === t.is_visible || this._$root.toggle(i.is_visible)
		}
	}), i
});

;/**** game/Modules/EventBarricade/Widgets/BoardWidget/BoardWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/BoardWidget/BoardWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/BoardWidget/BoardView", "Ig/TribalWars/Modules/EventBarricade/Widgets/BoardWidget/BoardController", "Ig/TribalWars/Modules/EventBarricade/Widgets/BoardWidget/BoardStateReducer", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/PathWidget/PathWidget" ], function (e, t, i, a, d, r) {
	"use strict";

	function s(d, r, s) {
		e.apply(this), this._models={
			board: d,
			time_end_play: s
		}, this._services={stage: r}, this._view=new t, this._controller=new i, this._state_reducer=new a
	}

	return s.prototype=Object.create(e.prototype), $.extend(s.prototype, {
		did_sub_widgets_init: !1,
		_initSubWidgets: function (e, t, i) {
			if (!this.did_sub_widgets_init) {
				var a=this, s=this._view.$stages_container;
				$.each(this._models.board.stages, function (e, t) {
					var r="stage_" + e, o=new d(t, a._services.stage);
					a._addSubWidget(r, o, s, !1, i)
				});
				var o=this._view.$paths_container;
				$.each(this._models.board.paths, function (e, t) {
					var d="path_" + t.getId(), s=new r(t);
					a._addSubWidget(d, s, o, !1, i)
				}), this.did_sub_widgets_init= !0
			}
		}
	}), s
});

;/**** game/Modules/EventBarricade/Widgets/DailyHistoryWidget/DailyHistoryStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyHistoryWidget/DailyHistoryStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (e) {
	"use strict";

	function t() {
		e.apply(this)
	}

	return t.prototype=Object.create(e.prototype), $.extend(t.prototype, {
		newStateFromNothing: function () {
			return {
				widget_class: "daily-history-widget",
				is_visible: !0,
				title: _("16d2b386b2034b9488996466aaae0b57"),
				cycle_label: _("0ff6922a6d045dcc0676785b04bb3333"),
				time_entries_generated: null,
				entries: [],
				entry_display_count: 7
			}
		}, newStateFromModels: function (e, t, r) {
			var i=t.event_state.current_cycles.daily, n=t.event_state.daily_cycle_history, a=i && 1 === i.number,
				s=$.extend(!0, {}, e, {is_visible: !a, time_entries_generated: n.last_update});
			return s.time_entries_generated !== e.time_entries_generated && (s.entries=n.entries.map(function (e) {
				var t=e.stages_cleared && e.rewards_received.length < 1;
				return {
					day: e.cycle_number,
					participated: e.stages_cleared > 0,
					in_progress: !!i && e.cycle_number === i.number,
					rank_processing_pending: t,
					rank: t ? "-" :e.final_rank || "-",
					rewards: e.rewards_received
				}
			}).filter(function (e) {
				return !e.in_progress
			}).reverse()), s
		}
	}), t
});

;/**** game/Modules/EventBarricade/Widgets/DailyHistoryWidget/DailyHistoryWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyHistoryWidget/DailyHistoryWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/RewardedRanking/Widgets/RewardedRankingHistoryWidget/RewardedRankingHistoryView", "Ig/TribalWars/Modules/Common/Widget/NullController", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyHistoryWidget/DailyHistoryStateReducer" ], function (e, t, i, r) {
	"use strict";

	function s(s, a) {
		e.apply(this), this._models={event_state: s}, this._services={}, this._view=new t(a), this._controller=new i, this._state_reducer=new r
	}

	return s.prototype=Object.create(e.prototype), $.extend(s.prototype, {}), s
});

;/**** game/Modules/EventBarricade/Widgets/DailyRankingWidget/DailyRankingStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyRankingWidget/DailyRankingStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (e) {
	"use strict";

	function t() {
		e.apply(this)
	}

	return t.prototype=Object.create(e.prototype), $.extend(t.prototype, {
		newStateFromNothing: function () {
			return {
				widget_class: "daily-ranking-widget",
				is_visible: !0,
				title: _("cf16ab3715d2df610b3bc0dc520657d4"),
				score_label: _("e6025484f1122d64295d8b8503a414a7"),
				countdown_visible: !0,
				seconds_remaining: 69,
				time_entries_generated: null,
				entries: [],
				entry_display_count: 7,
				status_text: "",
				status_visible: !1
			}
		}, newStateFromModels: function (e, t, n) {
			var i=t.event_state.current_cycles.daily, r=t.event_state.daily_ranking,
				a=$.extend(!0, {}, e, {is_visible: null !== i, time_entries_generated: r.last_update});
			return a.time_entries_generated !== e.time_entries_generated && (a.entries=r.entries.map(function (e) {
				return {
					rank: e.rank,
					score: e.score,
					rewards: e.rewards,
					player_id: e.player_id,
					player_name: e.player_name,
					is_me: e.player_id === t.event_state.player.player_id
				}
			})), a.seconds_remaining=null === i ? 0 :Math.max(0, Math.round(i.time_end - n / 1e3)), a.countdown_visible=a.seconds_remaining > 0, a
		}
	}), t
});

;/**** game/Modules/EventBarricade/Widgets/DailyRankingWidget/DailyRankingWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyRankingWidget/DailyRankingWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/RewardedRanking/Widgets/RewardedRankingWidget/RewardedRankingView", "Ig/TribalWars/Modules/Common/Widget/NullController", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyRankingWidget/DailyRankingStateReducer", "Ig/TribalWars/Modules/RewardedRanking/UIFactories/RankedEntity/UIFactoryRankedPlayer" ], function (e, t, i, a, r) {
	"use strict";

	function n(n, d) {
		e.apply(this), this._models={event_state: n}, this._services={}, this._view=new t(d, new r), this._controller=new i, this._state_reducer=new a
	}

	return n.prototype=Object.create(e.prototype), $.extend(n.prototype, {}), n
});

;/**** game/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/ViewEvents", "Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryDailyUnitsInfo" ], function (e, t, i) {
	"use strict";

	function a() {
		e.apply(this)
	}

	return a.prototype=Object.create(e.prototype), $.extend(a.prototype, {
		_watchView: function () {
			var e=this;
			this._watchViewForEvent(t.INFO_ICON_PRESSED, function (t) {
				e.openInfoDialog()
			})
		}, openInfoDialog: function () {
			var e=new i,
				t=$('<div class="daily-units-info">' + e.createHeaderHtml() + e.createMessageHtml() + '<div class="action-container"><a href="#" class="btn btn-confirm-yes">' + _("a0bfb8e59e6c13fc8d990781f77694fe") + "</a></div></div>");
			t.find(".btn").on("click", function (e) {
				e.preventDefault(), Dialog.close()
			}), Dialog.show("barricade_daily_units_info", t)
		}
	}), a
});

;/**** game/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (t) {
	"use strict";

	function e() {
		t.apply(this)
	}

	return e.prototype=Object.create(t.prototype), $.extend(e.prototype, {
		newStateFromNothing: function () {
			return {visible: !0, title: _("1152b77caaa7faa3b651423f3a31f447"), packages_found: 2, packages_not_found: 8}
		}, newStateFromModels: function (t, e, a) {
			var n=e.event_state.current_cycles.daily, i=e.event_state.player.daily_units_found;
			return $.extend(!0, {}, t, {
				visible: null !== n,
				packages_found: i,
				packages_not_found: Math.max(0, e.unit_finder.daily_limit - i)
			})
		}
	}), e
});

;/**** game/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView", "Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryDailyUnitsInfo", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/ViewEvents" ], function (t, i, e) {
	"use strict";

	function s() {
		t.apply(this)
	}

	return s.prototype=Object.create(t.prototype), $.extend(s.prototype, {
		tooltips_initd: !1, _initStructure: function (t) {
			var i=$(this.createHtml());
			this.$title=i.find(".title"), this.$packages=i.find(".packages"), this.$info_icon=i.find(".icon.info-med"), this._setRootElement(i)
		}, createHtml: function () {
			return mobile ? this.createHtmlMobile() :this.createHtmlDesktop()
		}, createHtmlDesktop: function () {
			return '<div class="daily-units-widget"><div class="titled-border-top"><div class="left-line"></div><div class="title"></div><div class="right-line"></div></div><div class="titled-border-content"><div class="packages"></div></div></div>'
		}, createHtmlMobile: function () {
			return '<tbody class="daily-units-widget"><tr><td><span class="title"></span><span class="icon info-med float_right"></span></td><td class="packages" colspan="2"></td></tr></tbody>'
		}, _initEventPublishing: function () {
			var t=this;
			this.$info_icon.on("click", function (i) {
				i.preventDefault(), t.trigger(e.INFO_ICON_PRESSED, {})
			})
		}, _render: function (t, i) {
			t && i.visible === t.visible || this._$root.toggle(i.visible), t && i.title === t.title || this.$title.html(i.title), t && i.packages_found === t.packages_found && i.packages_not_found === t.packages_not_found || this.$packages.html(this.createPackagesHtml(i.packages_found, i.packages_not_found)), this.tooltips_initd || this.initTooltips()
		}, createPackagesHtml: function (t, i) {
			for (var e="", s=0, n=0; n < t; n++, s++) e+=this.lineBreakIfMobileAndMultipleOf5(s), e+='<div class="package found"></div>';
			for (n=0; n < i; n++, s++) e+=this.lineBreakIfMobileAndMultipleOf5(s), e+='<div class="package not-found"></div>';
			return e
		}, lineBreakIfMobileAndMultipleOf5: function (t) {
			return mobile && t > 0 && t % 5 == 0 ? "<br/>" :""
		}, initTooltips: function () {
			mobile || (UI.ToolTip(this._$root), this._$root.prop("title", " :: " + (new i).createMessageHtml()).trigger("tooltip_change"), this.tooltips_initd= !0)
		}
	}), s
});

;/**** game/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsView", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsController", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsStateReducer" ], function (e, t, i, s) {
	"use strict";

	function r(r, a) {
		e.apply(this), this._models={
			event_state: r,
			unit_finder: a
		}, this._services={}, this._view=new t, this._controller=new i, this._state_reducer=new s
	}

	return r.prototype=Object.create(e.prototype), $.extend(r.prototype, {}), r
});

;/**** game/Modules/EventBarricade/Widgets/DailyUnitsWidget/ViewEvents.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/ViewEvents", [ "module" ], function (e) {
	return {INFO_ICON_PRESSED: e.id + "/INFO_ICON_PRESSED"}
});

;/**** game/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController", "Ig/TribalWars/Modules/EventBarricade/Models/ActiveUnit" ], function (e, t) {
	"use strict";

	function r() {
		e.apply(this)
	}

	return r.prototype=Object.create(e.prototype), $.extend(r.prototype, {
		_watchModels: function () {
			var e=this._widget;
			this._watchModelForEvent(this._models.active_attacker, t.EVENT_CHANGED, function (t) {
				var r=Timing.getCurrentServerTime();
				e.update(r)
			})
		}
	}), r
});

;/**** game/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer", "Ig/TribalWars/Modules/EventBarricade/Models/UnitType" ], function (e, t) {
	"use strict";

	function n() {
		e.apply(this)
	}

	return n.prototype=Object.create(e.prototype), $.extend(n.prototype, {
		newStateFromNothing: function () {
			return {
				fade_everything: !1,
				image_src: "",
				unit_name: "bob",
				count: 42,
				attacker_effectiveness_icon_count: 0,
				attacker_effectiveness_class: "good"
			}
		}, newStateFromModels: function (e, n, a) {
			var c=n.unit_type, i=n.stage.getUnitCount(c.id), s=$.extend(!0, {}, e, {
					fade_everything: 0 === i,
					image_src: c.imageSrc(t.ROLE_BAD),
					unit_name: c.name,
					count: i > 0 ? i :"-"
				}), r=n.active_attacker.getUnitType(), o=r ? r.getDamageBonusPercentAgainst(c.id) :0,
				_=r ? c.getDamageBonusPercentAgainst(r.id) :0;
			return o ? (s.attacker_effectiveness_icon_count=o >= 50 ? 2 :1, s.attacker_effectiveness_class="good") :_ ? (s.attacker_effectiveness_icon_count=_ >= 50 ? 2 :1, s.attacker_effectiveness_class="bad") :(s.attacker_effectiveness_icon_count=0, s.attacker_effectiveness_class="meh"), s
		}
	}), n
});

;/**** game/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView" ], function (e) {
	"use strict";

	function t() {
		e.apply(this)
	}

	return t.prototype=Object.create(e.prototype), $.extend(t.prototype, {
		_initStructure: function (e) {
			var t=$(this.createHtml());
			this.$portrait=t.find(".portrait"), this.$attacker_effectiveness=t.find(".attacker-effectiveness"), this.$unit_name=t.find(".unit-name"), this.$count=t.find(".count"), this._setRootElement(t)
		}, createHtml: function () {
			return mobile ? this.createHtmlMobile() :this.createHtmlDesktop()
		}, createHtmlDesktop: function () {
			return '<div class="defending-unit-widget"><div class="portrait"><div class="attacker-effectiveness"></div></div><div class="unit-name"></div><div class="count"></div></div>'
		}, createHtmlMobile: function () {
			return '<div class="defending-unit-widget"><div class="content"><div class="count"></div></div><div class="portrait"><div class="attacker-effectiveness"></div></div></div>'
		}, _render: function (e, t) {
			e && t.fade_everything === e.fade_everything || this._$root.toggleClass("faded", t.fade_everything), e && t.image_src === e.image_src || this.$portrait.css("background-image", "url(" + t.image_src + ")"), e && t.unit_name === e.unit_name || this.$unit_name.html(t.unit_name), e && t.count === e.count || this.$count.html(t.count), e && t.attacker_effectiveness_icon_count === e.attacker_effectiveness_icon_count || this.$attacker_effectiveness.html(this.createEffectivenessIcons(t.attacker_effectiveness_icon_count)), e && t.attacker_effectiveness_class === e.attacker_effectiveness_class || (e && this.$attacker_effectiveness.removeClass(e.attacker_effectiveness_class), this.$attacker_effectiveness.addClass(t.attacker_effectiveness_class))
		}, createEffectivenessIcons: function (e) {
			return '<span class="effectiveness-icon"></span>'.repeat(e)
		}
	}), t
});

;/**** game/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitView", "Ig/TribalWars/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitController", "Ig/TribalWars/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitStateReducer" ], function (e, t, i, n) {
	"use strict";

	function r(r, d, s) {
		e.apply(this), this._models={
			stage: r,
			unit_type: d,
			active_attacker: s
		}, this._services={}, this._view=new t, this._controller=new i, this._state_reducer=new n
	}

	return r.prototype=Object.create(e.prototype), $.extend(r.prototype, {}), r
});

;/**** game/Modules/EventBarricade/Widgets/EventRankingWidget/EventRankingStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/EventRankingWidget/EventRankingStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (e) {
	"use strict";

	function t() {
		e.apply(this)
	}

	return t.prototype=Object.create(e.prototype), $.extend(t.prototype, {
		newStateFromNothing: function () {
			return {
				widget_class: "event-ranking-widget",
				is_visible: !0,
				title: _("88f80f7250864973eab9c2290de20afd"),
				score_label: _("e6025484f1122d64295d8b8503a414a7"),
				countdown_visible: !0,
				seconds_remaining: 69,
				time_entries_generated: null,
				entries: [],
				entry_display_count: 7,
				status_text: "",
				status_visible: !0
			}
		}, newStateFromModels: function (e, t, n) {
			var a=t.event_state.event_ranking, r=t.event_state.player, i=$.extend(!0, {}, e, {
				time_entries_generated: a.last_update,
				seconds_remaining: Math.max(0, Math.round(t.time_end_play - n / 1e3))
			});
			return i.countdown_visible=i.seconds_remaining > 0, i.time_entries_generated !== e.time_entries_generated && (i.entries=a.entries.map(function (e) {
				return {
					rank: e.rank,
					score: e.score,
					rewards: e.rewards,
					player_id: e.player_id,
					player_name: e.player_name,
					is_me: e.player_id === t.event_state.player.player_id
				}
			})), i.seconds_remaining > 0 ? i.status_text="" :r.received_event_rank_reward ? i.status_text=_("fedc6b960052958565f06d46ec4bce9e") :r.stages_cleared < 1 ? i.status_text=_("30e1f68f5fca9bafb626fc98037328af") :i.status_text=_("8674165002b34e81da62df7b86bcf3d4"), i
		}
	}), t
});

;/**** game/Modules/EventBarricade/Widgets/EventRankingWidget/EventRankingWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/EventRankingWidget/EventRankingWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/RewardedRanking/Widgets/RewardedRankingWidget/RewardedRankingView", "Ig/TribalWars/Modules/Common/Widget/NullController", "Ig/TribalWars/Modules/EventBarricade/Widgets/EventRankingWidget/EventRankingStateReducer", "Ig/TribalWars/Modules/RewardedRanking/UIFactories/RankedEntity/UIFactoryRankedPlayer" ], function (e, t, i, n, a) {
	"use strict";

	function r(r, d, s) {
		e.apply(this), this._models={
			event_state: r,
			time_end_play: s
		}, this._services={}, this._view=new t(d, new a), this._controller=new i, this._state_reducer=new n
	}

	return r.prototype=Object.create(e.prototype), $.extend(r.prototype, {}), r
});

;/**** game/Modules/EventBarricade/Widgets/MedicWidget/MedicController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/MedicController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController", "Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/ViewEvents" ], function (e, t) {
	"use strict";

	function i() {
		e.apply(this)
	}

	return i.prototype=Object.create(e.prototype), $.extend(i.prototype, {
		_watchView: function () {
			var e=this._models.medic, i=this._models.player, a=this._services.player;
			this._watchViewForEvent(t.HEAL_NOW_PRESSED, function (t) {
				i.hasWoundedUnit() ? Premium.check(e.feature, e.calcNextVisitCost(i.daily_healings_done), function () {
					a.healUnits(function () {
						UI.SuccessMessage(_("aa59dc13ea6671047bc9913bc8c145a3"))
					})
				}) :UI.ErrorMessage(_("b457f95223c50eea5e9e98ab1913f23f"))
			})
		}
	}), i
});

;/**** game/Modules/EventBarricade/Widgets/MedicWidget/MedicStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/MedicStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (e) {
	"use strict";

	function a() {
		e.apply(this)
	}

	return a.prototype=Object.create(e.prototype), $.extend(a.prototype, {
		newStateFromNothing: function () {
			return {
				is_visible: !0,
				arrival_visible: !0,
				arrival_label: mobile ? _("9e41f6e7578581eac9832bcd68732ae1") :_("3ef033b7237c3f1039806bebd85ab28c"),
				arrival_progress: .5,
				countdown_seconds: 69,
				heal_now_visible: !0,
				heal_now_enabled: !0,
				heal_now_text: mobile ? _("f357105e6becc3076a3da9b43465051a") :_("2b247862b1e31a80e4493ad273c8efbe"),
				heal_now_cost: 42
			}
		}, newStateFromModels: function (e, a, i) {
			var t=$.extend(!0, {}, e, {is_visible: a.time_end_play > i / 1e3}), l=a.cycles.medic;
			if (null === l) {
				t.arrival_visible= !1, t.arrival_progress=0, t.countdown_seconds=0;
			}
			else {
				var n=Math.floor(i / 1e3);
				t.arrival_visible= !0, t.countdown_seconds=Math.max(0, l.time_end - n), t.arrival_progress=Math.min(1, (n - l.time_start) / (l.time_end - l.time_start))
			}
			var r=a.medic;
			return null === a.cycles.daily ? (t.heal_now_visible= !1, t.heal_now_enabled= !1) :(t.heal_now_visible=r.enabled, t.heal_now_enabled=r.enabled && a.player.hasWoundedUnit(), t.heal_now_cost=r.calcNextVisitCost(a.player.daily_healings_done)), t
		}
	}), a
});

;/**** game/Modules/EventBarricade/Widgets/MedicWidget/MedicView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/MedicView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView", "Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/ViewEvents" ], function (i, t) {
	"use strict";

	function a() {
		i.apply(this)
	}

	return a.prototype=Object.create(i.prototype), $.extend(a.prototype, {
		_initStructure: function (i) {
			var t=$(this.createHtml());
			this.$arrival_label=t.find(".arrival-label"), this.$arrival_countdown=t.find(".arrival-countdown"), this.$filler_bar=t.find(".filler-bar"), this.$arrival_timer=t.find(".arrival-timer"), this.$action_container=t.find(".action-container"), this.$button_heal_now=t.find(".button-heal-now"), this._setRootElement(t)
		}, createHtml: function () {
			return mobile ? this.createHtmlMobile() :this.createHtmlDesktop()
		}, createHtmlDesktop: function () {
			return '<div class="medic-widget"><div class="arrival-label"></div><div class="arrival-countdown"><span class="filler-bar"></span><span class="arrival-timer"></span></div><div class="action-container"><a href="#" class="btn btn-pp button-heal-now"></a></div></div>'
		}, createHtmlMobile: function () {
			return '<tbody class="medic-widget"><tr><td><span class="arrival-label"></span><span class="action-container float_right"><a href="#" class="btn btn-pp button-heal-now"></a></span></td><td colspan="2"><div class="arrival-countdown"><span class="filler-bar"></span><span class="arrival-timer"></span></div></td></tr></tbody>'
		}, _initEventPublishing: function () {
			var i=this;
			this.$button_heal_now.on("click", function (a) {
				a.preventDefault(), i.trigger(t.HEAL_NOW_PRESSED, {})
			})
		}, _render: function (i, t) {
			i && t.is_visible === i.is_visible || this._$root.toggle(t.is_visible), i && t.arrival_visible === i.arrival_visible || (this.$arrival_label.toggle(t.arrival_visible), this.$arrival_countdown.toggle(t.arrival_visible)), i && t.arrival_label === i.arrival_label || this.$arrival_label.html(t.arrival_label), i && t.arrival_progress === i.arrival_progress || this.$filler_bar.css("width", 100 * t.arrival_progress + "%"), i && t.countdown_seconds === i.countdown_seconds || this.$arrival_timer.html(getTimeString(t.countdown_seconds)), i && t.heal_now_visible === i.heal_now_visible || this.$action_container.toggle(t.heal_now_visible), i && t.heal_now_enabled === i.heal_now_enabled || this.$button_heal_now.toggleClass("btn-disabled", !t.heal_now_enabled), i && t.heal_now_text === i.heal_now_text || this.$button_heal_now.html(t.heal_now_text)
		}
	}), a
});

;/**** game/Modules/EventBarricade/Widgets/MedicWidget/MedicWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/MedicWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/MedicView", "Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/MedicController", "Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/MedicStateReducer" ], function (e, t, i, r) {
	"use strict";

	function d(d, s, a, c) {
		e.apply(this), this._models={
			cycles: d,
			medic: s,
			player: a.player,
			time_end_play: c
		}, this._services={player: a}, this._view=new t, this._controller=new i, this._state_reducer=new r
	}

	return d.prototype=Object.create(e.prototype), $.extend(d.prototype, {}), d
});

;/**** game/Modules/EventBarricade/Widgets/MedicWidget/ViewEvents.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/ViewEvents", [ "module" ], function (e) {
	return {HEAL_NOW_PRESSED: e.id + "/HEAL_NOW_PRESSED"}
});

;/**** game/Modules/EventBarricade/Widgets/PathWidget/PathStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/PathWidget/PathStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (t) {
	"use strict";

	function e() {
		t.apply(this)
	}

	return e.prototype=Object.create(t.prototype), $.extend(e.prototype, {
		newStateFromNothing: function () {
			return {path_id: "0-0", color_green: !1}
		}, newStateFromModels: function (t, e, r) {
			var o=e.path;
			return {path_id: o.getId(), color_green: o.isAccessible()}
		}
	}), e
});

;/**** game/Modules/EventBarricade/Widgets/PathWidget/PathView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/PathWidget/PathView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView" ], function (t) {
	"use strict";

	function e() {
		t.apply(this)
	}

	return e.prototype=Object.create(t.prototype), $.extend(e.prototype, {
		_initStructure: function (t) {
			this.$graphic=$(this.createHtml()), this._setRootElement(this.$graphic)
		}, createHtml: function () {
			return '<div class="path-widget"></div>'
		}, _render: function (t, e) {
			if (t && e.color_green === t.color_green || this.$graphic.toggle(e.color_green), !t || e.path_id !== t.path_id) {
				var r=Format.image_src("events/barricade/battle/paths/green/" + e.path_id + ".png");
				this.$graphic.css("background-image", "url(" + r + ")")
			}
		}
	}), e
});

;/**** game/Modules/EventBarricade/Widgets/PathWidget/PathWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/PathWidget/PathWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/PathWidget/PathView", "Ig/TribalWars/Modules/Common/Widget/NullController", "Ig/TribalWars/Modules/EventBarricade/Widgets/PathWidget/PathStateReducer" ], function (e, t, r, i) {
	"use strict";

	function a(a) {
		e.apply(this), this._models={path: a}, this._services={}, this._view=new t, this._controller=new r, this._state_reducer=new i
	}

	return a.prototype=Object.create(e.prototype), $.extend(a.prototype, {}), a
});

;/**** game/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/ViewEvents" ], function (e, t) {
	"use strict";

	function r() {
		e.apply(this)
	}

	return r.prototype=Object.create(e.prototype), $.extend(r.prototype, {
		_watchView: function () {
			var e=this._models.stage, r=this._services.stage;
			this._watchViewForEvent(t.MARKER_PRESSED, function (t) {
				r.openStagePopup(e.id)
			})
		}
	}), r
});

;/**** game/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (t) {
	"use strict";

	function e() {
		t.apply(this)
	}

	return e.prototype=Object.create(t.prototype), $.extend(e.prototype, {
		newStateFromNothing: function () {
			return {stage_id: 0, status: "locked", left: 0, top: 0, already_cleared: !1, attacked: !1}
		}, newStateFromModels: function (t, e, a) {
			var r=e.stage;
			return $.extend(!0, {}, t, {
				stage_id: r.id,
				status: r.status(Math.floor(a / 1e3)),
				left: r.ui_position.x,
				top: r.ui_position.y,
				already_cleared: r.cleared_count > 0,
				attacked: r.attacked
			})
		}
	}), e
});

;/**** game/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/ViewEvents" ], function (t, e) {
	"use strict";

	function a() {
		t.apply(this)
	}

	return a.prototype=Object.create(t.prototype), $.extend(a.prototype, {
		_initStructure: function (t) {
			var e=$(this.createHtml(t));
			this._setRootElement(e)
		}, createHtml: function (t) {
			return '<div class="stage-marker-widget" data-stage="' + t.stage_id + '"></div>'
		}, _initEventPublishing: function () {
			var t=this;
			this._$root.on("click", function () {
				t.trigger(e.MARKER_PRESSED, {})
			})
		}, _render: function (t, e) {
			t && e.status === t.status || this._$root.removeClass("locked unlocked temporarily_locked").addClass(e.status), t && e.already_cleared === t.already_cleared || this._$root.toggleClass("already-cleared", e.already_cleared), t && e.attacked === t.attacked || this._$root.toggleClass("attacked", e.attacked), t && e.left === t.left || this._$root.css("left", e.left + "px"), t && e.top === t.top || this._$root.css("top", e.top + "px")
		}
	}), a
});

;/**** game/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerView", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerController", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/StageMarkerStateReducer" ], function (e, t, r, a) {
	"use strict";

	function i(i, s) {
		e.apply(this), this._models={stage: i}, this._services={stage: s}, this._view=new t, this._controller=new r, this._state_reducer=new a
	}

	return i.prototype=Object.create(e.prototype), $.extend(i.prototype, {}), i
});

;/**** game/Modules/EventBarricade/Widgets/StageMarkerWidget/ViewEvents.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageMarkerWidget/ViewEvents", [ "module" ], function (e) {
	return {MARKER_PRESSED: e.id + "/MARKER_PRESSED"}
});

;/**** game/Modules/EventBarricade/Widgets/StageWidget/StageController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StageController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/ViewEvents", "Ig/TribalWars/Modules/EventBarricade/Models/PendingAttack", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StateReductionActions" ], function (t, e, i, a) {
	"use strict";

	function r() {
		t.apply(this)
	}

	return r.prototype=Object.create(t.prototype), $.extend(r.prototype, {
		_watchModels: function () {
			var t=this._widget, e=this._models.pending_attack;
			this._watchModelForEvent(e, i.EVENT_CHANGED, function (e) {
				var i=Timing.getCurrentServerTime();
				t.update(i)
			})
		}, _watchView: function () {
			var t=this._widget, i=this._services.player, r=this._models.stage, n=this._models.pending_attack;
			this._watchViewForEvent(e.ATTACK_PRESSED, function (e) {
				if (t.getNextState(s).attack_button_enabled) {
					var o=function () {
						var e=Timing.getCurrentServerTime();
						t.applyActionToState(a.END_ATTACK_REQUEST, {}, e), t.update(e)
					}, s=Timing.getCurrentServerTime();
					t.applyActionToState(a.START_ATTACK_REQUEST, {}, s), t.update(s), i.attackStage(r.id, n.getUnitCounts(), o, o)
				}
			})
		}
	}), r
});

;/**** game/Modules/EventBarricade/Widgets/StageWidget/StageStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StageStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer", "Ig/TribalWars/Modules/EventBarricade/Models/Board/Stage", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StateReductionActions" ], function (t, e, a) {
	"use strict";

	function c() {
		t.apply(this)
	}

	return c.prototype=Object.create(t.prototype), $.extend(c.prototype, {
		newStateFromNothing: function () {
			return {
				main_label: "",
				secondary_label: "",
				capacity_text: "",
				capacity_portion: 0,
				attackers_visible: !0,
				attackers_label: _("b37fef749e23bf4ac9d7db5bca576550"),
				defenders_label: _("2b3656783601d7befbefbcd0feddf9b2"),
				bosses: [],
				bosses_visible: !0,
				flavor_text: '"What do you get when your cross an owl with a bungee cord?"',
				attack_button_visible: !0,
				attack_button_text: _("dcfafcb4323b102c7e204555d313ba0a"),
				attack_button_enabled: !0,
				rewards_label: _("0d1c608c1498367815da8105e26b0a9e"),
				rewards: [],
				waiting_attack_request: !1
			}
		}, newStateFromModels: function (t, a, c) {
			var r=Math.floor(c / 1e3), n=a.stage, i=n.status(r), o=n.canBeAttacked(r), b=a.pending_attack,
				d=$.extend(!0, {}, t, {
					main_label: s(_("5cd264b522e27bb34e4ba95e588bf273"), n.id),
					attackers_visible: o,
					attack_button_visible: o,
					rewards: n.getEarnableRewards(),
					bosses: n.bosses,
					bosses_visible: !o,
					flavor_text: n.flavor_text
				});
			switch (i) {
				case e.STATUS_LOCKED:
					d.secondary_label=_("ff06cfe90b373d859d87c5c57054fc58");
					break;
				case e.STATUS_TEMPORARILY_LOCKED:
					var l=Math.max(0, n.unlock_time - r);
					d.secondary_label=getTimeString(l);
					break;
				default:
				case e.STATUS_UNLOCKED:
					d.secondary_label=_("7d978f78f84a468c49b2366c0bd239b3")
			}
			return o ? (d.capacity_text=s("%1/%2", b.sumUnitCounts(), n.attacker_unit_capacity), d.capacity_portion=Math.min(1, b.sumUnitCounts() / n.attacker_unit_capacity)) :(d.capacity_text=n.attacker_unit_capacity, d.capacity_portion=0), d
		}
	}), c.prototype._action_reducers[a.START_ATTACK_REQUEST]=function (t, e, a) {
		var c=$.extend(!0, {}, t);
		return c.waiting_attack_request= !0, c.attack_button_enabled= !1, c
	}, c.prototype._action_reducers[a.END_ATTACK_REQUEST]=function (t, e, a) {
		var c=$.extend(!0, {}, t);
		return c.waiting_attack_request= !1, c.attack_button_enabled= !0, c
	}, c
});

;/**** game/Modules/EventBarricade/Widgets/StageWidget/StageView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StageView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/ViewEvents", "Ig/TribalWars/Modules/EventBarricade/UIFactories/UIFactoryReward" ], function (t, e, a) {
	"use strict";

	function s() {
		t.apply(this)
	}

	return s.prototype=Object.create(t.prototype), $.extend(s.prototype, {
		_initStructure: function (t) {
			var e=$(this.createHtml());
			this.$main_label=e.find(".main-label"), this.$secondary_label=e.find(".secondary-label"), this.capacity_gauge={
				$filler: e.find(".capacity-gauge .filler-bar"),
				$text: e.find(".capacity-gauge .text")
			}, this.$unlock_timer=e.find(".unlock-timer"), this.$attackers_section=e.find(".attackers-section"), this.$attackers_label=e.find(".attackers-label"), this.$attacking_units=e.find(".attacking-units"), this.$defenders_section=e.find(".defenders-section"), this.$defenders_label=e.find(".defenders-label"), this.$flavor_text=e.find(".flavor-text"), this.$bosses=e.find(".bosses"), this.$defending_units=e.find(".defending-units"), this.$attack_button=e.find(".btn-attack"), this.$rewards=e.find(".rewards"), this.$rewards_label=e.find(".rewards-label"), this._setRootElement(e)
		}, createHtml: function () {
			return '<div class="stage-widget"><div class="top-section"><div class="content"><div class="main-label"></div><div class="secondary-label"></div><div class="capacity-gauge-container"><div class="capacity-gauge"><span class="filler-bar"></span><span class="text"></span></div></div></div></div>' + this.createArmiesHtml() + '<div class="action-container"><a href="#" class="btn btn-attack"></a></div><div class="rewards-section"><div class="titled-border-top"><div class="left-line"></div><div class="title rewards-label"></div><div class="right-line"></div></div><div class="titled-border-content"><div class="rewards"></div></div></div></div>'
		}, createArmiesHtml: function () {
			return mobile ? this.createArmiesHtmlMobile() :this.createArmiesHtmlDesktop()
		}, createArmiesHtmlDesktop: function () {
			return '<div class="attackers-section"><div class="attackers-label"></div><div class="attacking-units"></div></div><div class="defenders-section"><div class="defenders-label"></div><div class="content"><div class="defending-units"><div class="bosses"></div></div><div class="flavor-text"></div></div></div>'
		}, createArmiesHtmlMobile: function () {
			return '<div class="armies-section"><div class="attackers-section"><div class="attackers-label"></div><div class="attacking-units"></div></div><div class="defenders-section"><div class="defenders-label"></div><div class="content"><div class="defending-units"></div></div></div></div>'
		}, _initEventPublishing: function () {
			var t=this;
			this.$attack_button.on("click", function (a) {
				a.preventDefault(), t.trigger(e.ATTACK_PRESSED, {})
			})
		}, _render: function (t, e) {
			var a=this;
			t && e.main_label === t.main_label || this.$main_label.html(e.main_label), t && e.secondary_label === t.secondary_label || this.$secondary_label.html(e.secondary_label), t && e.capacity_text === t.capacity_text || this.capacity_gauge.$text.html(e.capacity_text), t && e.capacity_portion === t.capacity_portion || this.capacity_gauge.$filler.css("width", 100 * e.capacity_portion + "%"), t && e.attackers_visible === t.attackers_visible || this.$attackers_section.toggle(e.attackers_visible), t && e.attackers_label === t.attackers_label || this.$attackers_label.html(e.attackers_label), t && e.defenders_label === t.defenders_label || this.$defenders_label.html(e.defenders_label), t && e.bosses.length === t.bosses.length || this.$bosses.html(e.bosses.map(function (t) {
				return a.createBossHtml(t)
			})), t && e.bosses_visible === t.bosses_visible || this.$bosses.toggle(e.bosses_visible), t && e.flavor_text === t.flavor_text || this.$flavor_text.html(e.flavor_text), t && e.attack_button_visible === t.attack_button_visible || this.$attack_button.toggle(e.attack_button_visible), t && e.attack_button_text === t.attack_button_text || this.$attack_button.html(e.attack_button_text), t && e.attack_button_enabled === t.attack_button_enabled || this.$attack_button.toggleClass("btn-disabled", !e.attack_button_enabled), t && e.rewards_label === t.rewards_label || this.$rewards_label.html(e.rewards_label), t && e.rewards.length === t.rewards.length || this.$rewards.html(this.createRewardsHtml(e.rewards))
		}, createBossHtml: function (t) {
			return '<div class="boss" style="background-image:url(' + image_base + "events/barricade/bosses/" + t.id + '.png);"></div>'
		}, createRewardsHtml: function (t) {
			return t.map(function (t) {
				return new a(t).createHtml()
			}).join("")
		}
	}), s
});

;/**** game/Modules/EventBarricade/Widgets/StageWidget/StageWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StageWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StageView", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StageController", "Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StageStateReducer", "Ig/TribalWars/Modules/EventBarricade/Models/PendingAttack", "Ig/TribalWars/Modules/EventBarricade/Widgets/AttackingUnitWidget/AttackingUnitWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/DefendingUnitWidget/DefendingUnitWidget", "Ig/TribalWars/Modules/EventBarricade/Models/ActiveUnit" ], function (e, t, i, a, d, s, n, r) {
	"use strict";

	function g(s, n, g, _) {
		e.apply(this), this._models={
			stage: s,
			unit_pools: n,
			unit_types: g,
			pending_attack: new d,
			active_attacker: new r
		}, this._services={player: _}, this._view=new t, this._controller=new i, this._state_reducer=new a
	}

	return g.prototype=Object.create(e.prototype), $.extend(g.prototype, {
		_did_sub_widgets_init: !1,
		_initSubWidgets: function (e, t, i) {
			if (!this._did_sub_widgets_init) {
				var a=this, d=this._models.active_attacker, r=this._view.$attacking_units;
				$.each(this._models.unit_pools, function (e, t) {
					var n="attacking_unit_" + e, g=new s(t, a._models.pending_attack, d, a._models.stage);
					a._addSubWidget(n, g, r, !1, i)
				});
				var g=this._view.$defending_units;
				$.each(this._models.unit_types, function (e, t) {
					var s="defending_unit_" + e, r=new n(a._models.stage, t, d);
					a._addSubWidget(s, r, g, !1, i)
				}), this._did_sub_widgets_init= !0
			}
		}
	}), g
});

;/**** game/Modules/EventBarricade/Widgets/StageWidget/StateReductionActions.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/StateReductionActions", [ "module" ], function (T) {
	return {START_ATTACK_REQUEST: T.id + "/START_ATTACK_REQUEST", END_ATTACK_REQUEST: T.id + "/END_ATTACK_REQUEST"}
});

;/**** game/Modules/EventBarricade/Widgets/StageWidget/ViewEvents.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/StageWidget/ViewEvents", [ "module" ], function (e) {
	return {ATTACK_PRESSED: e.id + "/ATTACK_PRESSED"}
});

;/**** game/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/ViewEvents" ], function (t, e) {
	"use strict";

	function i() {
		t.apply(this)
	}

	return i.prototype=Object.create(t.prototype), $.extend(i.prototype, {
		_watchView: function () {
			var t=this._services.unit_vendor;
			this._watchViewForEvent(e.HIRE_PRESSED, function (e) {
				t.openPurchaseConfirmationPopup()
			})
		}
	}), i
});

;/**** game/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (e) {
	"use strict";

	function t() {
		e.apply(this)
	}

	return t.prototype=Object.create(e.prototype), $.extend(t.prototype, {
		newStateFromNothing: function () {
			return {visible: !0, hire_text: _("012706ea3b17c3da50412ae96fc315e4")}
		}, newStateFromModels: function (e, t, n) {
			var r=t.unit_vendor.enabled;
			return $.extend(!0, {}, e, {visible: r})
		}
	}), t
});

;/**** game/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/ViewEvents" ], function (t, i) {
	"use strict";

	function e() {
		t.apply(this)
	}

	return e.prototype=Object.create(t.prototype), $.extend(e.prototype, {
		_initStructure: function (t) {
			var i=$(this.createHtml());
			this.$hire_button=i.find(".hire-button"), this._setRootElement(i)
		}, createHtml: function () {
			return '<div class="unit-actions-widget"><a href="#" class="btn btn-pp hire-button"></a></div>'
		}, _initEventPublishing: function () {
			var t=this;
			this.$hire_button.on("click", function (e) {
				e.preventDefault(), t.trigger(i.HIRE_PRESSED, {})
			})
		}, _render: function (t, i) {
			t && i.visible === t.visible || this._$root.toggle(i.visible), t && i.hire_text === t.hire_text || this.$hire_button.html(i.hire_text)
		}
	}), e
});

;/**** game/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsView", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsController", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsStateReducer" ], function (t, e, i, n) {
	"use strict";

	function r(r, s) {
		t.apply(this), this._models={unit_vendor: r}, this._services={unit_vendor: s}, this._view=new e, this._controller=new i, this._state_reducer=new n
	}

	return r.prototype=Object.create(t.prototype), $.extend(r.prototype, {}), r
});

;/**** game/Modules/EventBarricade/Widgets/UnitActionsWidget/ViewEvents.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/ViewEvents", [ "module" ], function (e) {
	return {HIRE_PRESSED: e.id + "/HIRE_PRESSED"}
});

;/**** game/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController", "Ig/TribalWars/Modules/EventBarricade/Models/UnitPool", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/ViewEvents" ], function (t, e, i) {
	"use strict";

	function o() {
		t.apply(this)
	}

	return o.prototype=Object.create(t.prototype), $.extend(o.prototype, {
		_watchModels: function () {
			var t=this._widget, i=this._models.unit_pool;
			this._watchModelForEvent(i, e.EVENT_COUNTS_CHANGED, function (e) {
				var i=Timing.getCurrentServerTime();
				t.update(i)
			})
		}, _watchView: function () {
			var t=this._models.unit_pool.unit_type, e=this._services.unit_stats;
			this._watchViewForEvent(i.PORTRAIT_PRESSED, function (i) {
				e.openUnitStatsPopup(t.id)
			}), this._watchViewForEvent(i.NAME_PRESSED, function (i) {
				mobile && e.openUnitStatsPopup(t.id)
			})
		}
	}), o
});

;/**** game/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (t) {
	"use strict";

	function e() {
		t.apply(this)
	}

	return e.prototype=Object.create(t.prototype), $.extend(e.prototype, {
		newStateFromNothing: function () {
			return {image_src: "", unit_name: "bob", count_usable: 42, count_wounded: 69}
		}, newStateFromModels: function (t, e, n) {
			var o=e.unit_pool;
			return $.extend(!0, {}, t, {
				image_src: o.unit_type.imageSrc(),
				unit_name: o.unit_type.name,
				count_usable: o.countUsable(),
				count_wounded: o.countWounded()
			})
		}, _action_reducers: {}
	}), e
});

;/**** game/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/ViewEvents" ], function (t, i) {
	"use strict";

	function n() {
		t.apply(this)
	}

	return n.prototype=Object.create(t.prototype), $.extend(n.prototype, {
		_initStructure: function (t) {
			var i=$(this.createHtml());
			this.$portrait=i.find(".portrait"), this.$unit_name=i.find(".unit-name"), this.$count_usable=i.find(".count-usable"), this.$count_wounded=i.find(".count-wounded"), this._setRootElement(i)
		}, createHtml: function () {
			return mobile ? this.createHtmlMobile() :this.createHtmlDesktop()
		}, createHtmlDesktop: function () {
			return '<div class="unit-pool-widget"><div class="portrait"></div><div class="unit-name"></div><div class="count-usable"></div><div class="count-wounded"></div></div>'
		}, createHtmlMobile: function () {
			return '<tr class="unit-pool-widget"><td><div class="unit-identity"><span class="portrait"></span><span class="unit-name"></span></div></td><td class="count-usable"></td><td class="count-wounded"></td></tr>'
		}, _initEventPublishing: function () {
			var t=this;
			this.$portrait.on("click", function (n) {
				n.preventDefault(), t.trigger(i.PORTRAIT_PRESSED, {})
			}), this.$unit_name.on("click", function (n) {
				n.preventDefault(), t.trigger(i.NAME_PRESSED, {})
			})
		}, _render: function (t, i) {
			t && i.image_src === t.image_src || this.$portrait.css("background-image", "url(" + i.image_src + ")"), t && i.unit_name === t.unit_name || this.$unit_name.html(i.unit_name), t && i.count_usable === t.count_usable || this.$count_usable.html(i.count_usable), t && i.count_wounded === t.count_wounded || this.$count_wounded.html(i.count_wounded)
		}
	}), n
});

;/**** game/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolView", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolController", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolStateReducer" ], function (t, e, i, o) {
	"use strict";

	function r(r, s) {
		t.apply(this), this._models={unit_pool: r}, this._services={unit_stats: s}, this._view=new e, this._controller=new i, this._state_reducer=new o
	}

	return r.prototype=Object.create(t.prototype), $.extend(r.prototype, {}), r
});

;/**** game/Modules/EventBarricade/Widgets/UnitPoolWidget/ViewEvents.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/ViewEvents", [ "module" ], function (E) {
	return {PORTRAIT_PRESSED: E.id + "/PORTRAIT_PRESSED", NAME_PRESSED: E.id + "/NAME_PRESSED"}
});

;/**** game/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer" ], function (e) {
	"use strict";

	function t() {
		e.apply(this)
	}

	return t.prototype=Object.create(e.prototype), $.extend(t.prototype, {
		newStateFromNothing: function () {
			return {visible: !0}
		}, newStateFromModels: function (e, t, n) {
			return $.extend(!0, {}, e, {visible: t.time_end_play > n / 1e3})
		}
	}), t
});

;/**** game/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView" ], function (t) {
	"use strict";

	function i() {
		t.apply(this)
	}

	return i.prototype=Object.create(t.prototype), $.extend(i.prototype, {
		_initStructure: function (t) {
			var i=$(this.createHtml());
			this.$listing_container=mobile ? i :i.find(".listing-container"), this.$action_container=i.find(".action-container"), this._setRootElement(i)
		}, createHtml: function () {
			return mobile ? this.createHtmlMobile() :this.createHtmlDesktop()
		}, createHtmlDesktop: function () {
			return '<div class="unit-pools-widget"><div class="listing-container"></div><div class="action-container"></div></div>'
		}, createHtmlMobile: function () {
			return '<tbody class="unit-pools-widget listing-container"></tbody>'
		}, _render: function (t, i) {
			t && i.visible === t.visible || this._$root.toggle(i.visible)
		}
	}), i
});

;/**** game/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsView", "Ig/TribalWars/Modules/Common/Widget/NullController", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsStateReducer", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolWidget/UnitPoolWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsWidget" ], function (i, t, e, s, n, o) {
	"use strict";

	function d(n, o, d, r, a, _) {
		i.apply(this), this._models={unit_pools: n, unit_vendor: d, time_end_play: _}, this._services={
			unit_stats: o,
			player: r,
			unit_vendor: a
		}, this._view=new t, this._controller=new e, this._state_reducer=new s
	}

	return d.prototype=Object.create(i.prototype), $.extend(d.prototype, {
		_did_sub_widgets_init: !1,
		_initSubWidgets: function (i, t, e) {
			if (!this._did_sub_widgets_init) {
				var s=this, d=this._view.$listing_container;
				if ($.each(this._models.unit_pools, function (i, t) {
					var o="unit_pool_" + i, r=new n(t, s._services.unit_stats);
					s._addSubWidget(o, r, d, !1, e)
				}), !mobile) {
					var r=this._view.$action_container, a=new o(this._models.unit_vendor, this._services.unit_vendor);
					s._addSubWidget("unit_actions", a, r, !0, e)
				}
				this._did_sub_widgets_init= !0
			}
		}
	}), d
});

;/**** game/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsController.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsController", [ "Ig/TribalWars/Modules/Common/Widget/AbstractController" ], function (t) {
	"use strict";

	function e() {
		t.apply(this)
	}

	return e.prototype=Object.create(t.prototype), $.extend(e.prototype, {}), e
});

;/**** game/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsStateReducer.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsStateReducer", [ "Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer", "Ig/TribalWars/Modules/EventBarricade/Models/UnitType" ], function (e, t) {
	"use strict";

	function n() {
		e.apply(this)
	}

	return n.prototype=Object.create(e.prototype), $.extend(n.prototype, {
		newStateFromNothing: function () {
			return {
				unit_name: "bob",
				image_src: "",
				strength: 69,
				damage_bonuses: [],
				usable_label: _("43cad3924badce60dae446911ffcb2e8"),
				usable_count: 42,
				wounded_label: _("3d23bb181e2e6110f0927481c5f7b7e1"),
				wounded_count: 23,
				owned_label: _("d300cdd8058e8c768b8af1c4dcc37441"),
				owned_count: 9001
			}
		}, newStateFromModels: function (e, n, a) {
			var o=n.unit_types, u=n.unit_pool, d=$.extend(!0, {}, e, {
				unit_name: u.unit_type.name,
				image_src: u.unit_type.imageSrc(t.ROLE_GOOD),
				strength: u.unit_type.strength,
				usable_count: u.countUsable(),
				wounded_count: u.countWounded(),
				owned_count: u.countOwned()
			});
			return 0 === d.damage_bonuses.length && $.each(u.unit_type.damage_bonuses, function (e, n) {
				d.damage_bonuses.push({
					label: s(_("83b97262f2238f295f78a3e85ae9cd7b"), n.percent_increase),
					image_src: o[n.unit_type_id].imageSrc(t.ROLE_BAD)
				})
			}), d
		}
	}), n
});

;/**** game/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsView.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsView", [ "Ig/TribalWars/Modules/Common/Widget/AbstractView" ], function (n) {
	"use strict";

	function e() {
		n.apply(this)
	}

	return e.prototype=Object.create(n.prototype), $.extend(e.prototype, {
		_initStructure: function (n) {
			var e=$(this.createHtml());
			this.$unit_name=e.find(".unit-name"), this.$portrait=e.find(".portrait"), this.$strength=e.find(".strength"), this.$damage_bonuses=e.find(".damage-bonuses"), this.$usable_label=e.find(".usable-label"), this.$usable_count=e.find(".usable-count"), this.$wounded_label=e.find(".wounded-label"), this.$wounded_count=e.find(".wounded-count"), this.$owned_label=e.find(".owned-label"), this.$owned_count=e.find(".owned-count"), this._setRootElement(e)
		}, createHtml: function () {
			return '<div class="unit-stats-widget"><div class="unit-name"></div><div class="portrait"></div><div class="strength-container"><span class="strength-icon"></span><span class="strength"></span></div><div class="damage-bonuses"></div><section><span class="usable-label"></span><span class="usable-count"></span></section><section><span class="wounded-label"></span><span class="wounded-count"></span></section><section><span class="owned-label"></span><span class="owned-count"></span></section></div>'
		}, _render: function (n, e) {
			var t=this;
			n && e.unit_name === n.unit_name || this.$unit_name.html(e.unit_name), n && e.image_src === n.image_src || this.$portrait.css("background-image", "url(" + e.image_src + ")"), n && e.strength === n.strength || this.$strength.html(e.strength), n && e.damage_bonuses.length === n.damage_bonuses.length || this.$damage_bonuses.html(e.damage_bonuses.map(function (n) {
				return t.createDamageBonusHtml(n)
			}).join("")), n && e.usable_label === n.usable_label || this.$usable_label.html(e.usable_label), n && e.usable_count === n.usable_count || this.$usable_count.html(e.usable_count), n && e.wounded_label === n.wounded_label || this.$wounded_label.html(e.wounded_label), n && e.wounded_count === n.wounded_count || this.$wounded_count.html(e.wounded_count), n && e.owned_label === n.owned_label || this.$owned_label.html(e.owned_label), n && e.owned_count === n.owned_count || this.$owned_count.html(e.owned_count)
		}, createDamageBonusHtml: function (n) {
			return "<section><span>" + n.label + '</span><span class="damage-bonus-portrait" style="background-image: url(' + n.image_src + ')"></span></section>'
		}
	}), e
});

;/**** game/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsWidget.js ****/
define("Ig/TribalWars/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsWidget", [ "Ig/TribalWars/Modules/Common/Widget/AbstractWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsView", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsController", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitStatsWidget/UnitStatsStateReducer" ], function (t, e, i, s) {
	"use strict";

	function r(r, a) {
		t.apply(this), this._models={
			unit_pool: r,
			unit_types: a
		}, this._services={}, this._view=new e, this._controller=new i, this._state_reducer=new s
	}

	return r.prototype=Object.create(t.prototype), $.extend(r.prototype, {}), r
});

;/**** game/Modules/EventBarricade/BarricadeMessageFactory.js ****/
define("Ig/TribalWars/Modules/EventBarricade/BarricadeMessageFactory", [ "Ig/TribalWars/Modules/Common/Event/MessageFactory", "Ig/TribalWars/Modules/EventBarricade/Messages/MessagePlayerAttackedStage", "Ig/TribalWars/Modules/EventBarricade/Messages/MessagePlayerBoughtUnits" ], function (e, r, t) {
	"use strict";

	function a() {
		e.apply(this), this.registerMessageFactoryFunction(r.SERVER_MESSAGE_TYPE, function (e) {
			return r.createFromDTO(e)
		}), this.registerMessageFactoryFunction(t.SERVER_MESSAGE_TYPE, function (e) {
			return t.createFromDTO(e)
		})
	}

	return a.prototype=Object.create(e.prototype), a
});

;/**** game/Modules/EventBarricade/MainScreen.js ****/
define("Ig/TribalWars/Modules/EventBarricade/MainScreen", [ "Ig/TribalWars/Modules/EventBarricade/Models/EventState", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyUnitsWidget/DailyUnitsWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitPoolsWidget/UnitPoolsWidget", "Ig/TribalWars/Modules/EventBarricade/Services/UnitStatsService", "Ig/TribalWars/Modules/EventBarricade/Widgets/MedicWidget/MedicWidget", "Ig/TribalWars/Modules/EventBarricade/Models/Medic", "Ig/TribalWars/Modules/EventBarricade/Services/PlayerService", "Ig/TribalWars/Modules/EventBarricade/Models/UnitVendor", "Ig/TribalWars/Modules/EventBarricade/BarricadeMessageFactory", "Ig/TribalWars/Modules/Common/Event/EventDispatcher", "Ig/TribalWars/Modules/Common/Event/ServerMessageConverter", "Ig/TribalWars/Modules/EventBarricade/Widgets/BoardWidget/BoardWidget", "Ig/TribalWars/Modules/EventBarricade/Services/StageService", "Ig/TribalWars/Modules/EventBarricade/Models/UnitType", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyRankingWidget/DailyRankingWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/DailyHistoryWidget/DailyHistoryWidget", "Ig/TribalWars/Modules/EventBarricade/Widgets/EventRankingWidget/EventRankingWidget", "Ig/TribalWars/Modules/RewardedRanking/UIFactories/UIFactoryRewards", "Ig/TribalWars/Modules/RewardedRanking/UIFactories/Rewards/UIFactoryRewardCurrency", "Ig/TribalWars/Modules/EventBarricade/Services/UnitVendorService", "Ig/TribalWars/Modules/EventBarricade/Widgets/UnitActionsWidget/UnitActionsWidget" ], function (e, t, i, s, n, a, r, d, o, c, l, h, u, v, _, g, y, m, p, b, f) {
	function I(t, i, n, h, _, g, y, m) {
		var p=v.createMapFromDTO(n);
		this.models={
			time_end_play: t,
			time_end_shop: i,
			unit_types: p,
			event_state: e.createFromDTO(h, p),
			medic: a.createFromDTO(_),
			unit_finder: g,
			unit_vendor: d.createFromDTO(y),
			currency: m
		}, this.bus=new c, new l(this.bus).registerMessageFactory(new o), this.services={
			unit_stats: new s(this.models.unit_types, this.models.event_state.player.unit_pools),
			player: new r(this.models.event_state, this.bus)
		}, this.services.stage=new u(this.models.event_state.player.board, this.models.event_state.player.unit_pools, this.models.unit_types, this.services.player, this.bus), this.services.unit_vendor=new b(this.models.unit_vendor, this.models.unit_types, this.services.player, this.bus), this.widgets={}
	}

	return I.prototype={
		last_full_state_fetch: 0, is_fetching_state: !1, init: function () {
			this.initUI(), this.updateUI(), this.initMainTick(), this.watchConnection(), this.watchServices()
		}, initUI: function () {
			this.$currency_balance=$(".event-currency-display"), $(".event-help").click(function (e) {
				e.preventDefault(), TribalWars.get("event_barricade", {ajax: "help"}, function (e) {
					Dialog.show("help", e.dialog)
				})
			}), this.initDailyUnitsUI(), this.initUnitPoolsUI(), this.initMedicUI(), this.initBoardUI(), this.initRankingUI(), mobile && this.initUnitActionsUI()
		}, initMainTick: function () {
			var e=this;
			$(TribalWars).on("global_tick", function () {
				var t=Timing.getCurrentServerTime() / 1e3;
				e.redirectIfEventNotPlayable(t), e.processCycleExpiration(t), e.updateUI()
			})
		}, redirectIfEventNotPlayable: function (e) {
			e > this.models.time_end_shop && TribalWars.redirect("overview")
		}, watchConnection: function () {
			var e=this, t=this.models.event_state.player;
			Connection.registerHandler("event_currency_ducats", function (i) {
				t.currency_balance=i.balance, EventItemShop.setCurrencyBalance(i.balance), e.updateUI();
				var s=Timing.getCurrentServerTime() / 1e3;
				e.models.time_end_play < s && !t.received_event_rank_reward && e.fetchState()
			}), Connection.registerHandler("event_barricade_found_unit_package", function (t) {
				e.fetchState()
			})
		}, watchServices: function () {
			var e=this;
			this.services.player.on(r.EVENT_UPDATED_PLAYER, function () {
				e.updateUI()
			})
		}, updateUI: function () {
			var e=Timing.getCurrentServerTime();
			this.updateCurrencyUI(), this.hideUIThingsIfPlayEnded(e / 1e3), $.each(this.widgets, function (t, i) {
				null !== i && i.update(e)
			})
		}, updateCurrencyUI: function () {
			this.$currency_balance.html(Format.number(this.models.event_state.player.currency_balance))
		}, fetchState: function () {
			if (!this.is_fetching_state) {
				this.is_fetching_state= !0;
				var e=this;
				TribalWars.get("event_barricade", {ajax: "state"}, function (t) {
					e.handleAjaxData(t), e.last_full_state_fetch=Timing.getCurrentServerTime() / 1e3, e.is_fetching_state= !1
				}, function () {
					e.is_fetching_state= !1
				}, !0)
			}
		}, handleAjaxData: function (e) {
			void 0 !== e.event_state && this.models.event_state.update(e.event_state), void 0 !== e.player && (this.models.event_state.updatePlayer(e.player), EventItemShop.setCurrencyBalance(this.models.event_state.player.currency_balance)), this.updateUI()
		}, initDailyUnitsUI: function () {
			var e=new t(this.models.event_state, this.models.unit_finder);
			e.init($("#daily_units"), mobile), this.widgets.daily_units=e
		}, initUnitPoolsUI: function () {
			var e=new i(this.models.event_state.player.unit_pools, this.services.unit_stats, this.models.unit_vendor, this.services.player, this.services.unit_vendor, this.models.time_end_play);
			e.init($("#unit_pools"), mobile), this.widgets.unit_pools=e
		}, initUnitActionsUI: function () {
			var e=new f(this.models.unit_vendor, this.services.unit_vendor);
			e.init($("#barricade-unit-actions")), this.widgets.unit_actions=e
		}, initMedicUI: function () {
			var e=new n(this.models.event_state.current_cycles, this.models.medic, this.services.player, this.models.time_end_play);
			e.init($("#medic"), mobile), this.widgets.medic=e
		}, initBoardUI: function () {
			var e=new h(this.models.event_state.player.board, this.services.stage, this.models.time_end_play);
			e.init($("#board")), this.widgets.board=e
		}, initRankingUI: function () {
			var e=$("#barricade-rankings"), t=(new p).addCurrency(this.models.currency),
				i=(new m).registerRewardFactory("currency", t);
			this.widgets.daily_ranking=new _(this.models.event_state, i), this.widgets.daily_ranking.init(e), this.widgets.daily_history=new g(this.models.event_state, i), this.widgets.daily_history.init(e), this.widgets.event_ranking=new y(this.models.event_state, i, this.models.time_end_play), this.widgets.event_ranking.init(e)
		}, hideUIThingsIfPlayEnded: function (e) {
			this.models.time_end_play <= e && ($("#barricade-map-section").hide(), $("#barricade-units-section").hide())
		}, processCycleExpiration: function (e) {
			if (!this.is_fetching_state) {
				for (var t=Object.keys(this.models.event_state.current_cycles), i=0; i < t.length; i++) {
					var s=this.models.event_state.current_cycles[t[i]];
					if (s && s.time_end < e) return void this.fetchState()
				}
			}
		}
	}, I
});

;