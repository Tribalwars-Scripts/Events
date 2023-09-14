//fetch event information


let data = {};
TribalWars.get("event_assault", {ajax: "poll"}, function (e) {
	//handle response inside?
	const eventStats = {
		catapult: (e.battleground.areas.catapult.progress * 100)/e.battleground.areas.catapult.target,
		assault: (e.battleground.areas.assault.progress * 100)/e.battleground.areas.assault.target,
		naval: (e.battleground.areas.naval.progress * 100)/e.battleground.areas.naval.target,
	}
})





const sampleData = {
	"battleground": {
	"areas": {
		"catapult": {
			"progress": 111,
				"target": 1250,
				"activation_text": "Quando o bombardeamento está ativo, acrescenta-se um ponto de dano ao castelo e aumenta o dano do assalto completado contra o castelo em 3."
		},
		"assault": {
			"progress": 1182,
				"target": 1500,
				"activation_text": "Quando o assalto está ativo, o dano será entre 1 e 5 (mais 3 bónus de bombardeio) danos ao castelo inimigo."
		},
		"naval": {
			"progress": 104,
				"target": 1000,
				"activation_text": "Quando o apoio naval é ativado, acrescenta 625 pontos ao bombardeamento e 750 pontos ao assalto."
		}
	},
	"keep": {
		"hp_max": 25,
			"hp": 24,
			"medals": 5000,
			"raid": {
			"possible": false,
				"enabled": 1,
				"medals": 200,
				"cost": 150
		}
	},
	"group_milestones": {
		"keeps_destroyed": 0,
			"next_milestone": {
			"requirement": 4,
				"medals": 200
		}
	},
	"ts": 1692137656.584791
},
	"tribe_progress": {
	"medals": 1028,
		"contribute": {
		"cost": 50,
			"is_cost_increased": false,
			"time_cost_resets": 1692140400,
			"medals": 1500,
			"possible": true
	},
	"are_all_rewards_earned": false,
		"ts": 1692137656.584791
},
	"medals": 10,
	"player_energies": {
	"mercenary": {
		"energy_type": {
			"id": "mercenary",
				"name": "Mercenário",
				"name_plural": "Mercenários",
				"image_src": "https://dspt.innogamescdn.com/asset/2871a0d9/graphic/events/assault/icon_energy.png",
				"image_info": {
				"hash": "a6f77",
					"width": 18,
					"height": 18,
					"has_retina": false,
					"src": "events/assault/icon_energy.png"
			},
			"description": "Use mercenários para fortalecer o ataque."
		},
		"max_value": 16,
			"recharge_seconds": 1800,
			"snapshot_value": 0.00232,
			"snapshot_time": 1692137237,
		    "life_back": 1692139037
	}
}
}

1800 - 1
