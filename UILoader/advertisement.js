const addInfoAds = () =>{
	// Assuming you have a reference to the parent element (e.g., a <tbody> element) where you want to add this structure
	const parentElement = document.querySelector('tbody');

// Create a new table row (<tr>)
	const newRow = document.createElement('tr');

// Create a new table data cell (<td>) with text alignment
	const newTd = document.createElement('td');
	newTd.setAttribute('style', 'text-align:center;');

// Create a new <div> element with the class "info_box" and id "script_ads"
	const infoBoxDiv = document.createElement('div');
	infoBoxDiv.className = 'info_box';
	infoBoxDiv.id = 'script_ads';

// Create a new <div> element with the class "content" inside the "info_box"
	const contentDiv = document.createElement('div');
	contentDiv.className = 'content';

// Create a text node with the content you want inside the "content" div
	const textNode = document.createTextNode('Estás a ver publicidade por este script ser grátis.');

// Append the text node to the "content" div
	contentDiv.appendChild(textNode);

// Append the "content" div to the "info_box" div
	infoBoxDiv.appendChild(contentDiv);

// Append the "info_box" div to the table data cell
	newTd.appendChild(infoBoxDiv);

// Append the table data cell to the table row
	newRow.appendChild(newTd);

// Append the table row to the parent element (e.g., tbody)
	parentElement.appendChild(newRow);

}