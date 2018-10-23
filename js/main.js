let $images = $('#images')
let $buttons = $('.btnList>.btn')
let $btnList = $('.btnList')
let $imgList = $images.children('img')
let current = 0
let $arrow = $('.arrow')
let $left = $('.left')
let $right = $('.right')
let flag = false


/////第三版轮播，第一步制造假的图片，第二步图层移动，第三步绑定事件
makeFakeSlides()
bindEvents()

$left.on('click', function () {
 animated('left')
})

$right.on('click', function () {
  animated('right')
})

//自动轮播
let timer = setInterval(() => {
  goToSlide(current + 1)
}, 2000)

//移入显示移除消失
$('.container').on('mouseenter', () => {
  clearInterval(timer)
  $('.arrow')[0].style.display = 'flex'
}).on('mouseleave', () => {
  $('.arrow')[0].style.display = 'none'
  timer = setInterval(() => {
    goToSlide(current + 1)
  }, 2000)
})

//监听浏览器是否是当前页面，不是暂停操作
document.addEventListener('visibilitychange', function (e) {
  if (document.hidden) {
    window.clearInterval(timer)
  } else {
    timer = setInterval(() => {
      goToSlide(current + 1)
    }, 2000)
  }
})

///////

function animated(direction) {
  if (direction === 'right' && !flag) {
    flag = true
    goToSlide(current + 1)
  } else if (direction === 'left' && !flag) {
    flag = true
    goToSlide(current - 1)
  }
  $images.one('transitionend', function () {
    flag = false
  })
}

function changeColor(index) {
  $buttons.eq(index).addClass('active').siblings().removeClass('active')
}


function bindEvents() {
  $btnList.on('click', '.btn', function (e) {
    let $button = $(e.currentTarget)
    let index = $button.index()
    if (!flag) {
      goToSlide(index)
    }
  })
}


function goToSlide(index) {

  if (index > $buttons.length - 1) {
    index = 0
  } else if (index < 0) {
    index = $buttons.length - 1
  }
  console.log('current,index')
  console.log(current, index)
  changeColor(index)
  if (current === $buttons.length - 1 && index === 0) {
    console.log(1)
    //最后一张到第一张
    $images.css({
        transform: `translateX(${-($buttons.length+1)*300}px)`
      })
      .one('transitionend', function () {
        $images.hide().offset()
        $images.css({
          transform: `translateX(${-300}px)`
        }).show()
      })
  } else if (current === 0 && index === $buttons.length - 1) {
    //最后一张到第一张
    console.log(2)
    $images.css({
        transform: 'translateX(0px)'
      })
      .one('transitionend', function () {
        $images.hide().offset()
        $images.css({
          transform: `translateX(${-$buttons.length*300}px)`
        }).show()
      })
  } else {
    console.log(3)
    $images.css({
      transform: `translateX(${-(index+1)*300}px)`
    })
  }
  current = index //index 跳转的下标 current当前下标
}


function makeFakeSlides() {
  var firstImg = $imgList.eq(0).clone(true)
  var lastImg = $imgList.eq($imgList.length - 1).clone(true)
  $images.append(firstImg)
  $images.prepend(lastImg)
}