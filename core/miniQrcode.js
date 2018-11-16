
/*
*  miniQrcode 根据参数获取图片
*  create on 2018年11月16日10:12:15 by jon-millent
* */

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const request = require('request')
let AngerWechat = require('anger-wechat')




class miniQrcode {

  /*
    @ config
      {
        appId,
        appSecret
      }
  */
  constructor(config) {
    this.databasePath = path.join(__dirname, '../', 'database.json')
    this.mode = {
      'getWXACode': 'https://api.weixin.qq.com/wxa/getwxacode',
      'getWXACodeUnlimit': 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
      'createWXAQRCode': 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode',
    }

    this.config = config

    this.$wx = new AngerWechat({
      appId: this.config.appId, // appId 必传
      appSecret: this.config.appSecret, // appSecret 必传
    })
  }

  readFile(path){
    return fs.readFileSync(path, 'utf8');
  }

  writeFile(path, str){
    fs.writeFileSync(path, str, 'utf8');
  }

  setDatabase(json) {
    this.writeFile(this.databasePath, JSON.stringify(json))
  }

  getApiUrl(access_token, mode){
    return this.mode[mode] + '?access_token=' + access_token
  }

  getDatabase(){
    let jsonStr = this.readFile(this.databasePath)
    return JSON.parse(jsonStr)
  }

  async postMan(url, json){

    return new Promise(resolve => {

      var requestSettings = {
        method: 'POST',
        url: url,
        encoding: null,
        body: JSON.stringify(json)
      };

      request(requestSettings, function(error, response, body) {

        if(error) {
          resolve({
            code: 500,
            err: error,
            data: null
          })
        } else {
          resolve({
            code: 200,
            err: null,
            data: body,
            type: response.headers['content-type']
          })
        }


      })

    })

  }


  async getWxQrcodeInfo(concatConfig){

    let innerDatabase = this.getDatabase()

    // 如果本地的数据没有access_token 或者超过2个小时 就去请求获取
    if(!innerDatabase.access_token ||  ((new Date().getTime() - innerDatabase.create_time) > 7200000) ) {

      let accessInfo = await this.$wx.getGlobalAccessToken()

      if(accessInfo.code === 200) {

        // 写入文件
        innerDatabase = {
          access_token: accessInfo.data.access_token,
          create_time: new Date().getTime()
        }

        this.setDatabase(innerDatabase)

      } else {
        throw new Error(`获取access_token失败，错误信息：${accessInfo.msg}`)
        return
      }

    }

    // 获取到access_token去请求接口
    let qrcodeInfo  = await this.postMan(this.getApiUrl(innerDatabase.access_token, concatConfig.mode), concatConfig.config)

    let returnData = {

    }

    if(qrcodeInfo.type.indexOf('image') !== -1) {
      // 请求成功 保存图片
      returnData = {
        code: 200,
        image: qrcodeInfo.data,
        error: null
      }
    } else {
      returnData = {
        code: 500,
        error: JSON.stringify(qrcodeInfo.data.toString()),
        image: null
      }
    }

    return returnData
  }
}


module.exports = miniQrcode