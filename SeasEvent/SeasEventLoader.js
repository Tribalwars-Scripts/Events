let DEF_DELAY=1000;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

function getMilliseconds(hrs, min, sec) {
	return ((hrs * 60 * 60 + min * 60 + sec) * 1000);
}


let dailyLog={
	'DailyTroops': {
		'time in here': {
			'Recruitment': 1,
			'...': '...'
		}
	}
}


const DailyTroops=async () => {
	console.group("DailyTroops Function")
	const checkRequirements=async () => {
		function startLoader(length) {
			let width=$("#content_value")[0].clientWidth;
			$("#content_value").eq(0).prepend(`
    <div id="progressbar" class="progress-bar progress-bar-alive">
        <span class="count label">0/${length}</span>
        <div id="progress"><span class="count label" style="width: ${width}px;">0/${length}</span></div>
    </div>`);
		}
		function loaded(num, length, action) {
			$("#progress").css("width", `${(num + 1) / length * 100}%`);
			$(".count").text(`${action} ${(num + 1)} / ${length}`);
			if (num + 1 == length) {
				endLoader();
			}
		}

		console.group("DailyTroops checkRequirements")
		const curVil={
			pop: game_data.village.pop,
			pop_max: game_data.village.pop_max,
			pop_min: 20,
			res: {
				wood: game_data.village.wood,
				stone: game_data.village.stone,
				iron: game_data.village.iron,
			},
			spear: [ 50, 30, 10 ],
			spear_min: [],
		};
		curVil.spear_min=curVil.spear.map((entry) => entry * curVil.pop_min);
		console.dir(curVil)
		if ((curVil.pop_max - curVil.pop) > curVil.pop_min) {
			console.group("DailyTroops checkRequirements Min Pop Passed.");
			await (async () => {
				startLoader(10);
				const recruitR = async () => {
					const rR = async () =>{
						//Recruits 2 Spears
						const namePage='barracks';
						for (let i=0; i < 2; i++) {
							await (async () => {
								const createLink={ajaxaction: 'train', mode: 'train'};
								const data={units: {spear: 1}};
								TribalWars.post(namePage, createLink, data, function (e) {
									UI.SuccessMessage('Successfully recruited 1 spear', 10);
								});
								await sleep(1000);
							})();
						}
						//Kills the 2 Spears
						await (async () => {
							const createLink={action: 'cancel_all', mode: 'train', building: namePage};
							const data={};
							TribalWars.get(namePage, createLink, data, function (e) {
								UI.SuccessMessage('Successfully cancelled the recruitment process', 1000);
							});
							await sleep(1000);
						})();
					}
				}
				const TroopsGranted = document.querySelectorAll("granted");
				TroopsGranted ? await recruitR():await (async () => {
					const createLink={ajaxaction: 'train', mode: 'train'};
					const data={units: {spear: 1}};
					TribalWars.post(namePage, createLink, data, function (e) {
						UI.SuccessMessage('Successfully recruited 1 spear', 10);
					});
					await sleep(1000);
				})();

			})();


			if (Object.keys(curVil.res).every((key, index) => curVil.res[key] > curVil.spear_min[index])) {
				for (let i=0; i < curVil.pop_min; i++) {
					await (async () => {
						const namePage='barracks';
						const createLink={ajaxaction: 'train', mode: 'train'};
						const data={units: {spear: 1}};
						TribalWars.post(namePage, createLink, data, function (e) {
							UI.SuccessMessage('Done', 1000);
						});
						await sleep(1000);
					})();
				}
			}
			else if (Object.keys(curVil.res).every((key, index) => curVil.res[key] > (curVil.spear[index]) * 2)) {
				for (let i=0; i < curVil.pop_min / 2; i++) {
					await recruitR();
				}
			}
			return 1;
		}
		else if (parseInt(game_data.player.villages) > 1 && game_data.features.Premium.active) {
			document.querySelector('#village_switch_right').click();
			await sleep(500); // Adjust sleep time if needed
			await checkRequirements();
		}
		else {
			return 0;
		}
	};
	await checkRequirements();
}

await DailyTroops();