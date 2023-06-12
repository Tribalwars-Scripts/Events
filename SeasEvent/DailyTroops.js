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
			$(".count").text(`${action} ${(num + 1)} / ${length} Daily Troops.`);
		}
		function endLoader()
		{
			if($("#progressbar").length > 0)
				$("#progressbar").remove();
			UI.BanneredRewardMessage("Daily Troops redeemed", 1e4)
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
				const namePage='barracks';
				const SpearR = async (units = 1) =>{
					const createLink={ajaxaction: 'train', mode: 'train'};
					const data={units: {spear: units}};
					TribalWars.post(namePage, createLink, data, function (e) {
						UI.SuccessMessage('Successfully recruited 1 spear', 100);
					});
					await sleep(1000);
				}

				const recruitR = async () => {
					const getDailyTroopsUnits = () =>{
						const TroopsGranted = document.querySelectorAll("li.granted");
						const TroopsSizer = document.querySelectorAll('.daily-grants > ul > li');
						return [TroopsGranted, TroopsSizer]
					}
					loaded(--getDailyTroopsUnits()[0].length, getDailyTroopsUnits()[1].length, 'Recruited');
					const rR = async () =>{
						//Recruits 2 Spears
						for (let i=0; i < 1;i++) {
							await (async () => {
								await SpearR();
							})();
						}
						//Kills the 2 Spears
						await (async () => {
							const createLink={action: 'cancel_all', mode: 'train', building: namePage};
							const data={};
							TribalWars.get(namePage, createLink, data, function (e) {
								UI.SuccessMessage('Successfully cancelled the recruitment process', 100);
							});
							await sleep(1000);
						})();
					}
					let UnitsArr = getDailyTroopsUnits();
					while (UnitsArr[0].length !== UnitsArr[1].length){
						loaded(UnitsArr[0].length, UnitsArr[1].length, 'Recruited');
						await rR();
						UnitsArr = getDailyTroopsUnits();
					}
					endLoader();
				}
				const TroopsGranted = document.querySelectorAll("granted");
				TroopsGranted ? await recruitR(): await SpearR().then(async r => await recruitR())

			})();

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