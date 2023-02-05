// nodal
$('#reg_btn, #login_btn').on('click', () => {
  $('body,#navbar').css({
    overflow: 'auto',
    'padding-right': 0
  })
})

// section 生物種族
$('#race a').on('click', function () {
  $('#race a').removeClass('active')
  $(this).addClass('active')
})

// -swiper
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 1000,
  spaceBetween: 15,
  centeredSlides: true,
  autoplay: {
    delay: 5000
  },
  effect: 'coverflow',
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },

  breakpoints: {
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    920: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 4
    }
  },

  pagination: {
    el: '.swiper-pagination'
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})

// magnific
$(document).ready(function () {
  $('.image-popup-no-margins').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  })
})

// -gsap 註冊plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText)

// -ScrollTrigger 滾動軸
// 導覽列滾動收合
gsap.from('#navbar', {
  yPercent: -100,
  paused: false,
  duration: 0.5,
  scrollTrigger: {
    start: 'top 60',
    end: () => '+=' + document.documentElement.scrollHeight, // end 為整份文件高度
    onEnter(self) {
      self.animation.play()
    },
    onUpdate(self) {
      // self.direction -1 => 偵測到捲動軸往上
      // self.direction 1 => 偵測到捲動軸往下
      self.direction === -1 ? self.animation.play() : self.animation.reverse()
    },
    markers: false
  }
})

// backtop 回頂端顯示隱藏
gsap.to('.backtop', {
  scrollTrigger: {
    trigger: '#footer',
    start: 'top bottom',
    end: '100% bottom',
    toggleActions: 'play none none reverse'
    // markers: true
  },
  display: 'block',
  opacity: 1,
  duration: 1
})
// -點擊之後會抓到 active 的位置
$('.main-link').each(function (index, link) {
  let idName = $(link).attr('href')
  // 會抓到每個 #section01-05
  gsap.to(link, {
    scrollTrigger: {
      trigger: `${idName}`,
      start: 'top center',
      end: 'bottom center',
      toggleClass: {
        targets: link,
        className: 'active'
      },
      markers: true
    }
  })
})

// 流星
// 1.創建流星數目
function createStar(starNumber) {
  for (let i = 0; i < starNumber; i++) {
    $('.shooting_star').append('<div class="star"></div>')
  }
  const stars = gsap.utils.toArray('.star')
  return stars
}

// 2.設定流星補間動畫預設值
function setStarTween(stars) {
  gsap.set('.shooting_star', {
    perspective: 800
  })
  stars.forEach(function (star, index) {
    gsap.set(star, {
      transformOrigin: '0 50%',
      position: 'absolute',
      left: gsap.utils.random($(window).width() / 2, $(window).width() * 2),
      top: gsap.utils.random(-100, -200),
      rotation: -20
    })
  })
  return stars
}

// 3.播放流星動畫
function playStarTimeline(stars) {
  const tl = gsap.timeline({
    repeat: -1
  })

  tl.to(stars, {
    x: `-=${$(window).width() * 1.5}`, // 流星往左
    y: `+=${$(window).height() * 1.5}`, // 流星往下
    z: `random(-100,500)`,
    stagger: function (index, star, stars) {
      return gsap.utils.random(index + 5, (index + 5) * 2, 1)
    },
    duration: 'random(0.5, 3, 0.1)',
    ease: 'none'
  })
}

// 執行管道流程，按造設定的步驟去走流程
const playStar = gsap.utils.pipe(createStar, setStarTween, playStarTimeline)
playStar(30)

// 視差效果 ---------------------------------------------------------------------------------
// 星空背景
gsap.to('body', {
  scrollTrigger: {
    trigger: 'body',
    start: 'top 0',
    end: 'bottom 0',
    scrub: 5
    // markers: true
  },
  backgroundPosition: '50% 100%',
  ease: 'none'
})

// 浮空的島
const float_tl = gsap.timeline({
  scrollTrigger: {
    trigger: 'body',
    start: 'top 100%',
    end: 'bottom 100%',
    scrub: 5
    // markers: true
  },
  ease: 'none'
})

// 1. 使用 timeline 操作進場位置
float_tl
  .from('.float-wrap-01', {
    left: '-30%'
  })
  .from(
    '.float-wrap-02',
    {
      right: '-30%'
    },
    '<'
  )
  .from(
    '.float-wrap-03',
    {
      bottom: '-100%'
    },
    '<'
  )

// 2. 自身上下浮動的動畫
$('.float-island').each(function (index, island) {
  gsap.to(island, {
    y: 50 * (index + 1),
    duration: 10 * (index + 1),
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
})

// 霧
$('.fog').each(function (index, fog) {
  // gsap.set() 設定 druation 為 0 的 fog 補間動畫，為它們設定 CSS 屬性
  gsap.set(fog, {
    width: '100%',
    height: '100%',
    background: `url(./images/fog.png) no-repeat center/80%`,
    opacity: 0.8,
    position: 'absolute',
    top: 'random(0,100)' + '%',
    x: function () {
      return index % 2 == 0 ? -$(window).width() : $(window).width()
    }
  })

  // 做動畫
  gsap.to(fog, {
    x: function () {
      return index % 2 == 0 ? $(window).width() : -$(window).width()
    },
    repeat: -1,
    duration: 60,
    ease: 'none',
    onRepeat() {
      $(fog).css({
        top: gsap.utils.random(0, 100) + '%'
      })
    }
  })
})

// SplitText --------------------------------------------------------------------------------------------
gsap.set('#splitText', {
  perspective: 400
})

const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 8
})

// 將段落轉成陣列
const paragraphs = gsap.utils.toArray('#splitText p')
const splitTexts = paragraphs.map(function (p) {
  return new SplitText(p, {
    charsClass: 'charBg'
  })
})
console.log(splitTexts)

splitTexts.forEach(splitText => {
  const chars = splitText.chars
  tl.from(
    chars,
    {
      y: 80,
      rotationX: 0,
      rotationY: 180,
      scale: 2,
      transformOrigin: '0% 50% -100',
      opacity: 0,
      duration: 2,
      ease: 'back',
      stagger: 0.1,
      onComplete() {
        gsap.to(chars, {
          delay: 3,
          duration: 2,
          opacity: 0,
          y: 80,
          scale: 2,
          rotationX: 180,
          rotationY: 0,
          transformOrigin: '0% 50% -100',
          ease: 'back',
          stagger: 0.1
        })
      }
    },
    '+=3'
  )
})
