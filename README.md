
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
* 支持将小程序码合成到指定模板图片上
* 轻松写几行代码即可批量生成二维码
* 自动缓存`access_token`，过期后自动重新生成

> 正常情况下，批量生成`100`张需要`62.556秒`，平均每张需要`0.62556秒`，1万张大概需要 `1.73小时`。  <a href="https://github.com/Jon-Millent/miniprogram-qrcode/blob/master/test/render.js">批量示例代码</a>

## 安装

```
npm install miniprogram-qrcode --save
```
#### windows
windows依赖于`libvips`，由于安装时候下载该库较慢，请参考下面方法安装
* 进入 `npm-cache` 目录，一般`npm-cache`位于 (输入 `npm root -g`) 的同级目录
* 下载 https://share.weiyun.com/5ZIyyAH 复制到 `/npm-cache/_libvips/` 下
* `npm install miniprogram-qrcode --save`

#### linux
> 在 linux 下安装的时候会可能会报`libvips`相关的错误，因为`sharp`库依赖于`libvips`，首先安装`libvips`
```
wget https://github.com/libvips/libvips/releases/download/v8.7.1/vips-8.7.1.tar.gz
tar xf vips-8.7.1.tar.gz
cd vips-8.7.1
./configure
make
sudo make install
sudo ldconfig
```

然后

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

## 关于调试

## 微信开发者工具
使用微信开发者工具可以进行模拟参数调试
![QQ截图20181117104623.png](https://i.loli.net/2018/11/17/5bef811c0a918.png)


## 测试接口

这里我提供了一个测试接口，可以带参数生成线上的小程序码，用来调试

`[get]` `http://wx.toolos.cc`
参数

* `mode` 必传 [createWXAQRCode | getWXACode | getWXACodeUnlimit] 之一    

注意  

* 其他参数对应上面的文档的`mode`对应的参数，`path` 或者 `page` 需要 `encodeURIComponent` 一下  
* 目前小程序只有一个路径 `pages/index/main`    
* 线上服务器配置低

示例  

```
http://wx.toolos.cc/?mode=createWXAQRCode&path=pages%2Findex%2Fmain
```

## 参数模式

#### createWXAQRCode & getWXACode
这两种生成的参数，生成二维码数量有限，参数直接跟在path路径后面，例如：
```js
let info = await qrocode.getWxQrcodeInfo({
  mode: 'createWXAQRCode',
  config: {
    page: `pages/index/main?sgr=521314&i=loveyou`
  },
})
```
扫一扫查看结果，注：这是线上版本(我留了一个彩蛋)可以用来模拟调试，长按`红色圈出区域两次`即可调出控制套模拟  

![output-createWXAQRCode.png](https://i.loli.net/2018/11/17/5bef82c0a2625.png)  

![Screenshot_2018-11-17-10-55-13-286_com.tencent.mm.png](https://i.loli.net/2018/11/17/5bef84594b377.png)

#### getWXACodeUnlimit
这个可以生成无限个，但是只能携带有局限性的参数`scene`，在这里推荐一种解析方式 `key:value-key:value`
```js
let info = await qrocode.getWxQrcodeInfo({
  mode: 'getWXACodeUnlimit',
  config: {
    page: `pages/index/main`,
    scene: 'i:loveyou-sgr:521314'
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

