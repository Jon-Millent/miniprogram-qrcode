
/*
*  miniSharp 处理图片，加水印
*  create on 2018年11月16日10:22:07 by jon-millent
* */

const sharp = require('sharp');

class miniSharp {

  constructor(templateUrl){
    this.templateUrl = templateUrl
  }

  async resizeQrcode(imageBuffer, config){
    return new Promise(resolve => {

      sharp(imageBuffer).resize(config.width, config.width).toBuffer().then(function(outputBuffer) {
        resolve(outputBuffer)
      });

    })
  }

  async concatImage(buffer, config){
    return new Promise(resolve => {
      sharp(this.templateUrl)
        .overlayWith(buffer, {
          top: config.top,
          left: config.left
        }).toBuffer().then(function(outputBuffer) {
          resolve(outputBuffer)
        });
    })
  }

  async renderImage(qrcodeBuffer, config){

    let resizeQrcodeBuffer = await this.resizeQrcode(qrcodeBuffer, config)
    let concatQrocdeBuffer = await this.concatImage(resizeQrcodeBuffer, config)

    return concatQrocdeBuffer
  }

}

module.exports = miniSharp