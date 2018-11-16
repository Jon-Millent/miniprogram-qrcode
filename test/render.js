

let fs = require('fs')

let miniprogramQrcode = require('miniprogram-qrcode')

let qrocode = new miniprogramQrcode.miniQrcode({
  appId: 'xxx',
  appSecret: 'xxx'
});


let mySharp = new miniprogramQrcode.miniSharp('./template.png');

(async function () {
	
	let start = new Date().getTime()

	for(var i=0; i<100; i++) {

		let info = await qrocode.getWxQrcodeInfo({
		  mode: 'getWXACode',
		  config: {
		    path: `pages/index/main?id=${i}`
		  },
		})

		let renderBuffer = await mySharp.renderImage(info.image, // 二维码图片的 buffer 数组 
		{ 
		  width: 200, // 重新设置二维码宽度
		  left: 362, // x轴偏移
		  top: 53 // y轴偏移
		})

		fs.writeFileSync(`./output${i}.png`, renderBuffer, 'utf8');
		console.log(`output${i}.png -- ok`)

	}

	let end = new Date().getTime() - start

	console.log(`done at ${end / 1000}s`)

})();
