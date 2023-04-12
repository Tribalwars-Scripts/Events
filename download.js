const args=process.argv;
console.log(args);


const http=require('https'); // or 'https' for https:// URLs
const fs=require('fs');
const URL=args[2]

const filename=URL.split('/').pop();


const file=fs.createWriteStream(filename);
const request=http.get(URL, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
        file.close();
        console.log("Download Completed");
    });
});