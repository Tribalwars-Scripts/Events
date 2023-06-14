(async () => {

	const settingsUUIDs = {
		popupSettings: {
			popup_box : 'popup_box', //private
			container: this.popup_box + '_container',
			containerID: ScriptTag +this.popup_box+ '_container',
			show: this.popup_box + ' show',
			showID: ScriptTag + this.popup_box + '_popup_show',
			content: this.popup_box + '_content',
			close: {
				main:this.popup_box + '_close',
				tooltip: 'tooltip-delayed',
				ID: this.popup_box + '_cross',
				href: 'javascript:void(0)'
			},
		}
	}

	const EventSettings = {
		daily_troops: false
	}
	let popup_HTML=`<div class="popup_box_container" id="config_popup" style="display:none;">
        <div class="popup_box show" id="popup_box_popup_command" style="width: 800px;">
            <div class="popup_box_content">
                <a class="popup_box_close tooltip-delayed" id="popup_cross" href="javascript:void(0)"> </a>
                <h1 style="text-align: center; color: purple">${ScriptName}</h1>
               <div>
                    <h3 style="color: darkblue">Read me</h3>
                    <div>
                        ${ScriptName} script made by <a href='${StaticData.ingame.getPlayerURL('- Bonobobo', game_data.market)}'>- Bonobobo</a> is an automated event script.
                        <br>
                        User Interface powered by <a href='${StaticData.ingame.getPlayerURL('Im Kumin', game_data.market)}'>Im Kumin</a>
                        <p></p>
                        <p></p>
                        <h3 style="color: darkcyan">Daily Troops</h3>
                        <bs>
                        Automatically recruit units to get the Daily Troops ?
                        <p></p>
                        <p></p>
                        If you have any question feel free to join my <a style="color: -webkit-link" href="${StaticData.discord.servers.baseURI}${StaticData.discord.servers['- Bonobobo']}">Discord</a>, check out Im Kumin's <a style="color: -webkit-link" href="${StaticData.discord.servers.baseURI}${StaticData.discord.servers['Im Kumin']}">Discord</a> as well.
                        <br>
                        Invite doesn't work? Contact me in game, <a href='${StaticData.ingame.getPlayerURL('- Bonobobo', game_data.market)}'>- Bonobobo</a>.
                        <p>
                    </div>
                    <br>
                    <div>
                        <button id='${UIIds.yesId}' class='btn' style='margin: 4px;width: 35px;'>Yes</button>
                        <button id='${UIIds.noId}' class='btn' style='margin: 4px;width: 35px;'>No</button>
                    </div>
                </div>
                <div id="${UIIds.changeLogId}" style="display: none">
                    <h5>Change log</h5>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="fader" id="popup_fader" style="display:none;"></div>`;
	$("body").append(popup_HTML);
	$("#popupSet").off("click");
	$("#popup_fader").off("click");
	$("#popup_cross").off("click");



	let yesButtonId = "#" + UIIds.yesId;
	let noButtonId = "#" + UIIds.noId;

	function loadBeforePopUp() {
		let data = getLocalStorage(StorageIds.globalData);
		const saveSett = () => {
			data.EventSettings = Object(EventSettings);
		}
		if (data != null) // data exists
			if (data.EventSettings) { // already has event settings
				globalData = data;
			}else {
				saveSett();
			}
		else
			saveSett();
		globalData = data;
		saveLocalStorage(StorageIds.globalData, globalData)
		return data;
	}
	const parseSettings = () => {
		data = loadBeforePopUp();
		if (data.EventSettings.daily_troops === undefined){
			document.getElementById(UIIds.noId).classList.remove('btn-disabled')
			document.getElementById(UIIds.yesId).classList.remove('btn-disabled')
			return;
		}
		if (data.EventSettings.daily_troops){
			document.getElementById(UIIds.noId).classList.add('btn-disabled')
			document.getElementById(UIIds.yesId).classList.remove('btn-disabled')
		}else {
			document.getElementById(UIIds.noId).classList.remove('btn-disabled')
			document.getElementById(UIIds.yesId).classList.add('btn-disabled')
		}

	}
	parseSettings();
	const closePopup=() => {
		const remove=(e) => {
			const e2R=document.getElementById(e);
			e2R ? document.getElementById(e).remove() :console.debug('Element not found.');
			;

		}
		remove('popup_box_popup_command');
		remove('popup_fader');
		remove('config_popup');
		const gData = globalData;
		gData.firstTime = false;
		saveLocalStorage(StorageIds.globalData, gData);
	}
	$(yesButtonId).on("click", function () {
		globalData.EventSettings = true;
		closePopup();
	});

	$(noButtonId).on("click", function () {
		globalData.EventSettings = false;
		closePopup();
	});

	$("#popup_fader").on("click", function () {
		closePopup();
	});

	$("#popup_cross").on("click", function () {
		closePopup();
	});

	$("#config_popup")[0].style.display = "flex";
	$("#popup_fader")[0].style.display = "flex";


	setTimeout(closePopup, 60000);
})();