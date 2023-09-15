
let changeLog = await fetch('https://raw.githubusercontent.com/Tribalwars-Scripts/Events/main/version.json')
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		// Handle the JSON data here
		return data;
	})
	.catch(error => {
		// Handle any errors that occurred during the fetch
		console.error('Fetch error:', error);
	});
