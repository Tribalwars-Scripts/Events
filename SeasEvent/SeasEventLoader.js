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
}

const saveSettings=() => {
	saveLocalStorage(StorageIds.globalData, globalData)
}

unlockButtons();

const startStopBot=() => {
	const savedData=getLocalStorage(StorageIds.globalData)
	savedData.running= !savedData.running;
	document.getElementById(UIIds.startButtonId).innerText=savedData.running ? 'Stop' :'Start';
	saveLocalStorage(StorageIds.globalData, savedData);
}

document
	.getElementById(UIIds.setEventSettingsId)
	.addEventListener('click', async function () {
		$.ajax({
			type: 'GET',
			url: 'https://rawcdn.githack.com/Tribalwars-Scripts/Events/'+ ScriptVersion + '/SeasEvent/settings.min.js?min=1',
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

		const fetchDTroops = async() =>{

			const nextInteraction = () =>{
				// Convert Unix timestamp to milliseconds
				const timestampInMilliseconds = newTime * 1000;

// Create a new Date object with the timestamp
				const date = new Date(timestampInMilliseconds);

// Extract the components of the date
				const year = date.getFullYear();
				const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
				const day = ("0" + date.getDate()).slice(-2); // Add leading zero if needed
				const hours = ("0" + date.getHours()).slice(-2); // Add leading zero if needed
				const minutes = ("0" + date.getMinutes()).slice(-2); // Add leading zero if needed
				const seconds = ("0" + date.getSeconds()).slice(-2); // Add leading zero if needed

// Construct the human-readable time string
				const readableTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

				UI.SuccessMessage("Next daily troops on " + readableTime)
			}
			$.ajax({
				type: 'GET',
				url: 'https://rawcdn.githack.com/Tribalwars-Scripts/Events/'+ ScriptVersion + '/SeasEvent/DailyTroops.min.js?min=1',
				dataType: 'script',
				cache: false,
			});
			await sleep(2e4);
			saveData.time = currentTime;
			saveData.time2 = newTime;
			nextInteraction();
			saveLocalStorage(StorageIds.globalData,saveData);
		}

// Get the current time in Unix timestamp format
		const currentTime=Math.floor(Date.now() / 1000);

// Create a new Date object
		const currentDate=new Date();

// Set the time to 2 PM
		currentDate.setHours(14, 0, 0, 0);

// Check if the current time is already past 2 PM
		if (currentDate.getTime() < Date.now()) {
			// If the current time is past 2 PM, add 1 day to the current date
			currentDate.setDate(currentDate.getDate() + 1);
		}

// Get the new time in Unix timestamp format
		const newTime=Math.floor(currentDate.getTime() / 1000);

		const previousDTroops=saveData.time;
		const nextDTroops=saveData.time2;
		if (previousDTroops && nextDTroops){// not the first time
			if (currentTime > nextDTroops){
				await fetchDTroops();
			}
		}else{
			await fetchDTroops();
		}
		inProgress();
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