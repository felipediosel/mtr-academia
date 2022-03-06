var MtrScroll = new function () {

  this.suave = (oElement, oEvent) => {
    let targetOffset = $($(oElement).attr('href')).offset();

    if (targetOffset) {
      oEvent.preventDefault();

      $('html, body').animate({
        scrollTop: targetOffset.top - 32
      }, 500);
    }
  };

  this.stickyNav = (oWindow, oElement) => {
    oElement.toggleClass('mtr-nav-sticky', oWindow.scrollY > 0);
  };

  this.sticky = (oWindow, oElement) => {
    if (oWindow.scrollY > 0) {
      oElement.css('padding', '8px 16px 8px 16px');
    }

    if (oWindow.scrollY == 0) {
      oElement.css('padding', '16px');
    }
  };

  this.stickyLogo = (oWindow, oElement) => {
    oElement.toggleClass('mtr-logo-min', oWindow.scrollY > 0);
  }

  this.stickyIcon = (oWindow, oElement) => {
    oElement.toggleClass('bx-sm', oWindow.scrollY > 0);
    oElement.toggleClass('bx-md', oWindow.scrollY == 0);
  }
};

var MtrSidebar = new function () {

  let mtrNavbar = $('#mtrNavbar');
  let mtrSidebar = $('#mtrSidebar');
  let mtrOverlay = $('#mtrOverlay');

  this.open = () => {
    if (mtrSidebar.get('display') === 'flex') {
      mtrSidebar.css('display', 'none');
      mtrOverlay.css('display', 'none');
      mtrNavbar.css('display', 'flex');
    }
    else {
      mtrSidebar.css('display', 'block');
      mtrOverlay.css('display', 'block');
      mtrNavbar.css('display', 'none');
    }
  };

  this.close = () => {
    mtrSidebar.css('display', 'none');
    mtrOverlay.css('display', 'none');
    mtrNavbar.css('display', 'flex');

  };
};

var MtrLoader = new function () {

  this.fade = () => {
    setTimeout(function () {
      $('.mtr-loader').fadeOut(500);
      $('.mtr-content').fadeIn(0);
    }, 10);
  };
};

var MtrSwiper = new function () {

  this.coverflow = (className) => {
    new Swiper(className, {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      loop: false,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    });
  };

  this.responsive = (className, slidesPerViewMax) => {
    new Swiper(className, {
      grabCursor: true,
      slidesPerView: 1,
      navigation: {
        nextEl: className+"-next",
        prevEl: className+"-prev",
      },
      breakpoints: {
        512: { //50%
          slidesPerView: Math.round(slidesPerViewMax * 0.50)
        },
        768: { //75%
          slidesPerView: Math.round(slidesPerViewMax * 0.75)
        },
        1024: { //100%
          slidesPerView: slidesPerViewMax
        },
      },
    });
  };
};

function setupTypewriter(t) {
  var HTML = t.innerHTML;

  t.innerHTML = "";

  var cursorPosition = 0,
    tag = "",
    writingTag = false,
    tagOpen = false,
    typeSpeed = 50,
    tempTypeSpeed = 0;

  var type = function () {

    t.style.display = 'block';

    if (writingTag === true) {
      tag += HTML[cursorPosition];
    }

    if (HTML[cursorPosition] === "<") {
      tempTypeSpeed = 0;
      if (tagOpen) {
        tagOpen = false;
        writingTag = true;
      } else {
        tag = "";
        tagOpen = true;
        writingTag = true;
        tag += HTML[cursorPosition];
      }
    }
    if (!writingTag && tagOpen) {
      tag.innerHTML += HTML[cursorPosition];
    }
    if (!writingTag && !tagOpen) {
      if (HTML[cursorPosition] === " ") {
        tempTypeSpeed = 0;
      }
      else {
        tempTypeSpeed = (Math.random() * typeSpeed) + 50;
      }
      t.innerHTML += HTML[cursorPosition];
    }
    if (writingTag === true && HTML[cursorPosition] === ">") {
      tempTypeSpeed = (Math.random() * typeSpeed) + 50;
      writingTag = false;
      if (tagOpen) {
        var newSpan = document.createElement("span");
        t.appendChild(newSpan);
        newSpan.innerHTML = tag;
        tag = newSpan.firstChild;
      }
    }

    cursorPosition += 1;
    if (cursorPosition < HTML.length - 1) {
      setTimeout(type, tempTypeSpeed);
    }

  };

  return {
    type: type
  };
}

$('a').click(
  function (oEvent) {
    MtrScroll.suave(this, oEvent);
  }
);

var hulkfalou = false;

$(window).scroll(
  function (oEvent) {
    let targetOffset = $('.mtr-balao').offset();

    if (targetOffset) {
      oEvent.preventDefault();

      if (!hulkfalou && this.pageYOffset >= (targetOffset.top - window.screen.height)) {
        setupTypewriter(document.getElementById('typewriter')).type();
        hulkfalou = true;
      }
    }

    MtrScroll.stickyNav(this, $('#mtrNavbar'));
    MtrScroll.stickyLogo(this, $('#mtrImgLogo'));
    MtrScroll.stickyIcon(this, $('#mtrIconMenu'));
    MtrScroll.sticky(this, $('#mtrLogo'));
    MtrScroll.sticky(this, $('#mtrSocial'));
    MtrScroll.sticky(this, $('#mtrMenu'));
  }
);

$(window).on('load', function () {
  MtrLoader.fade();
  MtrSwiper.coverflow(".mtr-swiper-gallery");
  MtrSwiper.responsive(".mtr-swiper-purecounter", 3);
  MtrSwiper.responsive(".mtr-swiper-equipe", 4);
  MtrSwiper.responsive(".mtr-swiper-depoimentos", 3);
  MtrSwiper.responsive(".mtr-swiper-planos", 4);
});