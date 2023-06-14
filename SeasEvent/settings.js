(async () => {

	/**
	 * @typedef {Object} StaticData
	 * @property {Object} discord - Discord related static data.
	 * @property {Object} ingame - In-game related static data.
	 */

	/**
	 * @typedef {Object} DiscordData
	 * @property {Object} users - Discord user data.
	 * @property {Object} servers - Discord server data.
	 */

	/**
	 * @typedef {Object} InGameData
	 * @property {function(string, string): string} getPlayerURL - Function to get the player URL for a specific player and server.
	 */

	/**
	 * StaticData - Object containing static data for Discord and in-game.
	 *
	 * @type {StaticData}
	 */
	const StaticData={
		/**
		 * Discord related static data.
		 *
		 * @type {DiscordData}
		 */
		discord: {
			/**
			 * Discord user data.
			 *
			 * @type {Object}
			 * @property {string} baseURI - Base URI for Discord users.
			 * @property {string} 'Im Kumin' - Discord ID for 'Im Kumin'.
			 * @property {string} '- Bonobobo' - Discord ID for '- Bonobobo'.
			 */
			users: {
				baseURI: 'https://discord.com/users/', 'Im Kumin': '153552248004149248', '- Bonobobo': '432864216647598100',
			}, /**
			 * Discord server data.
			 *
			 * @type {Object}
			 * @property {string} baseURI - Base URI for Discord servers.
			 * @property {string} 'ImKumin' - Discord server ID for 'ImKumin'.
			 * @property {string} '- Bonobobo' - Discord server ID for '- Bonobobo'.
			 */
			servers: {
				baseURI: 'https://discord.gg/', 'Im Kumin': 'JpHMjH8QtB', '- Bonobobo': 'uhwzAjCC3w',
			},
		}, /**
		 * In-game related static data.
		 *
		 * @type {InGameData}
		 */
		ingame: {
			/**
			 * Function to get the player URL for a specific player and server.
			 *
			 * @param {string} player - The player name.
			 * @param {string} server - The server name.
			 * @returns {string} - The player URL for the given player and server, or a fallback URL if the server is not listed.
			 */
			getPlayerURL(player, server) {
				const serverData=this.servers[server];
				const playerID=serverData ? serverData[player] :undefined;
				return playerID ? TribalWars.buildURL('GET', 'info_player', {id: playerID}) :this.getPlayerURL(player, 'pt');
			}, servers: {
				pt: {
					'Im Kumin': '2871948', '- Bonobobo': '2172335',
				}, es: {
					'Im Kumin': '31413', '- Bonobobo': '456765',
				}, fr: {
					'Im Kumin': '567567', '- Bonobobo': '345345',
				},
			},
		},
	};
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
                        ${ScriptName} script made by <a href='./game.php?village=?&screen=info_player&id=${StaticData.ingame.pt['- Bonobobo']}'>- Bonobobo</a> is an automated event script.
                        <br>
                        User Interface powered by <a href='./game.php?village=212&screen=info_player&id=2871948'>Im Kumin</a>
                        <p></p>
                        <p></p>
                        <h3 style="color: darkcyan">Daily Troops</h3>
                        <bs>
                        Automatically recruit units to get the Daily Troops ?
                        <p></p>
                        <p></p>
                        If you have any question feel free to join my <a style="color: -webkit-link" href="${StaticData.discord.servers.baseURI}${StaticData.discord.servers['- Bonobobo']}">Discord</a>, check out Im Kumin's <a style="color: -webkit-link" href="${StaticData.discord.servers.baseURI}${StaticData.discord.servers['Im Kumin']}">Discord</a> as well.
                        <br>
                        Invite doesn't work? Contact me in game, <a href='./game.php?village=?&screen=info_player&id=${StaticData.ingame.pt['- Bonobobo']}'>- Bonobobo</a>.
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
			data.EventSettings = EventSettings;
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