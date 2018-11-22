const path = require('path')

let miniQrcode = require('../core/index')
const fs = require('fs')

let qrocode = new miniQrcode({
  appId: 'wxbd0737aaa75b002a',
  appSecret: 'e2b7d2588af69387e1377bf58d4d1ff3'
});


(async function () {

  let info = await qrocode.getWxQrcodeInfo({
    mode: 'createWXAQRCode',
    config: {
      path: 'pages/index/main'
    },
  })

  fs.writeFileSync(path.join(__dirname, '../output/output.png'), info.image, 'utf8');

})();