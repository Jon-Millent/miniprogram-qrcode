const path = require('path')

let miniQrcode = require('../core/index')
const fs = require('fs')
const path = require('path')

let qrocode = new miniQrcode({
  appId: '',
  appSecret: ''
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
