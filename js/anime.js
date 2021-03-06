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

//icons[5].addEventListener('mouseenter', function(){ animateButton(icons[5], hoverEnd);}, false);
//icons[5].addEventListener('mouseleave', function(){ animateButton(icons[5], 1);}, false);

var brandParent = document.querySelectorAll('.brandParent');
var brandImages = document.querySelectorAll('.brandAnim');

//animateBrand(brandImages, 0, true);
animateBrand(brandImages[0], 360, true);
animateBrand(brandImages[1], -180, true);

//brandParent[0].addEventListener('mouseenter', function()
//{
//  animateBrand(brandImages[0], 360, true);
//  animateBrand(brandImages[1], -180, true);
//}, false);
//brandParent[0].addEventListener('mouseleave', function()
//{
//  animateBrand(brandImages[0], 0, false);
//  animateBrand(brandImages[1], 1, false);
//}, false);

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
