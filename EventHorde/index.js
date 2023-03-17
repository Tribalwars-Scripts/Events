const Units = [  "halberd",  "morningstar",  "bigaxe",  "crossbow",  "knives",  "hammer",  "scimitar"];

const UnitsSlots = [  [...Units],
	[...Units],
	[...Units],
	[...Units],
	[...Units]
];

const slotsToRemove = [  ["halberd", "crossbow", "bigaxe"],
	["halberd", "crossbow", "bigaxe"],
	["halberd", "crossbow", "bigaxe"],
	["morningstar", "halberd", "crossbow", "bigaxe"],
	["halberd", "crossbow", "bigaxe"]
];

const remainingSlots = UnitsSlots.map((slot, index) => {
	return slot.filter(unit => !slotsToRemove[index].includes(unit));
});

console.log(remainingSlots);