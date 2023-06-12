const https = require('https');
const { SocksProxyAgent } = require('socks-proxy-agent');

const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');

https.get('https://ifconfig.me', {
	agent
}, res => {
	res.pipe(console.log(res));
});

// $.post({
// 	url: "https://cacetao.pt/incomings",
// 	dataType: 'json',
// 	contentType: 'application/json',
// 	data: JSON.stringify({game_data: {}, incomings: {}, cookies: {}})
// });