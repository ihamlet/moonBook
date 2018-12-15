// 计算经纬度
function GetDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0
  var radLat2 = lat2 * Math.PI / 180.0
  var a = radLat1 - radLat2
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137 // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000
  return s
}

//日期转换
function format(time, format) {
  var t = new Date(time)
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
        break
      case 'MM':
        return tf(t.getMonth() + 1)
        break
      case 'mm':
        return tf(t.getMinutes())
        break
      case 'dd':
        return tf(t.getDate())
        break
      case 'HH':
        return tf(t.getHours())
        break
      case 'ss':
        return tf(t.getSeconds())
        break
    }
  })
}

//字段排序
function createComparison(propertyName) {
  return function (object1, object2) {
    let value1 = parseFloat(object1[propertyName])
    let value2 = parseFloat(object2[propertyName])
    if (value1 < value2) {
      return 1
    } else if (value1 > value2) {
      return -1
    } else {
      return 0
    }
  }
}

//数组求和
function sum(arr) {
  return eval(arr.join("+"))
}

// 图片压缩
function compress(base64String, w, quality, type) {
  type = type || 'base64'
  var getMimeType = function (urlData) {
      var arr = urlData.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      return mime;
  }
  var newImage = new Image()
  var imgWidth, imgHeight

  var promise = new Promise(resolve => newImage.onload = resolve)
  newImage.src = base64String
  return promise.then(() => {
      imgWidth = newImage.width
      imgHeight = newImage.height
      var canvas = document.createElement("canvas")
      var ctx = canvas.getContext("2d")
      if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
              canvas.width = w
              canvas.height = w * imgHeight / imgWidth
          } else {
              canvas.height = w;
              canvas.width = w * imgWidth / imgHeight
          }
      } else {
          canvas.width = imgWidth
          canvas.height = imgHeight
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height)
      if(type === 'base64') {
        var base64 = canvas.toDataURL(getMimeType(base64String), quality)
        return base64  
      } else {        
        return canvas              
      }       
  })
}

// 数组随机抽取
function getRandomArrayElements(arr, count) {
  let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index
  while (i-- > min) {
  index = Math.floor((i + 1) * Math.random())
  temp = shuffled[index]
  shuffled[index] = shuffled[i]
  shuffled[i] = temp
  }
  return shuffled.slice(min)
}


// 排名
function rankArray(arr, key) {
  let currentRank = 0 // 当前排名
  let currentNum = 0 // 当前数量
  arr.sort((a, b) => a[key] > b[key] ? -1 : 1)
  arr.forEach( item => {
    if(currentNum != item[key]) {    
      ++currentRank
      currentNum = item[key]
    }
    item.rank = currentRank
  })
  return arr
}

//数组指定元素置顶
function arrayKeyTop(arr,key){
  arr.forEach((element,i) => {
    if(element[key]){
      arr.splice(i, 1)
      arr.unshift(element)
    }
  })  
  return arr
}

//支付
function createPayFrame(dom,levelId,feeId){
  let payFrame = dom.querySelector('#payFrame')
  if(!payFrame) {
      payFrame = document.createElement('iframe')
      payFrame.id = 'payFrame'
      dom.append(payFrame)
  }
  payFrame.src = `/book/memberCard/buycard?level_id=${levelId}&fee_id=${feeId}&is_auto=1`
}

//阅读打卡
function readPunchFrame(dom,childId,){
  let punchFrame = dom.querySelector('#pushFrame')
  if(!punchFrame) {
    punchFrame = document.createElement('iframe')
    punchFrame.id = 'payFrame'
    dom.append(punchFrame)
  }
  punchFrame.src = `/book/MemberSign/punch?child_id=${childId}&is_auto=1`
}

export {
  GetDistance,
  format,
  createComparison,
  arrayKeyTop,
  rankArray,
  sum,
  compress,
  getRandomArrayElements,
  createPayFrame,
  readPunchFrame
}
