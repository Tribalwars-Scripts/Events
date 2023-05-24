const UnitsModel={
	skirmisher: {
		id: "skirmisher",
		strength: 14,
		damage_bonuses: [
			{unit_type_id: "knight", percent_increase: 50},
			{unit_type_id: "longbow", percent_increase: 25}
		]
	},
	longbow: {
		id: "longbow",
		strength: 13,
		damage_bonuses: [ {unit_type_id: "pike", percent_increase: 50} ]
	},
	bill: {
		id: "bill",
		strength: 12,
		damage_bonuses: [
			{unit_type_id: "skirmisher", percent_increase: 50},
			{unit_type_id: "longbow", percent_increase: 25}
		]
	},
	knight: {
		id: "knight",
		strength: 16,
		damage_bonuses: [ {unit_type_id: "bill", percent_increase: 50} ]
	},
	pike: {
		id: "pike",
		strength: 20,
		damage_bonuses: [
			{unit_type_id: "skirmisher", percent_increase: 50},
			{unit_type_id: "bill", percent_increase: 25}
		]
	}
};

const board={
	stages: {
		1: {
			attacker_unit_capacity: 504, unit_counts: {
				skirmisher: 0, longbow: 0, bill: 450, knight: 0, pike: 0
			}

		}, 2: {
			attacker_unit_capacity: 660, unit_counts: {
				skirmisher: 0, longbow: 0, bill: 0, knight: 0, pike: 420
			}
		}
	}
}

const parseUnitsBonus=() => {
	for (const unitType in UnitsModel) {
		if (UnitsModel.hasOwnProperty(unitType)) {
			const unit=UnitsModel[unitType];
			const interactions={};
			unit.damage_bonuses.forEach(bonus => {
				interactions[unit]+=bonus.unit_type_id;
			})
		}
	}
}
	function calculateUnitAmounts(stage) {
		// Initialize unit counts to zero
		const skirmisherCount=stage.unit_counts.skirmisher,
			longbowCount=stage.unit_counts.longbow,
			billCount=stage.unit_counts.bill,
			knightCount=stage.unit_counts.knight,
			pikeCount=stage.unit_counts.pike;
		const maxUnits=stage.attacker_unit_capacity
		let skirmisherUnits=0;
		let longbowUnits=0;
		let billUnits=0;
		let knightUnits=0;
		let pikeUnits=0;

		// Calculate the amount of each unit needed based on given counts
		skirmisherUnits=Math.ceil(skirmisherCount / UnitsModel.skirmisher.strength);
		longbowUnits=Math.ceil(longbowCount / UnitsModel.longbow.strength);
		billUnits=Math.ceil(billCount / UnitsModel.bill.strength);
		knightUnits=Math.ceil(knightCount / UnitsModel.knight.strength);
		pikeUnits=Math.ceil(pikeCount / UnitsModel.pike.strength);


		const bestUnit={...stage.unit_counts}
		for (const unit in bestUnit) {
			if (bestUnit.hasOwnProperty(unit)) {
				bestUnit[unit]=0;
			}
		}


		// Loop through damage bonuses to adjust unit counts based on percent increase
		for (const unitType in UnitsModel) {
			if (UnitsModel.hasOwnProperty(unitType)) {
				const unit=UnitsModel[unitType];
				const interactions={};
				unit.damage_bonuses.forEach(bonus => {
					//console.dir(bonus)
					const targetUnitType=bonus.unit_type_id;
					const percentIncrease=bonus.percent_increase;
					for (const unit_ in stage.unit_counts) {
						if (bestUnit.hasOwnProperty(unit_)) {
							bestUnit[unit_]=targetUnitType === unit_ ? percentIncrease / 100 :0;
							interactions[targetUnitType] = unit.id;
							//console.log(targetUnitType.previous())
						}
					}
					console.log(interactions);
					switch (unitType) {
						case 'skirmisher':
							skirmisherUnits+=Math.ceil(Math.min(maxUnits, (targetUnitType === 'knight' ? knightUnits :longbowUnits)) * percentIncrease / 100);
							break;
						case 'longbow':
							longbowUnits+=Math.ceil(Math.min(maxUnits, (targetUnitType === 'pike' ? pikeUnits :0)) * percentIncrease / 100);
							break;
						case 'bill':
							billUnits+=Math.ceil(Math.min(maxUnits, (targetUnitType === 'skirmisher' ? skirmisherUnits :longbowUnits)) * percentIncrease / 100);
							break;
						case 'knight':
							knightUnits+=Math.ceil(Math.min(maxUnits, (targetUnitType === 'bill' ? billUnits :0)) * percentIncrease / 100);
							break;
						case 'pike':
							pikeUnits+=Math.ceil(Math.min(maxUnits, (targetUnitType === 'skirmisher' ? skirmisherUnits :billUnits)) * percentIncrease / 100);
							break;
					}
				});
			}
		}

		// Return the calculated unit counts, limited by the maximum units allowed for a battle
		return {
			skirmisher: Math.max(maxUnits, skirmisherUnits),
			longbow: Math.max(maxUnits, longbowUnits),
			bill: Math.max(maxUnits, billUnits),
			knight: Math.max(maxUnits, knightUnits),
			pike: Math.max(maxUnits, pikeUnits)
		};
	}


	console.log(calculateUnitAmounts(board.stages[1]))

const getUnitAndEffectiveAgainst = (unitId) => {
	const unit = UnitsModel[unitId]; // Get the unit object based on unitId
	const effectiveAgainst = [];

	// Iterate through the damage_bonuses array of the current unit
	unit.damage_bonuses.forEach(bonus => {
		effectiveAgainst.push(bonus.unit_type_id); // Add unit_type_id to effectiveAgainst array
	});

	// Create the result object with unit and effectiveAgainst properties
	const result = {
		unit: unitId,
		effectiveAgainst: effectiveAgainst
	};

	return result;
};

// Example usage:
const unitId = "skirmisher";
const result = getUnitAndEffectiveAgainst(unitId);
console.log(result);
const unitId33 = "longbow";
const result33 = getUnitAndEffectiveAgainst(unitId33);
console.log(result33);

const getUnitAndEffectiveAgainst1 = (unitId) => {
	const unit = UnitsModel[unitId]; // Get the unit object based on unitId
	const effectiveAgainst = [];

	// Iterate through the damage_bonuses array of the current unit
	unit.damage_bonuses.forEach(bonus => {
		effectiveAgainst.push(bonus.unit_type_id); // Add unit_type_id to effectiveAgainst array
	});

	// Create the result object with unit and effectiveAgainst properties
	const result = {
		unit: unitId,
		effectiveAgainst: effectiveAgainst
	};

	return result;
};

const getMostEffectiveUnit1 = (unitId) => {
	const result = getUnitAndEffectiveAgainst1(unitId);
	const effectiveAgainst = result.effectiveAgainst;
	let mostEffectiveUnit = null;
	let highestStrength = -1;

	// Iterate through the units that the current unit is effective against
	effectiveAgainst.forEach(effectiveUnitId => {
		const effectiveUnit = UnitsModel[effectiveUnitId];
		const strength = effectiveUnit.strength;

		// Compare strength values to find the highest strength
		if (strength > highestStrength) {
			highestStrength = strength;
			mostEffectiveUnit = effectiveUnitId;
		}
	});

	return mostEffectiveUnit;
};

// Example usage:
const unitId1 = "skirmisher";
const mostEffectiveUnit = getMostEffectiveUnit1(unitId1);
console.log("Most effective unit against " + unitId1 + ": " + mostEffectiveUnit);
const unitId11 = "longbow";
const mostEffectiveUnit11 = getMostEffectiveUnit1(unitId11);
console.log("Most effective unit against " + unitId11 + ": " + mostEffectiveUnit11);


const getUnitAndEffectiveAgainst2 = (unitId) => {
	const unit = UnitsModel[unitId]; // Get the unit object based on unitId
	const effectiveAgainst = [];

	// Iterate through the damage_bonuses array of the current unit
	unit.damage_bonuses.forEach(bonus => {
		effectiveAgainst.push(bonus.unit_type_id); // Add unit_type_id to effectiveAgainst array
	});

	// Create the result object with unit and effectiveAgainst properties
	const result = {
		unit: unitId,
		effectiveAgainst: effectiveAgainst
	};

	return result;
};

const getMostEffectiveUnits2 = (unitId, numUnits) => {
	const result = getUnitAndEffectiveAgainst2(unitId);
	const effectiveAgainst = result.effectiveAgainst;
	const sortedUnits = effectiveAgainst.sort((a, b) => {
		// Sort units based on their strength values in descending order
		return UnitsModel[b].strength - UnitsModel[a].strength;
	});

	// Get the top numUnits effective units
	const mostEffectiveUnits = sortedUnits.slice(0, numUnits);

	return mostEffectiveUnits;
};

// Example usage:
const unitId2 = "knight";
const numUnits = 3;
const mostEffectiveUnits2 = getMostEffectiveUnits2(unitId2, numUnits);
console.log("Most effective units against " + unitId2 + ": " + mostEffectiveUnits2);
