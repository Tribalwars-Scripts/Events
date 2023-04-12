$(function () {
	Timing.whenReady(function () {
		require([ 'Ig/TribalWars/Modules/EventGift/MainScreen' ], function (EventScreen) {
			window.EventGift = new EventScreen(
				{
					"can_reset": false,
					"can_shuffle": true,
					"can_premium_open": 1,
					"collection": {
						"items": [ {
							"item": {
								"item_id": 4002,
								"instance_id": 0,
								"name": "Revealer",
								"admin_name": "Revealer",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/4002.png",
								"image_info": {
									"hash": "03894",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/4002.png"
								},
								"type": 2,
								"category": 3,
								"color": null,
								"actions": [],
								"links": [ {
									"name": "Evento aberto",
									"link": "\/game.php?village=21418&screen=event_gift",
									"allow_sitter": true
								} ],
								"tags": [],
								"descriptions": [ {
									"text": "Quando aberto, revela um presente aleat\u00f3rio, dos itens restantes. Se houver itens, o teu revelador, ser\u00e1 usado quando tiveres a pr\u00f3xima colec\u00e7\u00e3o, de itens, dispon\u00edveis.",
									"color": null,
									"image": null
								} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 4003,
								"instance_id": 0,
								"name": "Opener",
								"admin_name": "Opener",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/4003.png",
								"image_info": {
									"hash": "1265a",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/4003.png"
								},
								"type": 2,
								"category": 3,
								"color": null,
								"actions": [],
								"links": [ {
									"name": "Evento aberto",
									"link": "\/game.php?village=21418&screen=event_gift",
									"allow_sitter": true
								} ],
								"tags": [],
								"descriptions": [ {
									"text": "Permite abrir um presente da sua escolha gratuitamente uma vez.",
									"color": null,
									"image": null
								} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 4004,
								"instance_id": 0,
								"name": "Doubler",
								"admin_name": "Doubler",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/4004.png",
								"image_info": {
									"hash": "77d3f",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/4004.png"
								},
								"type": 2,
								"category": 3,
								"color": null,
								"actions": [],
								"links": [ {
									"name": "Evento aberto",
									"link": "\/game.php?village=21418&screen=event_gift",
									"allow_sitter": true
								} ],
								"tags": [],
								"descriptions": [ {
									"text": "Depois de ganhares um Doubler, o pr\u00f3ximo presente receber\u00e1s em dobro.",
									"color": null,
									"image": null
								} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 1002,
								"instance_id": 0,
								"name": "Pacote de recursos (5%)",
								"admin_name": "Pacote de recursos (5%)",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/resources_percent.png",
								"image_info": {
									"hash": "a5ea1",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/resources_percent.png"
								},
								"type": 2,
								"category": 2,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.consumeItem('%item_key%')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Adiciona 5% da capacidade dos seus armaz\u00e9ns de recursos em todas as cidades. ",
									"color": null,
									"image": null
								} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3007,
								"instance_id": 0,
								"name": "Booster de espada",
								"admin_name": "Booster de espada (5%) 2 days",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3007.png",
								"image_info": {
									"hash": "7a842",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3007.png"
								},
								"type": 2,
								"category": 4,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Espadachim: +5% poder de defesa e ofensivo",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 48:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3003,
								"instance_id": 0,
								"name": "Sigilia de desespero",
								"admin_name": "Sigilia de desespero (10%) 2 days",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3003.png",
								"image_info": {
									"hash": "36124",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3003.png"
								},
								"type": 2,
								"category": 4,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Apoio enviado enquanto ativo viajar\u00e1 10% mais r\u00e1pido. N\u00e3o ter\u00e1 efeito em comandos j\u00e1 enviados.",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 48:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Na aldeia", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3014,
								"instance_id": 0,
								"name": "Booster de raids",
								"admin_name": "Booster de raids (15%) 2 days",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3014.png",
								"image_info": {
									"hash": "c1597",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3014.png"
								},
								"type": 2,
								"category": 4,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "+15% Capacidade carga",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 48:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3054,
								"instance_id": 0,
								"name": "B\u00f3nus de Nobre",
								"admin_name": "B\u00f3nus de Nobre (2) 1 day",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3054.png",
								"image_info": {
									"hash": "42058",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3054.png"
								},
								"type": 2,
								"category": 4,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Aumente a perda de lealdade em 2 para que todos os ataques de nobres sejam bem sucedidos.",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 24:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3068,
								"instance_id": 0,
								"name": "Booster de quart\u00e9is",
								"admin_name": "Booster de quart\u00e9is (5%) 1 day",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3068.png",
								"image_info": {
									"hash": "32b6d",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3068.png"
								},
								"type": 2,
								"category": 6,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Todas velocidade de recrutamento em Quartel s\u00e3o 5% mais r\u00e1pidos!",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 24:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3066,
								"instance_id": 0,
								"name": "Booster de dano da catapulta",
								"admin_name": "Booster de dano da catapulta (25%) 1 day",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3066.png",
								"image_info": {
									"hash": "f311d",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3066.png"
								},
								"type": 2,
								"category": 4,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Catapulta: +25% Dano contra edif\u00edcios",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 24:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3084,
								"instance_id": 0,
								"name": "Boost ofensor batedor",
								"admin_name": "Boost ofensor batedor (20%) 1 day",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3084.png",
								"image_info": {
									"hash": "d6105",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3084.png"
								},
								"type": 2,
								"category": 4,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Batedores em ataques s\u00e3o 20% melhores a sobreviver.",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 24:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3042,
								"instance_id": 0,
								"name": "Recrutador:",
								"admin_name": "Recrutador: (5%) 1 day",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3042.png",
								"image_info": {
									"hash": "46525",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3042.png"
								},
								"type": 2,
								"category": 6,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "O recrutamento de unidades, incluindo nobres, \u00e9 5% mais r\u00e1pido!",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 24:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3008,
								"instance_id": 0,
								"name": "Booster de espada",
								"admin_name": "Booster de espada (10%) 2 days",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3008.png",
								"image_info": {
									"hash": "85fc4",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3008.png"
								},
								"type": 2,
								"category": 4,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Espadachim: +10% poder de defesa e ofensivo",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 48:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3037,
								"instance_id": 0,
								"name": "Selas melhorada",
								"admin_name": "Selas melhorada",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3037.png",
								"image_info": {
									"hash": "b5d32",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3037.png"
								},
								"type": 2,
								"category": 6,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.consumeItem('%item_key%')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Aumenta permanentemente a velocidade de recrutamento na Est\u00e1bulo em 10%",
									"color": null,
									"image": null
								}, {
									"text": "Pode ser usado apenas uma vez por aldeia.",
									"color": null,
									"image": null
								} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 1003,
								"instance_id": 0,
								"name": "Pacote de recursos (10%)",
								"admin_name": "Pacote de recursos (10%)",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/resources_percent.png",
								"image_info": {
									"hash": "a5ea1",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/resources_percent.png"
								},
								"type": 2,
								"category": 2,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.consumeItem('%item_key%')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Adiciona 10% da capacidade dos seus armaz\u00e9ns de recursos em todas as cidades. ",
									"color": null,
									"image": null
								} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3017,
								"instance_id": 0,
								"name": "Booster de atacante",
								"admin_name": "Booster de atacante (15%) 1 day",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3017.png",
								"image_info": {
									"hash": "c187d",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3017.png"
								},
								"type": 2,
								"category": 4,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Viking: +15% poder do atacante<br \/>Cavalaria leve: +15% poder do atacante",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 24:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3001,
								"instance_id": 0,
								"name": "P\u00e9 de guerra",
								"admin_name": "P\u00e9 de guerra. 2 days",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3001.png",
								"image_info": {
									"hash": "d19d6",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3001.png"
								},
								"type": 2,
								"category": 5,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.openItemDialog('%item_key%', 'activate_reward')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "<span class=\"warn\">-10% produ\u00e7\u00e3o de recursos<\/span><br \/>O recrutamento de unidades, incluindo nobres, \u00e9 25% mais r\u00e1pido!",
									"color": null,
									"image": null
								}, {
									"text": "Dura\u00e7\u00e3o: 48:00:00 ",
									"color": "green",
									"image": null
								}, {"text": "Aplicar a: Em todas as aldeias", "color": "green", "image": null} ],
								"new_count": 0
							}, "state": "new"
						}, {
							"item": {
								"item_id": 3022,
								"instance_id": 0,
								"name": "Crescimento da planta\u00e7\u00e3o",
								"admin_name": "Crescimento da planta\u00e7\u00e3o",
								"image": "https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/items\/3022.png",
								"image_info": {
									"hash": "d3f0f",
									"width": 92,
									"height": 92,
									"has_retina": true,
									"src": "items\/3022.png"
								},
								"type": 2,
								"category": 5,
								"color": null,
								"actions": [ {
									"name": "Usar",
									"link": "javascript:Inventory.consumeItem('%item_key%')",
									"allow_sitter": true
								} ],
								"links": [],
								"tags": [ {"type": "use_type", "tag": 1} ],
								"descriptions": [ {
									"text": "Aumenta permanentemente o m\u00e1ximo da popula\u00e7\u00e3o da aldeia atual em 10%",
									"color": null,
									"image": null
								}, {
									"text": "Pode ser usado apenas uma vez por aldeia.",
									"color": null,
									"image": null
								} ],
								"new_count": 0
							}, "state": "new"
						} ], "type": "original"
					},
					"item_counts": {"4002": "20", "4003": "20", "4004": "20"},
					"costs": {
						"reset": {
							"formatted_cost": "<span style=\"white-space:nowrap;\"><img src=\"https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/premium\/coinbag_18x18.png\" title=\"\" alt=\"\" class=\"event-mini-icon\" \/> 100<\/span> Pontos Premium",
							"cost": 100
						},
						"open": {
							"formatted_cost": "<span style=\"white-space:nowrap;\"><img src=\"https:\/\/dspt.innogamescdn.com\/asset\/a2017f0b\/graphic\/premium\/coinbag_18x18.png\" title=\"\" alt=\"\" class=\"event-mini-icon\" \/> 50<\/span> Pontos Premium",
							"cost": 50
						}
					}
				});
		});
	});
});
