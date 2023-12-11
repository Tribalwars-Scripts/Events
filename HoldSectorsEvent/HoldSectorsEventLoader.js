// setPrefsId: ScriptTag + 'SetPrefs'
// 	resetPrefsId: ScriptTag + 'ResetPrefs',
// 	startButtonId: ScriptTag + 'StartButton',
// 	settingsName: ScriptName + ' Settings',
const unlockButtons=() => {
	const unlockX=(ID) => {
		document.getElementById(ID).classList.remove('btn-disabled')
	}

	const handleEventButtons=[ UIIds.setPrefsId, UIIds.resetPrefsId, UIIds.startButtonId, UIIds.setEventSettingsId ]
	handleEventButtons.forEach(e => unlockX(e))
	document.getElementById(UIIds.setEventSettingsId).parentElement.children[1].textContent="General " + ScriptName + " settings."
}

const resetSettings=() => {
	const data=getLocalStorage(StorageIds.globalData)
	if (data) {
		data.EventSettings=null
	}
	printSuccess("Settings have been reset")
}

const saveSettings=() => {

	const getSaved = getLocalStorage(StorageIds.globalData)

	if (getSaved === globalData){
		printError("Nothing to save.")
		return
	}
	saveLocalStorage(StorageIds.globalData, globalData);
	printSuccess("Settings successfully saved")
}

unlockButtons();

const startStopBot=() => {
	const savedData=getLocalStorage(StorageIds.globalData)
	savedData.running= !savedData.running;
	document.getElementById(UIIds.startButtonId).innerText=savedData.running ? 'Stop' :'Start';
	saveLocalStorage(StorageIds.globalData, savedData);
	savedData.running ? start(): {}
}

document
	.getElementById(UIIds.setEventSettingsId)
	.addEventListener('click', async function () {
		$.ajax({
			type: 'GET',
			url: 'https://rawcdn.githack.com/Tribalwars-Scripts/Events/'+ ScriptVersion + '/HoldSectorsEvent/settings.min.js?min=1',
			dataType: 'script',
			cache: false,
		});
	})
document
	.getElementById(UIIds.resetPrefsId)
	.addEventListener('click', async function () {
		resetSettings();
	})
document
	.getElementById(UIIds.setPrefsId)
	.addEventListener('click', async function () {
		saveSettings();
	})

document
	.getElementById(UIIds.startButtonId)
	.addEventListener('click', async function () {
		startStopBot();
	})


const start=async () => {
	const saveData=getLocalStorage(StorageIds.globalData)
	const isStart=async () => {

	}
	saveData.running ? await isStart() :{};
}


setTimeout(start, 5e4);


//
// let tr_eventseas=document.createElement("tr");
// tbody.appendChild(tr_eventseas);
// let td_es=document.createElement("td");
// td_es.setAttribute("style", "padding: 4px;");
//
// let SettingsNameEntry=document.createTextNode("Daily Crew: ");
// td_es.appendChild(SettingsNameEntry);
//
// let SettingsNameEntryBtn=document.createElement("button");
// SettingsNameEntryBtn.id='#asd';
// SettingsNameEntryBtn.classList.add("btn");
// SettingsNameEntryBtn.classList.add("btn-disabled");
// SettingsNameEntryBtn.setAttribute("style", "margin: 4px;");
// SettingsNameEntryBtn.innerHTML="Set";
// td_es.appendChild(SettingsNameEntryBtn);
//
// let SettingsNameEntryInfo=document.createTextNode("Automatically recruit units to get Daily Crew");
// let SettingsNameEntryInfoSpan=document.createElement("span");
// SettingsNameEntryInfoSpan.setAttribute("style", "font-size: 10px; color: DarkSlateGrey;");
// SettingsNameEntryInfoSpan.appendChild(SettingsNameEntryInfo);
// td_es.appendChild(SettingsNameEntryInfoSpan);
//
// tr_eventseas.appendChild(td_es);