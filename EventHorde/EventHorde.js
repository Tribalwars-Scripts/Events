var EventHorde;
!function () {
	"use strict";
	EventHorde={
		units: {},
		disabled_unit_ids: [],
		player_energies: {},
		energy_id: null,
		energy_shop: null,
		play_end: 0,
		play_end_schedule_id: 0,
		init: function (e) {
			$(".event-help").click(function () {
				TribalWars.get("event_horde", {ajax: "help"}, function (e) {
					Dialog.show("help", e.dialog)
				})
			}), $(".btn-puzzle-attempt").on("click", function () {
				return EventHorde.submitAttempt(), !1
			}), $(".btn-puzzle-new").on("click", function (e) {
				e.preventDefault(), EventHorde.startNewPuzzle()
			}), $(".horde-mobile-help").on("click", function (e) {
				return Dialog.show("horde", $(this).attr("title")), !1
			}), this.play_end=e, this.play_end_schedule_id && window.clearTimeout(this.play_end_schedule_id), this.play_end_schedule_id=this.schedulePlayEnd()
		},
		schedulePlayEnd: function () {
			var e=Timing.getCurrentServerTime(), t=1e3 * this.play_end - e;
			return t > 0 ? window.setTimeout(function () {
				partialReload()
			}, t + 2e3) :0
		},
		submitAttempt: function () {
			var e=$(".btn-puzzle-attempt");
			if (e.hasClass("btn-disabled")) {
				UI.ErrorMessage(_("8a2271bfecf2414265bbfc03e9fe4168"));
			}
			else {
				var t=!1, n=[], a=0;
				$("input[name^=attempt]").each(function () {
					var e=$(this).val();
					"" === e ? (t= !0, n.push(a)) :EventHorde.isUnitImpossibleForSlot(a, e) && n.push(a), a++
				}), t ? UI.ErrorMessage(_("0c6739554269544a444e0f2bb5915329")) :n.length > 0 ? UI.ErrorMessage(_("527c5c4df80dcfd7e168332b202b0d53")) :this.player_energies[this.energy_id].getValue() < e.data("cost") ? UI.ErrorMessage(_("e94689ff9c40caa48c490628fd869057")) :(e.addClass("btn-disabled"),
					TribalWars.post("event_horde", {ajaxaction: "attempt"}, $("#horde_attempt").serializeArray(), function (e) {
					$(document).off("partial_reload_end.horde").on("partial_reload_end.horde", function () {
						e.message && UI.BanneredRewardMessage(e.message), $(document).off("partial_reload_end.horde")
					}), partialReload()
				}, function () {
					partialReload()
				}))
			}
		},
		startNewPuzzle: function () {
			var e=$(".btn-puzzle-new");
			e.hasClass("btn-disabled") || (this.player_energies[this.energy_id].getValue() < e.data("cost") ? UI.ErrorMessage(_("e94689ff9c40caa48c490628fd869057")) :(e.addClass("btn-disabled"), TribalWars.post("event_horde", {ajaxaction: "new_puzzle"}, {}, function (e) {
				partialReload()
			})))
		},
		initEnergy: function (e, t, n) {
			this.energy_id=t, this.player_energies=EventPlayerEnergy.createMapFromDTO(e), this.energy_shop=new EventEnergyShop(n, this.player_energies);
			var a=this;
			$("#buy-energy-link").on("click", function (e) {
				e.preventDefault(), a.energy_shop.ui.openPopup()
			}), this.player_energies[this.energy_id].onChange(function () {
				a.updateEnergy()
			}), $(window.TribalWars).on("global_tick", function () {
				a.updateEnergy()
			})
		},
		initPlay: function () {
			for (var e=$(".horde-slot").length, t=0; t < e; t++) EventHorde.updateSlot(t);
			$(".horde-unit-selection").on("click", function () {
				return $(this).hasClass("selectable") && EventHorde.showUnitSelector($(this).data("slot")), !1
			})
		},
		updateEnergy: function () {
			var e=$("#horde_energy_parent"), t=$("#horde_energy_display"), n=$("#buy-energy-link"),
				a=this.player_energies[this.energy_id], i=a.energy_type, r=a.getValue(), o=a.getMaxValue();
			t.text(s("%1 / %2", r, o));
			var l=i.description + " :: ";
			if (r >= o) {
				n.hide(), l+=s(_("fb5e695fa5955b5b5cfabe927729f717"), i.name_plural);
			}
			else {
				this.energy_shop.enabled && n.show();
				var d=Format.timeSpan(1e3 * a.getNextChargeWaitSeconds());
				l+=s(_("313b40dd3a7d943c02050a81b9d0e6dd"), i.name, d)
			}
			e.attr("title", l).trigger("tooltip_change")
		},
		updateSlot: function (e) {
			var t, n=$("#slot_" + e), a=n.find("input[name^=attempt]").val(),
				i=EventHorde.units.hasOwnProperty(a) ? EventHorde.units[a] :null;
			t=i ? mobile ? i.image_mobile :i.image :Format.image_src("events/horde/unit_unknown.png"), n.find(".horde-unit-image").attr("src", t), !n.data("scouted") && i && i.id !== n.data("attempt-unit") && (n.find(".horde-slot-title").text(i.name), n.find(".horde-unit-selection").attr("title", _("83012c318b1bbd40133785649f2484c6")).trigger("tooltip_change"), n.removeClass("horde-red horde-yellow").addClass("horde-none"))
		},
		selectUnit: function (e, t) {
			Dialog.close(), $("#slot_" + e).find("input[name^=attempt]").val(t), EventHorde.updateSlot(e)
		},
		isUnitImpossibleForSlot: function (e, t) {
			return -1 != $.inArray(t, EventHorde.disabled_unit_ids[e])
		},
		showUnitSelector: function (e) {
			var t="<h3>" + _("5c13ddd85c841c7797ed66d4a8aff22d") + "</h3>";
			t+='<div style="max-width: 550px">', $.each(EventHorde.units, function (n, a) {
				var i=s('<img src="%1" />', a.image), r=EventHorde.isUnitImpossibleForSlot(e, n) ? "btn-disabled" :"";
				t+='<a href="#" class="btn btn-image btn-select-unit ' + r + '" data-unit="' + n + '">' + i + '<span class="unit-name">' + a.name + "</span></a>"
			}), t+="</div>", Dialog.show("select_unit", t), $(".btn-select-unit").on("click", function () {
				return !$(this).hasClass("btn-disabled") && (EventHorde.selectUnit(e, $(this).data("unit")), !1)
			})
		}
	}
}();
