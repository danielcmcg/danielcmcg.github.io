import anime from '../anime-master/src/index.js';

var icons = document.querySelectorAll('.icon');

function animateButton(target, scale){
  anime.remove(target);
  anime({
    targets: target,
    keyframes: [
      {scale: scale}

    ],
    duration: 500,
    easing: 'easeOutElastic(1, .5)',
    loop: false
  });
}

var hoverEnd = 1.3;

icons[0].addEventListener('mouseenter', function(){ animateButton(icons[0], hoverEnd);}, false);
icons[0].addEventListener('mouseleave', function(){ animateButton(icons[0], 1);}, false);

icons[1].addEventListener('mouseenter', function(){ animateButton(icons[1], hoverEnd);}, false);
icons[1].addEventListener('mouseleave', function(){ animateButton(icons[1], 1);}, false);

icons[2].addEventListener('mouseenter', function(){ animateButton(icons[2], hoverEnd);}, false);
icons[2].addEventListener('mouseleave', function(){ animateButton(icons[2], 1);}, false);

icons[3].addEventListener('mouseenter', function(){ animateButton(icons[3], hoverEnd);}, false);
icons[3].addEventListener('mouseleave', function(){ animateButton(icons[3], 1);}, false);

icons[4].addEventListener('mouseenter', function(){ animateButton(icons[4], hoverEnd);}, false);
icons[4].addEventListener('mouseleave', function(){ animateButton(icons[4], 1);}, false);

icons[5].addEventListener('mouseenter', function(){ animateButton(icons[5], hoverEnd);}, false);
icons[5].addEventListener('mouseleave', function(){ animateButton(icons[5], 1);}, false);

icons[6].addEventListener('mouseenter', function(){ animateButton(icons[6], hoverEnd);}, false);
icons[6].addEventListener('mouseleave', function(){ animateButton(icons[6], 1);}, false);

icons[7].addEventListener('mouseenter', function(){ animateButton(icons[7], hoverEnd);}, false);
icons[7].addEventListener('mouseleave', function(){ animateButton(icons[7], 1);}, false);

icons[8].addEventListener('mouseenter', function(){ animateButton(icons[8], hoverEnd);}, false);
icons[8].addEventListener('mouseleave', function(){ animateButton(icons[8], 1);}, false);

icons[9].addEventListener('mouseenter', function(){ animateButton(icons[9], hoverEnd);}, false);
icons[9].addEventListener('mouseleave', function(){ animateButton(icons[9], 1);}, false);

icons[10].addEventListener('mouseenter', function(){ animateButton(icons[10], hoverEnd);}, false);
icons[10].addEventListener('mouseleave', function(){ animateButton(icons[10], 1);}, false);

var brandParent = document.querySelectorAll('.brandParent');
var brandImages = document.querySelectorAll('.brandAnim');

animateBrand(brandImages[0], 360, true);
animateBrand(brandImages[1], -180, true);

function animateBrand(target, value, loop){
  anime.remove(target);
  anime({
    targets: target,
    loop: loop,
    direction: 'alternate',
    translateX: {
      value: -128,
      duration: 0
    },
    translateY: {
      value: -30,
      duration: 0
    },
    rotate: {
      value: value,
      duration: 20000,
      easing: 'easeInOutQuad'
    }
  });
}
