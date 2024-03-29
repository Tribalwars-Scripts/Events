let PBLoader=function () {
	let appendTo="#main_body";
	let RewardMessage="Sample Reward Message";
	let PBaction=[ "Running", "Tests" ];
	let PBlength=0;
	let index=0;

	function startLoader(appendTo=getAppendTo(), length=getLength()) {
		console.group("Starting Loader");
		let width=$(appendTo)[0].clientWidth;
		const PBhtml=`
<div id="progressbar" class="progress-bar progress-bar-alive">
    <span class="count label">0/${length}</span>
    <div id="progress"><span class="count label" style="width: ${width}px;">0/${length}</span></div>
</div>`;
		$(appendTo).eq(0).prepend(PBhtml);
		console.log("Loader is loaded");
		console.groupEnd()
	}

	function loaded(num=getIndex(), length=getLength(), action=getAction()) {
		index=num + 1;
		$("#progress").css("width", `${(num + 1) / length * 100}%`);
		$(".count").text(`${action[0]} ${num + 1} / ${length}  ${action[1]}.`)
	}

	function endLoader(RewardMessage=getRewardMessage()) {
		const progressBar=$("#progressbar");
		if (progressBar.length > 0 && progressBar.width() === progressBar.parent().width()) {
			progressBar.remove();
			UI.BanneredRewardMessage(RewardMessage, 1e4)
		}
	}

	function setAppendTo(eID, type="#") {
		appendTo=type + eID
	}

	function setLength(length) {
		PBlength=length
	}

	function setAction(actionArr) {
		PBaction=actionArr
	}

	function setRewardMessage(RewardMSG) {
		RewardMessage=RewardMSG
	}

	function getLength() {
		return PBlength
	}

	function getIndex() {
		return index
	}

	function getAction() {
		return PBaction
	}

	function getRewardMessage() {
		return RewardMessage
	}

	function getAppendTo() {
		return appendTo
	}

	return {
		startLoader: startLoader,
		loaded: loaded,
		endLoader: endLoader,
		setAppendTo: setAppendTo,
		setLength: setLength,
		setRewardMessage: setRewardMessage,
		setAction: setAction,
		getLength: getLength,
		getAction: getAction,
		getIndex: getIndex
	}
}();