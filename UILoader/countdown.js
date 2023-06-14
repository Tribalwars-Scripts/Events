

(async () =>{
	const inProgress=(scriptLive) => {
		let unixTimestamp;

		if (scriptLive){
			unixTimestamp = getLocalStorage(StorageIds.globalData).time2;
		}else{
			// Get current time in Unix timestamp format
			const currentTime=Math.floor(Date.now() / 1000); // Divide by 1000 to convert milliseconds to seconds

// Create a new Date object for the current date
			const currentDate=new Date();

// Set the time to 23:59 for the current date
			currentDate.setHours(23, 59, 59, 999); // Set hours to 23, minutes to 59, seconds and milliseconds to 0

			// Get the Unix timestamp in seconds by dividing the time value by 1000 to convert from milliseconds to seconds, and then rounding down
			unixTimestamp=Math.floor(currentDate.getTime() / 1000);
		}

// Function to update the countdown timer
		function updateCountdown() {
			// Get the current timestamp in seconds
			const now=Math.floor(Date.now() / 1000);

			// Calculate the time remaining in seconds
			const timeRemaining=unixTimestamp - now;

			// Check if time has run out
			if (timeRemaining < 0) {
				clearInterval(countdownInterval);
				document.getElementById("countdown").textContent="Script Will be live a few moments.";
				return;
			}

			// Convert the time remaining to hours, minutes, and seconds
			const hours=Math.floor(timeRemaining / 3600);
			const minutes=Math.floor((timeRemaining % 3600) / 60);
			const seconds=timeRemaining % 60;

			// Update the countdown text
			document.getElementById("countdown").textContent=`Script will be released in: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
		}

// Call the updateCountdown function every 1 second
		const countdownInterval=setInterval(updateCountdown, 1000);

	}

	inProgress(globalData.released)
})()