

let tr_eventseas=document.createElement("tr");
tbody.appendChild(tr_eventseas);
let td_es=document.createElement("td");
td_es.setAttribute("style", "padding: 4px;");

let SettingsNameEntry=document.createTextNode("Daily Crew: ");
td_es.appendChild(SettingsNameEntry);

let SettingsNameEntryBtn=document.createElement("button");
SettingsNameEntryBtn.id='#asd';
SettingsNameEntryBtn.classList.add("btn");
SettingsNameEntryBtn.classList.add("btn-disabled");
SettingsNameEntryBtn.setAttribute("style", "margin: 4px;");
SettingsNameEntryBtn.innerHTML="Set";
td_es.appendChild(SettingsNameEntryBtn);

let SettingsNameEntryInfo=document.createTextNode("Automatically recruit units to get Daily Crew");
let SettingsNameEntryInfoSpan=document.createElement("span");
SettingsNameEntryInfoSpan.setAttribute("style", "font-size: 10px; color: DarkSlateGrey;");
SettingsNameEntryInfoSpan.appendChild(SettingsNameEntryInfo);
td_es.appendChild(SettingsNameEntryInfoSpan);

tr_eventseas.appendChild(td_es);