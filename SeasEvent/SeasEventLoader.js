const DailyTroops = (async () => {
	const checkRequirements = async () => {
		const spear=[50,30,10],pop_min=200,spear_min=spear.map(a=>a*pop_min),{pop,pop_max,iron,wood,stone}=game_data.village,res={wood,stone,iron};
		if ((pop_max - pop) > pop_min && Object.keys(res).every((key, index) => res[key] > spear_min[index])) {
			for (let i = 0; i < pop_min; i++) {
				await (async () => {
					const namePage = 'barracks';
					const createLink = { ajaxaction: 'train', mode: 'train' };
					const data = { units: { spear: 1 } };
					TribalWars.post(namePage, createLink, data, function (e) {
						UI.SuccessMessage('Done', 1000);
					});
					await sleep(1000);
				})();
			}
			return 1;
		} else if (parseInt(game_data.player.villages) > 1 && game_data.features.Premium.active) {
			document.querySelector('#village_switch_right').click();
			await sleep(500); // Adjust sleep time if needed
			await checkRequirements();
		} else {
			return 0;
		}
	};
	await checkRequirements();
})();

