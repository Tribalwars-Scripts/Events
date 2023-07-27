let PBLoader=(function () {
	let appendTo= "#main_body";
	let RewardMessage='Sample Reward Message';
	let PBaction = ['Running','Tests']
	let PBlength = 0;

	function startLoader(appendTo = getAppendTo(), length = getLength()) {
		let width=$("#content_value")[0].clientWidth;
		$(appendTo).eq(0).prepend(`
<div id="progressbar" class="progress-bar progress-bar-alive">
    <span class="count label">0/${length}</span>
    <div id="progress"><span class="count label" style="width: ${width}px;">0/${length}</span></div>
</div>`);
	}

	function loaded(num, length= getLength(), action= getAction()) {
		$("#progress").css("width", `${(num + 1) / length * 100}%`);
		$(".count").text(`${action[0]} ${(num + 1)} / ${length}  ${action[1]}.`);
	}

	function endLoader(RewardMessage = getRewardMessage()) {
		if ($("#progressbar").length > 0) {
			$("#progressbar").remove();
		}
		UI.BanneredRewardMessage(RewardMessage, 1e4);
	}

	function setAppendTo(eID) {
		appendTo='#' + eID.toString();
	}

	function setLength(length){
		PBlength = length;
	}
	function setAction(actionArr){
		PBaction = actionArr;
	}

	function setRewardMessage(RewardMSG){
		RewardMessage = RewardMSG;
	}

	function getLength(){return PBlength;}

	function getAction(){return PBaction;}

	function getRewardMessage(){return RewardMessage;}

	function getAppendTo(){return appendTo;}

	// Reveal public pointers to
	// private functions and properties
	return {
		startLoader: startLoader,
		loaded: loaded,
		endLoader: endLoader,
		setAppendTo: setAppendTo,
		setLength: setLength,
		setRewardMessage:setRewardMessage,
		setAction: setAction,
		getLength: getLength,
		getAction: getAction
	};
})();





