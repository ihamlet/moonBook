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

const saying = [
  '聪明在于勤奋，天才在于积累',
  '腹有诗书气自华，读书万卷始通神',
  '少成若天性，习惯如自然',
  '锲而不舍，金石可镂',
  '敏而好学，不耻下问',
  '读书之法，在循序渐进，熟读而精思'
]

const medal = [{
  name:'好的开始',
  day: 1
},{
  name:'小试牛刀',
  day: 21
},{
  name:'坚持不懈',
  day: 50
},{
  name:'渐入佳境',
  day: 100
},{
  name:'扬帆远航',
  day: 150
},{
  name:'持之以恒',
  day: 200
},{
  name:'学富五车',
  day: 250
},{
  name:'阅读之星',
  day: 300
}]


//阅读等级
function medalLevel(num) {
  let arr = []
  medal.forEach((e,i) =>{
    if( num >= e.day ){
      arr.push({
        ...e,
        level: i+1
      })
    }
  })

  return arr
}

export {
  placeholder,
  commentTag,
  saying,
  medal,
  medalLevel
}