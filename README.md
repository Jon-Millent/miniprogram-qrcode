
<p align="center">
  <img src="https://i.loli.net/2018/11/16/5beeba0e1bb08.png" width="400px" alt="未标题-2.png" title="未标题-2.png" />
</p>


<p align="center">
  
  <a>
    <img src="https://img.shields.io/npm/dt/miniprogram-qrcode.svg">
  </a>
  <a>
    <img src="https://img.shields.io/github/package-json/v/jon-millent/miniprogram-qrcode.svg">
  </a>
  <a>
    <img src="https://badges.frapsoft.com/os/mit/mit.svg?v=103">
  </a>
  <a>
    <img src="https://badges.frapsoft.com/os/v3/open-source.svg?v=103">
  </a>
  
</p>

<h1 align="center">
miniprogram-qrcode
</h1>

碉堡了的小程序码生成插件。

* 支持三种小程序码获取方式
* 自动缓存`access_token`，过期后自动重新生成

* 将小程序码合成到指定模板图片上功能已经迁移到 <a href="https://github.com/Jon-Millent/miniprogram-qrcode-image">miniprogram-qrcode-image</a>

> 正常情况下，批量生成`100`张需要`62.556秒`，平均每张需要`0.62556秒`，1万张大概需要 `1.73小时`。  <a href="https://github.com/Jon-Millent/miniprogram-qrcode/blob/master/test/render.js">批量示例代码</a>

## Install

```
yarn add miniprogram-qrcode
```
or
```
npm install miniprogram-qrcode --save
```


## Use

```js
let miniprogramQrcode = require('miniprogram-qrcode')

let qrocode = new miniprogramQrcode({
  appId: 'your appid',
  appSecret: 'your appSecret'
});
```

## API

* miniprogramQrcode
  * <a href="#getwxqrcodeinfo">getWxQrcodeInfo</a>


  
### getWxQrcodeInfo
二维码渲染器


#### `@params`  
miniprogramQrcode.getWxQrcodeInfo(`[@config: Object]`)  

* @config

```js
{
  mode: 'createWXAQRCode', // mode一共三种模式 [createWXAQRCode | getWXACode | getWXACodeUnlimit] 详细见示例
  config: {...}, //详细见示例
}
```

#### `@return`
返回状态码和图片buffer
```js
{
  code: 200, // 200： 成功，500：失败
  error: null, // 当出错的时候的错误信息
  image: [BufferArray] // 二维码buffer数组
}
```

#### `@example`

##### `createWXAQRCode` 模式
> 获取`小程序二维码`，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。
> <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/qr-code/createWXAQRCode.html">官方说明</a>

```js
let miniprogramQrcode = require('miniprogram-qrcode')
let qrocode = new miniprogramQrcode({...})

let info = await qrocode.getWxQrcodeInfo({
  mode: 'createWXAQRCode',
  config: {
    path: 'pages/index/main', // [String] 扫码进入的小程序页面路径，最大长度 128 字节，不能为空
    width: 400, // [Number] 二维码的宽度，默认 430px，最小 280px，最大 1280px
  },
})
```

##### `getWXACode` 模式
> 获取`小程序码`，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制。
> <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/qr-code/getWXACode.html">官方说明</a>

```js
let miniprogramQrcode = require('miniprogram-qrcode')
let qrocode = new miniprogramQrcode({...})

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

##### `getWXACodeUnlimit` 模式
> 获取`小程序码`，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。
> <a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/qr-code/getWXACodeUnlimit.html">官方说明</a>

```js
let miniprogramQrcode = require('miniprogram-qrcode')
let qrocode = new miniprogramQrcode({...})

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





## 关于调试

### 微信开发者工具
使用微信开发者工具可以进行模拟参数调试
![QQ截图20181117104623.png](https://i.loli.net/2018/11/17/5bef811c0a918.png)

## 参数模式

#### createWXAQRCode & getWXACode
这两种生成的参数，生成二维码数量有限，参数直接跟在path路径后面，例如：
```js
let info = await qrocode.getWxQrcodeInfo({
  mode: 'createWXAQRCode',
  config: {
    page: `pages/index/main?xxx=521314&i=xxx`
  },
})
```
扫一扫查看结果，注：这是线上版本(我留了一个彩蛋)可以用来模拟调试，长按`红色圈出区域两次`即可调出控制套模拟  

![output-createWXAQRCode.png](https://i.loli.net/2018/11/17/5bef82c0a2625.png)  

#### getWXACodeUnlimit
这个可以生成无限个，但是只能携带有局限性的参数`scene`，在这里推荐一种解析方式 `key:value-key:value`
```js
let info = await qrocode.getWxQrcodeInfo({
  mode: 'getWXACodeUnlimit',
  config: {
    page: `pages/index/main`,
    scene: 'x:123-g:666'
  },
})
```

![output-getWXACodeUnlimit.png](https://i.loli.net/2018/11/17/5bef85b9ac1b9.png)


解析示例
```js
onLoad (query) {
  // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
  this.scene = decodeURIComponent(query.scene)
  this.queryJson = JSON.stringify(query)

  // 尝试解析  scene 格式: shop:1-id:2

  try {
    let oneArr = this.scene.split('-')
    let twoJson = {}
    for(let i=0; i<oneArr.length; i++) {
      let target = oneArr[i].split(':')
      twoJson[target[0]] = target[1]
    }
    this.twoJson = JSON.stringify(twoJson)

  } catch(e) {
    this.twoJson = e
  }

},
```

在开发者工具中例如下面模拟
![QQ截图20181117104623.png](https://i.loli.net/2018/11/17/5bef811c0a918.png)


## 请我喝杯咖啡，支持更多开源
![1024.png](https://i.loli.net/2018/07/25/5b57cb91a44a1.png)
## LICENSE
<a href="http://opensource.org/licenses/MIT">MIT</a>

