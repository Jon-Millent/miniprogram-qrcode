const path = require('path')

let miniprogramQrcode = require('../core/index')
const fs = require('fs')

let qrocode = new miniprogramQrcode.miniQrcode({
  appId: '',
  appSecret: ''
});

let mySharp = new miniprogramQrcode.miniSharp(path.join(__dirname, '../template.png'));

(async function () {

  let info = await qrocode.getWxQrcodeInfo({
    mode: 'getWXACode',
    config: {
      path: 'pages/index/main'
    },
  })

  let renderBuffer = await mySharp.renderImage(info.image, {
    width: 200,
    left: 54,
    top: 217
  })

  fs.writeFileSync(path.join(__dirname, '../output/output.png'), renderBuffer, 'utf8');

})();