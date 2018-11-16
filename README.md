# miniprogram-qrcode
碉堡了的生成小程序码辅助工具。

* 支持三种小程序码获取方式
* 支持将小程序码合成到指定模板图片上

## 安装

```
npm install miniprogram-qrcode --save
```

## 使用

```js
let miniprogramQrcode = require('miniprogram-qrcode')

let qrocode = new miniprogramQrcode.miniQrcode({
  appId: 'your appid',
  appSecret: 'your appSecret'
});

```
