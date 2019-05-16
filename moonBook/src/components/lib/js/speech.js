const placeholder = [
    '说一点什么吧，他都能听得到',
    '随心而起，有感而发',
    '千头万绪,落笔汇成评论一句',
    '听说，爱评论的人粉丝多',
    '从小陪伴孩子读绘本，日积月累',
    '陪伴就是给孩子最好的爱',
    '愿你像颗种子，勇敢地冲破泥沙',
    '心似海，不敌诗的咏叹'
  ]

const commentTag = [
    '👍 棒棒哒',
    '🙆 声音很棒',
    '💪 加油哦',
    '👪 很温馨',
    '👏 非常棒',
    '😊 很可爱哦',
    '👑 继续努力',
    '😄 向你学习',
    '🌞 积少成多',
    '📚 推荐这本书',
    '🏆 很精彩'
  ]

  const childCommentTag = [
    '再接再厉',
    '向你学习',
    '坚持下去',
    '太厉害了',
    '难能可贵'
  ]

const saying = [
  '聪明在于勤奋，天才在于积累',
  '腹有诗书气自华，读书万卷始通神',
  '少成若天性，习惯如自然',
  '锲而不舍，金石可镂',
  '敏而好学，不耻下问',
  '读书之法，在循序渐进，熟读而精思'
]

const medalPunch = [{
  name:'好的开始',
  number: 1,
  type:'punch'
},{
  name:'小试牛刀',
  number: 21,
  type:'punch'
},{
  name:'坚持不懈',
  number: 50,
  type:'punch'
},{
  name:'渐入佳境',
  number: 100,
  type:'punch'
},{
  name:'扬帆远航',
  number: 198,
  type:'punch'
},{
  name:'持之以恒',
  number: 365,
  type:'punch'
},{
  name:'学富五车',
  number: 660,
  type:'punch'
},{
  name:'阅读之星',
  number: 1000,
  type:'punch'
}]


const medalRead = [{
  name:'好的开始',
  number: 1,
  type:'read'
},{
  name:'小试牛刀',
  number: 20,
  type:'read'
},{
  name:'坚持不懈',
  number: 60,
  type:'read'
},{
  name:'渐入佳境',
  number: 120,
  type:'read'
},{
  name:'扬帆远航',
  number: 300,
  type:'read'
},{
  name:'持之以恒',
  number: 700,
  type:'read'
},{
  name:'学富五车',
  number: 1000,
  type:'read'
},{
  name:'阅亮之星',
  number: 1500,
  type:'read'
}]


//阅读等级
function punchLevel(num) {
  let arr = []
  medalPunch.forEach((e,i) =>{
    if( num >= e.number ){
      arr.push({
        ...e,
        level: i+1
      })
    }

    if(num == 0){
      arr.push({
        ...e,
        level:0
      })
    }
  })

  return arr
}

function readLevel(num) {
  let arr = []
  medalRead.forEach((e,i) =>{
    if( num >= e.number ){
      arr.push({
        ...e,
        level: i+1
      })
    }

    if(num == 0){
      arr.push({
        ...e,
        level:0
      })
    }
  })

  return arr
}

export {
  placeholder,
  commentTag,
  saying,
  medalPunch,
  medalRead,
  punchLevel,
  readLevel,
  childCommentTag
}