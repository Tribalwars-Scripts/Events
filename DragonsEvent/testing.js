/**** game/Modules/EventDebugChests/DebugChestsScreen.js ****/
define("Ig/TribalWars/Modules/EventDebugChests/DebugChestsScreen", [ "Ig/TribalWars/Modules/EventPlayerChests/Models/ChestBase", "Ig/TribalWars/Modules/EventPlayerChests/Models/ChestInventory", "Ig/TribalWars/Modules/EventPlayerChests/ChestMessageFactory", "Ig/TribalWars/Modules/Common/Event/EventDispatcher", "Ig/TribalWars/Modules/Common/Event/ServerMessageConverter", "Ig/TribalWars/Modules/EventPlayerChests/Services/ChestInventoryService", "Ig/TribalWars/Modules/EventPlayerChests/UI/ChestInventoryWidget", "Ig/TribalWars/Modules/EventPlayerChests/UI/ChestLimitWidget", "Ig/TribalWars/Modules/EventPlayerChests/UI/PossibleTreasures/WidgetFactories/PossibleTreasuresWidgetFactory", "Ig/TribalWars/Modules/EventPlayerChests/UI/AcknowledgeTreasure/AcknowledgeTreasureWidgetFactory" ], function (e, s, t, i, n, r, a, o, h, c) {
	function l(a, o, l) {
		this.chest_bases=e.createMapFromDTO(a), this.chest_inventory=s.createFromDTO(o, this.chest_bases), this.chest_opening_deadline=l, this.message_bus=new i, this.server_message_converter=new n(this.message_bus), this.server_message_converter.registerMessageFactory(new t(this.chest_bases)), this.chest_inventory_service=new r(this.chest_inventory, this.chest_bases, this.message_bus), this.possible_treasures_widget_factory=new h, this.treasure_acknowledgement_factory=new c
	}

	return l.prototype={
		init: function () {
			console.log("chest bases:", this.chest_bases), console.log("chest inventory:", this.chest_inventory), this.spawnChestInventoryWidget(), this.spawnChestLimitWidget(), this.initGiveSelfChestsDebugUI()
		}, spawnChestInventoryWidget: function () {
			new a(this.chest_inventory, this.message_bus, this.chest_inventory_service, this.chest_opening_deadline, this.possible_treasures_widget_factory, this.treasure_acknowledgement_factory).init($("#chest_inventory_container"))
		}, spawnChestLimitWidget: function () {
			new o(this.chest_inventory, this.message_bus).init($("#chest_limit_container"))
		}, initGiveSelfChestsDebugUI: function () {
			var e=this;
			$("#give_self_chest_button").on("click", function (s) {
				s.preventDefault(), e.chest_inventory_service.debugGiveSelfChestById($("#give_self_chest_id").val())
			}), $("#give_self_random_chest_button").on("click", function (s) {
				s.preventDefault(), e.chest_inventory_service.debugGiveSelfRandomChestFromCategory($("#give_self_random_chest_category").val())
			})
		}
	}, l
});

;