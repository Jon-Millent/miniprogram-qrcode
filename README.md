# miniprogram-qrcode

<img src="https://i.loli.net/2018/11/16/5beeba0e1bb08.png" width="400px" alt="未标题-2.png" title="未标题-2.png" />

碉堡了的小程序码生成插件。

* 支持三种小程序码获取方式
* 支持将小程序码合成到指定模板图片上
* 轻松写几行代码即可批量生成二维码
* 自动缓存`access_token`，过期后自动重新生成

> 正常情况下，批量生成`100`张需要`62.556秒`，平均每张需要`0.62556秒`，1万张大概需要 `1.73小时`。

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

## Api List
* <a href="#class-miniqrcode">miniQrcode</a>
  * <a href="#miniqrcodegetwxqrcodeinfo">getWxQrcodeInfo</a>
* <a href="#class-minisharp">miniSharp</a>
  * <a href="#minisharprenderimage">renderImage</a>
### `Class` miniQrcode
生成小程序二维码类

```js
let miniprogramQrcode = require('miniprogram-qrcode')

let qrocode = new miniprogramQrcode.miniQrcode({
  appId: 'your appid', // 必传
  appSecret: 'your appSecret' // 必传
});

```

### miniQrcode.getWxQrcodeInfo
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
    path: 'pages/index/main', // [String] 扫码进入的小程序页面路径，最大长度 128 字节，不能为空
    width: 400, // [Number] 二维码的宽度，默认 430px，最小 280px，最大 1280px
  },
})

```

#### `getWXACode`
> 获取`小程序码`，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。
> <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/qr-code/getWXACode.html">官方说明</a>

```js

let info = await qrocode.getWxQrcodeInfo({
  mode: 'getWXACode',
  config: {
    path: 'pages/index/main', // [String] 扫码进入的小程序页面路径，最大长度 128 字节，不能为空
    width: 400, // [Number] 二维码的宽度，默认 430px，最小 280px，最大 1280px
    auto_color: false, // [Boolean] 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
    line_color: {"r":"0","g":"0","b":"0"}, // [Object] auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示，默认全 0
    is_hyaline: false, // [Boolean] 是否需要透明底色，为 true 时，生成透明底色的小程序码，默认 false
  },
})

```

#### `getWXACodeUnlimit`
> 获取`小程序码`，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。
> <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/qr-code/getWXACodeUnlimit.html">官方说明</a>

```js

let info = await qrocode.getWxQrcodeInfo({
  mode: 'getWXACodeUnlimit',
  config: {
    scene: '', // [String] 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
    page: 'pages/index/main', // [String] 必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
    width: 400, // [Number] 二维码的宽度，默认 430px，最小 280px，最大 1280px
    auto_color: false, // [Boolean] 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
    line_color: {"r":"0","g":"0","b":"0"}, // [Object] auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示，默认全 0
    is_hyaline: false, // Boolean 是否需要透明底色，为 true 时，生成透明底色的小程序码，默认 false
  },
})

```

`返回值格式`
```js
{
  code: 200, // 200： 成功，500：失败
  error: null, // 当出错的时候的错误信息
  image: [BufferArray] // 二维码buffer数组
}
```



### `Class` miniSharp
把二维码或者小程序码加工拼在指定的模板图片上。

```js
const path = require('path')
const path = require('miniprogram-qrcode')

let mySharp = new miniprogramQrcode.miniSharp(path.join(__dirname, '../template.png')); // 传入指定的模板图片 如下图。

```

![template.png](https://i.loli.net/2018/11/16/5bee70edc46da.png)

### miniSharp.renderImage

```js
let renderBuffer = await mySharp.renderImage(info.image, // 二维码图片的 buffer 数组 
{ 
  width: 200, // 重新设置二维码宽度
  left: 54, // x轴偏移
  top: 217 // y轴偏移
})

// 返回渲染好的buffer数组
```

`渲染效果`

![output.png](https://i.loli.net/2018/11/16/5bee716374ba7.png)
