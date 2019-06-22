// 计算经纬度
function GetDistance(lat1, lng1, lat2, lng2) {
  let radLat1 = (lat1 * Math.PI) / 180.0
  let radLat2 = (lat2 * Math.PI) / 180.0
  let a = radLat1 - radLat2
  let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    )
  s = s * 6378.137 // EARTH_RADIUS
  s = Math.round(s * 10000) / 10000
  return s
}

//日期转换
function format(time, format) {
  let t = new Date(time)
  let tf = function(i) {
    return (i < 10 ? "0" : "") + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
    switch (a) {
      case "yyyy":
        return tf(t.getFullYear())
        break
      case "MM":
        return tf(t.getMonth() + 1)
        break
      case "mm":
        return tf(t.getMinutes())
        break
      case "dd":
        return tf(t.getDate())
        break
      case "HH":
        return tf(t.getHours())
        break
      case "ss":
        return tf(t.getSeconds())
        break
    }
  })
}

//字段排序
function createComparison(propertyName) {
  return function(object1, object2) {
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
  type = type || "base64"
  let getMimeType = function(urlData) {
    let arr = urlData.split(",")
    let mime = arr[0].match(/:(.*?)/)[1]
    return mime
  }
  let newImage = new Image()
  let imgWidth, imgHeight

  let promise = new Promise(resolve => (newImage.onload = resolve))
  newImage.src = base64String
  return promise.then(() => {
    imgWidth = newImage.width
    imgHeight = newImage.height
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w
        canvas.height = (w * imgHeight) / imgWidth
      } else {
        canvas.height = w
        canvas.width = (w * imgWidth) / imgHeight
      }
    } else {
      canvas.width = imgWidth
      canvas.height = imgHeight
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height)
    if (type === "base64") {
      let base64 = canvas.toDataURL(getMimeType(base64String), quality)
      return base64
    } else {
      return canvas
    }
  })
}

// 数组随机抽取
function getRandomArrayElements(arr, count) {
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

// 计算时间为刚刚、几分钟前、几小时前、几天前
//dateTimeStamp是一个时间毫秒

function timeago(dateTimeStamp) {
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let week = day * 7
  let halfamonth = day * 15
  let month = day * 30
  let now = new Date().getTime()
  let diffValue = now - dateTimeStamp

  if (diffValue < 0) {
    return
  }

  let result

  let minC = diffValue / minute
  let hourC = diffValue / hour
  let dayC = diffValue / day
  let weekC = diffValue / week
  let monthC = diffValue / month
  if (monthC >= 1 && monthC <= 3) {
    result = " " + parseInt(monthC) + "月前"
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + parseInt(weekC) + "周前"
  } else if (dayC >= 1 && dayC <= 6) {
    result = " " + parseInt(dayC) + "天前"
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + parseInt(hourC) + "小时前"
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(minC) + "分钟前"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else {
    let datetime = new Date()
    datetime.setTime(dateTimeStamp)
    let Nyear = datetime.getFullYear()
    let Nmonth =
      datetime.getMonth() + 1 < 10
        ? "0" + (datetime.getMonth() + 1)
        : datetime.getMonth() + 1
    let Ndate =
      datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate()
    let Nhour =
      datetime.getHours() < 10
        ? "0" + datetime.getHours()
        : datetime.getHours()
    let Nminute =
      datetime.getMinutes() < 10
        ? "0" + datetime.getMinutes()
        : datetime.getMinutes()
    let Nsecond =
      datetime.getSeconds() < 10
        ? "0" + datetime.getSeconds()
        : datetime.getSeconds()
    result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result
}

// 视频时长
function formatTime(a) {
  let h = 0,
    i = 0,
    s = parseInt(a)
  if (s > 60) {
    i = parseInt(s / 60)
    s = parseInt(s % 60)
    if (i > 60) {
      h = parseInt(i / 60)
      i = parseInt(i % 60)
    }
  }
  // 补零
  let zero = function(v) {
    return v >> 0 < 10 ? "0" + v : v
  }
  let h2 = zero(h)
  let i2 = zero(i)
  let s2 = zero(s)
  let ok = ""
  if (h2 <= 0) {
    ok = [i2, s2].join(":")
  } else {
    ok = [h2, i2, s2].join(":")
  }
  return ok
}

// 过滤html标签
function checkHtml(htmlStr) {
  let reg = /<[^>]+>/g
  return reg.test(htmlStr)
}

//分组
function group(array, subGroupLength) {
  let index = 0
  let newArray = []

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)))
  }

  return newArray
}

//数组是否包含该字段
function contains(arr, obj) {
  let i = arr.length
  while (i--) {
    if (arr[i] === obj) {
      return true
    }
  }
  return false
}

//获取视频信息
async function videoParse(file) {
    let video = document.createElement("Audio")
    let url = URL.createObjectURL(file)
    video.onloadeddata = e => {
       return { duration: e.path[0].duration }
    }
    video.src = url
    video.onload()
}

// 数组去重
function arrayUnique(arr, name) {
  let hash = {}
  return arr.reduce(function (item, next) {
    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next)
    return item
  }, [])
}


// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  let secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)

      let hours = Math.floor(second / 3600)
      second = second - hours * 3600
      let mimute = Math.floor(second / 60)
      second = second - mimute * 60

      return  ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
      return '00:00'
  }
}

//将数组array分成长度为subGroupLength的小数组并返回新数组
function arrGroup(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while(index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
  }


//生成 minNum - maxNum 的随机数
function randomNum(minNum,maxNum){ 
  switch(arguments.length){ 
      case 1:
          return parseInt(Math.random()*minNum+1,10)
      break
      case 2:
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10)
      break
      default: 
          return 0
  } 
} 

//合并学校重复数组
function isRepeatArr(arr){
   let map = {}
   let dest = []
　　for(let i = 0; i < arr.length; i++){
　　　　let ai = arr[i]
　　　　if(!map[ai.school_id]){
　　　　　　dest.push({
            ...ai
　　　　　　})
　　　　　　map[ai.school_id] = ai
　　　　}else{
　　　　　　for(let j = 0; j < dest.length; j++){
              let dj = dest[j]
　　　　　　　　if(dj.school_id == ai.school_id){
  　　　　　　　   dj.role_id = dj.role_id > ai.role_id?dj.role_id:ai.role_id
  　　　　　　　　
                switch(dj.role_id){
                  case '3':
                    dj.duty = '学校群主,老师'
                    break
                  case '2':
                    dj.duty = '班级群主,老师'
                    break
                  case '1':
                    dj.duty = '管理员,老师'
                    break
                  case '0':
                      dj.duty = '老师'
                    break
                  }
                
                break
　　　　　　　　}

　　　　　　}
　　　　}
　　}

    return dest
}



export {
  GetDistance,
  format,
  createComparison,
  sum,
  compress,
  getRandomArrayElements,
  timeago,
  formatTime,
  checkHtml,
  group,
  contains,
  videoParse,  
  arrayUnique,
  realFormatSecond,
  randomNum,
  arrGroup,
  isRepeatArr,
}
