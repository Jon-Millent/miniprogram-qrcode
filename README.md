# miniprogram-qrcode
碉堡了的生成小程序码辅助工具。

* 支持三种小程序码获取方式
* 支持将小程序码合成到指定模板图片上

## 安装

```
npm install miniprogram-qrcode --save
```

## 使用


### miniQrcode
miniQrcode是用来生成二维码的，使用实例：

```js
let miniprogramQrcode = require('miniprogram-qrcode')

let qrocode = new miniprogramQrcode.miniQrcode({
  appId: 'your appid',
  appSecret: 'your appSecret'
});

let info = await qrocode.getWxQrcodeInfo({
  mode: 'createWXAQRCode',
  config: {
    path: 'pages/index/main'
  },
})

```
