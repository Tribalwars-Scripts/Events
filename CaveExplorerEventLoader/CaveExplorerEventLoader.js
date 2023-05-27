
const cave_variation = {
	0: {

	},
	1:{

	},
	2:{

	},
	3:{

	},
	4:{

	}
}

const PlayerData={
	player_energies: {
		torch: 1

	},
	"player": {

		"health": 100,
		"damage": 31,
		"armor": 5,
		"critical_hit": 8,
		"nodes": {
			"0": {
				"player_id": "2172335",
				"position": "0",
				"event": "[]",
				"status": "unlocked",
				"type": "battle"
			},
			"10": {
				"player_id": "2172335",
				"position": "10",
				"event": "[]",
				"status": "locked",
				"type": "battle"
			},
			"11": {
				"player_id": "2172335",
				"position": "11",
				"event": "[]",
				"status": "locked",
				"type": "battle"
			},
			"12": {
				"player_id": "2172335",
				"position": "12",
				"event": "[]",
				"status": "locked",
				"type": "event"
			},
			"20": {
				"player_id": "2172335",
				"position": "20",
				"event": "[]",
				"status": "locked",
				"type": "event"
			},
			"21": {
				"player_id": "2172335",
				"position": "21",
				"event": "[]",
				"status": "locked",
				"type": "battle"
			},
			"22": {
				"player_id": "2172335",
				"position": "22",
				"event": "[]",
				"status": "locked",
				"type": "merchant"
			},
			"30": {
				"player_id": "2172335",
				"position": "30",
				"event": "[]",
				"status": "locked",
				"type": "treasure"
			},
			"31": {
				"player_id": "2172335",
				"position": "31",
				"event": "[]",
				"status": "locked",
				"type": "battle"
			},
			"32": {
				"player_id": "2172335",
				"position": "32",
				"event": "[]",
				"status": "locked",
				"type": "event"
			},
			"40": {
				"player_id": "2172335",
				"position": "40",
				"event": "[]",
				"status": "locked",
				"type": "event"
			},
			"41": {
				"player_id": "2172335",
				"position": "41",
				"event": "[]",
				"status": "locked",
				"type": "event"
			},
			"42": {
				"player_id": "2172335",
				"position": "42",
				"event": "[]",
				"status": "locked",
				"type": "treasure"
			},
			"50": {
				"player_id": "2172335",
				"position": "50",
				"event": "[]",
				"status": "locked",
				"type": "battle"
			},
			"51": {
				"player_id": "2172335",
				"position": "51",
				"event": "[]",
				"status": "locked",
				"type": "merchant"
			},
			"52": {
				"player_id": "2172335",
				"position": "52",
				"event": "[]",
				"status": "locked",
				"type": "battle"
			},
			"60": {
				"player_id": "2172335",
				"position": "60",
				"event": "[]",
				"status": "locked",
				"type": "boss"
			},
			"70": {
				"player_id": "2172335",
				"position": "70",
				"event": "[]",
				"status": "locked",
				"type": "exit"
			}
		},
		"inventory": [
			{
				"item": "armor",
				"name": "Moeda escudo"
			}
		],
		"cave_level": 3,
		"cave_variation": 3,
		"free_heal": false,
		"heal_feature_used": 0,
		"heal_feature_cost": 20
	},
}


const parseAjaxData=(e) => {

}


const healPlayer=() => {
	TribalWars.post("event_cave_explorer", {ajaxaction: "heal"}, {}, function (e) {
		CaveExplorerEvent.parseAjaxData(e)
	})
}

const nodeAction = (idNode, Selection) => {
	TribalWars.post("event_cave_explorer", {ajaxaction: "make_node_selection"}, {
		node_id: idNode,
		selection: Selection
	}, function (e) {
		$("#cave-dialog").attr("data-id", ""), Dialog.close("#cave-dialog"), CaveExplorerEvent.parseAjaxData(e)
	})
}


//heal return html

const html_heal={
	"player_energies": {
		"torch": {
			"energy_type": {
				"id": "torch",
				"name": "Tocha",
				"name_plural": "Tochas",
				"image_src": "https://dspt.innogamescdn.com/asset/935e323b/graphic/events/cave_explorer/icon_energy.png",
				"image_info": {
					"hash": "22b83",
					"width": 18,
					"height": 18,
					"has_retina": false,
					"src": "events/cave_explorer/icon_energy.png"
				},
				"description": "Suas tochas estão sendo usadas para explorar grutas!"
			},
			"max_value": 10,
			"recharge_seconds": 3600,
			"snapshot_value": 0.00999333,
			"snapshot_time": 1685173209
		}
	},

	"currency": 3185,
}