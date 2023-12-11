const addInfoAds=() => {
	const parentElement=document.querySelector('tbody');
	const newRow=document.createElement('tr');
	const newTd=document.createElement('td');
	newTd.setAttribute('style', 'text-align:center;');
	const infoBoxDiv=document.createElement('div');
	infoBoxDiv.className='info_box';
	infoBoxDiv.id='script_ads';
	const contentDiv=document.createElement('div');
	contentDiv.className='content';
	const textNode=document.createTextNode('Estás a ver publicidade por este script ser grátis.');
	contentDiv.appendChild(textNode);
	infoBoxDiv.appendChild(contentDiv);
	newTd.appendChild(infoBoxDiv);
	newRow.appendChild(newTd);
	parentElement.appendChild(newRow);
}