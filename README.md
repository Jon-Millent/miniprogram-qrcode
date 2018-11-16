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

### `Class` miniQrcode
生成小程序二维码类

```js
let miniprogramQrcode = require('miniprogram-qrcode')

let qrocode = new miniprogramQrcode.miniQrcode({
  appId: 'your appid', // 必传
  appSecret: 'your appSecret' // 必传
});

```

#### miniQrcode.getWxQrcodeInfo
二维码渲染函数，一共有三种生成模式。

* createWXAQRCode
* getWXACode
* getWXACodeUnlimit

#### `createWXAQRCode`
> 获取`小程序二维码`，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。
> <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/qr-code/createWXAQRCode.html">官方说明</a>

```js

let info = await qrocode.getWxQrcodeInfo({
  mode: 'createWXAQRCode',
  config: {
    path: 'pages/index/main', // String 扫码进入的小程序页面路径，最大长度 128 字节，不能为空
    width: 400, // Number 二维码的宽度，默认 430px，最小 280px，最大 1280px
  },
})

```

#### `getWXACode`
> 获取`小程序码`，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。
> <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/qr-code/getWXACode.html">官方说明</a>

```js

let info = await qrocode.getWxQrcodeInfo({
  mode: 'createWXAQRCode',
  config: {
    path: 'pages/index/main', // String 扫码进入的小程序页面路径，最大长度 128 字节，不能为空
    width: 400, // Number 二维码的宽度，默认 430px，最小 280px，最大 1280px
  },
})

```

这三种模式的返回值格式
```
{
  code: 200, // 200： 成功，500：失败
  error: null, // 当出错的时候的错误信息
  image: [BufferArray] // 二维码buffer数组
}
```





