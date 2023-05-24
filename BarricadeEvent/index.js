// const Units={
// 	skirmisher: {
// 		id: "skirmisher", strength: 14, damage_bonuses: [ {
// 			unit_type_id: "knight", percent_increase: 50
// 		}, {
// 			unit_type_id: "longbow", percent_increase: 25
// 		} ]
// 	}, longbow: {
// 		id: "longbow", strength: 13, damage_bonuses: [ {
// 			unit_type_id: "pike", percent_increase: 50
// 		} ]
// 	}, bill: {
// 		id: "bill", strength: 12, damage_bonuses: [ {
// 			unit_type_id: "skirmisher", percent_increase: 50
// 		}, {
// 			unit_type_id: "longbow", percent_increase: 25
// 		} ]
// 	}, knight: {
// 		id: "knight", strength: 16, damage_bonuses: [ {
// 			unit_type_id: "bill", percent_increase: 50
// 		} ]
// 	}, pike: {
// 		id: "pike", strength: 20, damage_bonuses: [ {
// 			unit_type_id: "skirmisher", percent_increase: 50
// 		}, {
// 			unit_type_id: "bill", percent_increase: 25
// 		} ]
// 	}
// };
//
// const playerUnits={
// 		skirmisher: {unit_type: "skirmisher", count_owned: 965, count_wounded: 654},
// 		longbow: {unit_type: "longbow", count_owned: 965, count_wounded: 0},
// 		bill: {unit_type: "bill", count_owned: 955, count_wounded: 0},
// 		knight: {unit_type: "knight", count_owned: 950, count_wounded: 0},
// 		pike: {unit_type: "pike", count_owned: 960, count_wounded: 0}
// };
//
// const board={
// 	stages: {
// 		1: {
// 			attacker_unit_capacity: 504, unit_counts: {
// 				skirmisher: 0, longbow: 0, bill: 450, knight: 0, pike: 0
// 			}
//
// 		}, 2: {
// 			attacker_unit_capacity: 660, unit_counts: {
// 				skirmisher: 0, longbow: 0, bill: 0, knight: 0, pike: 420
// 			}
// 		}
// 	}
// }
// //
// // function calculatePlayerUnits(playerUnits, enemyUnits, capacity){
// // 	const playerUnitCounts={};
// // }
// //
// // function calculatePlayerUnits_(boardStage, playerUnits, unitCounts) {
// // 	const attackerUnitCapacity=boardStage.attacker_unit_capacity;
// // 	const units=Units_;
// //
// // 	const playerUnitCounts={};
// //
// // 	// Define the recursive function to calculate the minimum required player units
// // 	const calculateUnitsRecursive=(unitType) => {
// // 		const enemyUnitCount=unitCounts[unitType];
// // 		const playerUnitPool=playerUnits.unit_pools[unitType];
// // 		const playerUnitStrength=units[unitType].strength;
// // 		const playerUnitDamageBonuses=units[unitType].damage_bonuses;
// // 		const playerUnitCount=playerUnitPool.count_owned - playerUnitPool.count_wounded;
// // 		const maxEnemyUnitCount=Math.ceil(enemyUnitCount / playerUnitStrength);
// //
// // 		if (playerUnitCount > 0) {
// // 			const requiredPlayerUnitCount=Math.min(playerUnitCount, maxEnemyUnitCount);
// // 			playerUnitCounts[unitType]=requiredPlayerUnitCount;
// // 		}
// // 		else {
// // 			playerUnitCounts[unitType]=0;
// // 		}
// //
// // 		// If there are more unit types to consider
// // 		if (Object.keys(unitCounts).length > 1) {
// // 			// Calculate the effective strength of each remaining unit type considering damage bonuses
// // 			const effectiveUnitStrengths={};
// // 			for (const remainingUnitType of Object.keys(unitCounts)) {
// // 				if (remainingUnitType !== unitType) {
// // 					const remainingUnitDamageBonuses=units[remainingUnitType].damage_bonuses;
// // 					const effectiveStrength=playerUnitStrength * (1 + remainingUnitDamageBonuses[unitType]);
// // 					effectiveUnitStrengths[remainingUnitType]=effectiveStrength;
// // 				}
// // 			}
// //
// // 			// Sort remaining unit types by effective strength in ascending order
// // 			const remainingUnitTypes=Object.keys(effectiveUnitStrengths).sort((a, b) => effectiveUnitStrengths[a] - effectiveUnitStrengths[b]);
// //
// // 			// Recursively calculate the minimum required units for the remaining unit types
// // 			for (const remainingUnitType of remainingUnitTypes) {
// // 				const requiredUnits=Math.ceil(unitCounts[remainingUnitType] / effectiveUnitStrengths[remainingUnitType]);
// // 				const availableUnits=playerUnits.unit_pools[remainingUnitType].count_owned - playerUnits.unit_pools[remainingUnitType].count_wounded;
// // 				const remainingUnits=Math.max(requiredUnits - availableUnits, 0);
// // 				if (remainingUnits > 0) {
// // 					calculateUnitsRecursive(remainingUnitType);
// // 				}
// // 			}
// // 		}
// // 	};
// //
// // 	// Start the recursive calculation with the first unit type
// // 	const unitTypes=Object.keys(unitCounts);
// // 	calculateUnitsRecursive(unitTypes[0]);
// //
// // 	return playerUnitCounts;
// // }
// //
// function calculatePlayerUnits(playerUnits, board, stageNumber) {
// 	const stage = board.stages[stageNumber];
// 	const maxEnemyUnitCount = stage.attacker_unit_capacity;
// 	const enemyUnitCounts = stage.unit_counts;
// 	const unitTypes = Object.keys(enemyUnitCounts);
//
// 	let totalPlayerUnitCount = 0;
// 	const result = {};
//
// 	for (const unitType of unitTypes) {
// 		const playerUnit = playerUnits[unitType];
// 		const countOwned = playerUnit.count_owned;
// 		const countWounded = playerUnit.count_wounded;
// 		const countAvailable = countOwned - countWounded;
//
// 		if (countAvailable > 0) {
// 			const enemyCount = enemyUnitCounts[unitType];
// 			const unit = Units[unitType];
// 			const unitStrength = unit.strength;
// 			const damageBonuses = unit.damage_bonuses;
//
// 			let effectiveUnitStrength = unitStrength;
// 			for (const damageBonus of damageBonuses) {
// 				const bonusUnitType = damageBonus.unit_type_id;
// 				const bonusPercent = damageBonus.percent_increase;
// 				const bonusCount = enemyUnitCounts[bonusUnitType] || 0;
// 				effectiveUnitStrength += (bonusCount * unitStrength * bonusPercent) / 100;
// 			}
//
// 			const enemyUnitStrength = effectiveUnitStrength * enemyCount;
// 			const countToUse = Math.min(countAvailable, Math.ceil(maxEnemyUnitCount / enemyUnitStrength));
// 			totalPlayerUnitCount += countToUse;
// 			if (countToUse > 0) {
// 				result[unitType] = countToUse;
// 			}
// 		}
// 	}
//
// 	totalPlayerUnitCount = Math.min(totalPlayerUnitCount, maxEnemyUnitCount); // Limit to maxEnemyUnitCount
// 	totalPlayerUnitCount = Math.min(totalPlayerUnitCount, stage.attacker_unit_capacity); // Limit to attacker unit capacity
// 	totalPlayerUnitCount = Math.max(totalPlayerUnitCount, 0); // Ensure non-negative player unit count
// 	return { playerUnitCount: totalPlayerUnitCount, units: result };
// }
//
//
//
//
//
// // Example usage:
// const stage=2; // Board stage to calculate required player units for
// const requiredPlayerUnits=calculatePlayerUnits(playerUnits, board, stage);
// console.log(requiredPlayerUnits);

const Units = {
	skirmisher: {
		id: "skirmisher",
		strength: 14,
		damage_bonuses: [
			{ unit_type_id: "knight", percent_increase: 50 },
			{ unit_type_id: "longbow", percent_increase: 25 }
		]
	},
	longbow: {
		id: "longbow",
		strength: 13,
		damage_bonuses: [{ unit_type_id: "pike", percent_increase: 50 }]
	},
	bill: {
		id: "bill",
		strength: 12,
		damage_bonuses: [
			{ unit_type_id: "skirmisher", percent_increase: 50 },
			{ unit_type_id: "longbow", percent_increase: 25 }
		]
	},
	knight: {
		id: "knight",
		strength: 16,
		damage_bonuses: [{ unit_type_id: "bill", percent_increase: 50 }]
	},
	pike: {
		id: "pike",
		strength: 20,
		damage_bonuses: [
			{ unit_type_id: "skirmisher", percent_increase: 50 },
			{ unit_type_id: "bill", percent_increase: 25 }
		]
	}
};

console.group("Testing")

Units["pike"].damage_bonuses.map((data )=>{
	console.log( data.unit_type_id)
})


console.groupEnd();


const getUnitBonuses = (unit) => Units[unit].damage_bonuses.map(UUnit => {return UUnit.unit_type_id});
const getUnitStrength = (unit) => Units[unit].strength;

const getStrenghtBonus = (unit) => Units[unit]

const simulateBattle = (playerUnits, enemyUnits) => {
	const playerLosses = {};
	const enemyLosses = {};

	for (const unitType in playerUnits) {
		const playerCount = playerUnits[unitType];
		const enemyCount = enemyUnits[unitType];
		const unit = Units[unitType];

		if (playerCount && enemyCount) {
			const totalStrength = playerCount * unit.strength + enemyCount * unit.strength;

			const playerStrength =
				(playerCount * unit.strength *100) / totalStrength +
				unit.damage_bonuses
					.filter(bonus => playerUnits[bonus.unit_type_id] > 0)
					.reduce((total, bonus) => total + bonus.percent_increase, 0);

			const enemyStrength =
				(enemyCount * unit.strength*100) / totalStrength +
				unit.damage_bonuses
					.filter(bonus => enemyUnits[bonus.unit_type_id] > 0)
					.reduce((total, bonus) => total + bonus.percent_increase, 0);

			const playerLoss = Math.round((enemyStrength / 100) * playerCount);
			const enemyLoss = Math.round((playerStrength / 100) * enemyCount);

			playerLosses[unitType] = playerLoss;
			enemyLosses[unitType] = enemyLoss;
		}
	}

	return `Player Wins with losses: Player - ${JSON.stringify(playerLosses)}, Enemy - ${JSON.stringify(
		enemyLosses
	)}`;
};

// Given units and counts
let enemy = { skirmisher: 0, longbow: 0, bill: 0, knight: 0, pike: 330 };
let player = { skirmisher: 0, longbow: 0, bill: 160, knight: 250, pike: 250 };

// Simulate battle and get results
const battleResult = simulateBattle(player, enemy);

// Display battle result with losses
console.log(battleResult);
