const getPBLoader=async () => {
	$.ajax({
		type: "GET",
		url: "https://rawcdn.githack.com/Tribalwars-Scripts/Events/v0.1.81-beta/UILoader/ProgressBarLoader.min.js?min=1",
		dataType: "script",
		cache: false
	})
};

(function() {
	'use strict';
	console.log("-- Dragon Event Script Started --");
	getPBLoader().then(RollDice)
	setInterval(function wait(){
		location.reload();
		RollDice();
	},3.6e+6);
})();



function RollDice() {
	PBLoader.setLength(Number(document.getElementById("dragons_energy_display").textContent.split('/')[0].trim()));
	PBLoader.setRewardMessage("Successfully rolled " + PBLoader.getLength() + " times.")
	PBLoader.setAppendTo(UIIds.divScriptId)
	PBLoader.startLoader();
	Array.from({ length:  PBLoader.getLength()}, () => ['Dice roll', 'rolls']).forEach((PBmsg, index) => {
		setTimeout(async () => {
			DragonsEvent.rollDice();
			PBLoader.loaded(index + 1, PBLoader.getLength(), PBmsg);
			await sleep(300);
			if (document.getElementsByClassName("event-card").length > 0){
				document.getElementsByClassName("popup_box_close tooltip-delayed")[0].click()
			}
		}, index * 1e3); // Delay in milliseconds, multiplied by the current index
	});
	PBLoader.endLoader();
}