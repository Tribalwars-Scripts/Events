
let DEF_DELAY = 1000;
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}
function getMilliseconds(hrs, min, sec) {
	return ((hrs * 60 * 60 + min * 60 + sec) * 1000);
}
let request_number = 0;
let more = true;
let offset =0;
let allvillages = [];


function sendAttack(){
	$("#unit_input_axe").val(1);
	$("#target_attack").click();
}

async function confirmAttack(){
	$("#troop_confirm_submit").click();
	await sleep(666);
}

const selTarget = async (village_id) => {
	TWMap.actionHandlers.command.click(village_id);
	await sleep(333);
		if (document.getElementById("popup_box_popup_command") != null) {
			await sendAttack();
			await confirmAttack();
		}

}

const handleTargets = async(villages_array = []) =>{
	for (let i = 0; i< villages_array[0].length; i++){
		console.dir(villages_array[0])
		let coord = villages_array[0][i].x + "|" + villages_array[0][i].y
		allvillages.push(coord);
	}
}
async function thisme(){
while(more){

	const namePage = 'api';
	const createLink = {
		ajax : 'target_selection',
		input: 'emporium',
		type: 'village_name',
		request_id: request_number,
		limit: 10,
		offset: offset
	}
	const data = {}
	let serverResponse = {};
	TribalWars.post(namePage,createLink,data, function (e){
		serverResponse = e;
	})
	await sleep(1e4);
	handleTargets(Array(serverResponse.villages));
	more = serverResponse.more;
	request_number++;
	offset = serverResponse.offset + 10;
}
console.dir(allvillages);
}