
const popupContainer = document.createElement("div");
popupContainer.className = settingsUUIDs.popupSettings.container;
popupContainer.id = settingsUUIDs.popupSettings.containerID;
popupContainer.style.display = "none";

const popupBox = document.createElement("div");
popupBox.className =  settingsUUIDs.popupSettings.show;
popupBox.id = settingsUUIDs.popupSettings.showID;
popupBox.style.width = "800px";

const popupContent = document.createElement("div");
popupContent.className = settingsUUIDs.popupSettings.content;

const popupClose = document.createElement("a");
popupClose.classList.add(settingsUUIDs.popupSettings.close.main);
popupClose.classList.add(settingsUUIDs.popupSettings.close.tooltip);
popupClose.id = settingsUUIDs.popupSettings.close.ID;
popupClose.href = settingsUUIDs.popupSettings.close.href;
popupContent.appendChild(popupClose);

const h1 = document.createElement("h1");
h1.style.textAlign = "center";
h1.style.color = "purple";
h1.textContent = ScriptName;
popupContent.appendChild(h1);

const divStartSafeMode = document.createElement("div");
const h3 = document.createElement("h3");
h3.textContent = "Start in safe-mode?";
divStartSafeMode.appendChild(h3);

const safeModeSpan = document.createElement("span");
safeModeSpan.style.color = "blue";
safeModeSpan.textContent = "safe";
divStartSafeMode.appendChild(safeModeSpan);

const nonSafeModeSpan = document.createElement("span");
nonSafeModeSpan.style.color = "red";
nonSafeModeSpan.textContent = "non-safe";
divStartSafeMode.appendChild(nonSafeModeSpan);

divStartSafeMode.innerHTML += ` mode are illegal, but safe mode is safer since it minimizes the number of requests made to TW servers.<p></p>Using <span style="color: red">non-safe</span> mode is also safe but it makes some requests like fetching group IDs so that you don't have to put the ID manually.<br><br>`;

const divButtons = document.createElement("div");
const yesButton = document.createElement("button");
yesButton.id = 'UIIds.yesId';
yesButton.className = "btn";
yesButton.style.margin = "4px";
yesButton.style.width = "35px";
yesButton.textContent = "Yes";
divButtons.appendChild(yesButton);

const noButton = document.createElement("button");
noButton.id = 'UIIds.noId';
noButton.className = "btn";
noButton.style.margin = "4px";
noButton.style.width = "35px";
noButton.textContent = "No";
divButtons.appendChild(noButton);

divStartSafeMode.appendChild(divButtons);
popupContent.appendChild(divStartSafeMode);
popupContent.innerHTML += "<br>";

const h5ReadMe = document.createElement("h5");
h5ReadMe.style.color = "darkblue";
h5ReadMe.textContent = "Read me";
popupContent.appendChild(h5ReadMe);

const divReadMe = document.createElement("div");
divReadMe.innerHTML = `script made by <a href='./game.php?village=212&screen=info_player&id=2871948'>Im Kumin</a> is an automated farm script.<p></p>If you have any questions, feel free to join my Discord: <a style="color: -webkit-link" href="https://discord.gg/JpHMjH8QtB">Discord</a> (<- click here)<br>Invite doesn't work? Contact me in-game, <a href='./game.php?village=212&screen=info_player&id=2871948'>Im Kumin</a>.<p>`;
popupContent.appendChild(divReadMe);

const divChangeLog = document.createElement("div");
divChangeLog.id = 'UIIds.changeLogId';
divChangeLog.style.display = "none";

const h5ChangeLog = document.createElement("h5");
h5ChangeLog.textContent = "Change log";
divChangeLog.appendChild(h5ChangeLog);

const divChangeLogContent = document.createElement("div");
divChangeLogContent.innerHTML = 'changeLogHtml';
divChangeLog.appendChild(divChangeLogContent);

popupContent.appendChild(divChangeLog);

popupBox.appendChild(popupContent);
popupContainer.appendChild(popupBox);

const fader = document.createElement("div");
fader.className = "fader";
fader.id = "popup_fader";
fader.style.display = "none";

document.body.appendChild(popupContainer);
document.body.appendChild(fader);