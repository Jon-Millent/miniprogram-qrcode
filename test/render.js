

let fs = require('fs')

let miniprogramQrcode = require('miniprogram-qrcode')

let qrocode = new miniprogramQrcode({
  appId: 'xxx',
  appSecret: 'xxx'
});



(async function () {
	
	let start = new Date().getTime()

	for(var i=0; i<100; i++) {

		let info = await qrocode.getWxQrcodeInfo({
		  mode: 'getWXACode',
		  config: {
		    path: `pages/index/main?id=${i}`
		  },
		})

		fs.writeFileSync(`./output${i}.png`, info.image, 'utf8');
		console.log(`output${i}.png -- ok`)

	}

	let end = new Date().getTime() - start

	console.log(`done at ${end / 1000}s`)

})();
