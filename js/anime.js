import anime from '../anime-master/src/index.js';

//var profile = document.querySelectorAll('.profile');
//var name = document.querySelectorAll('.name');
var icons = document.querySelectorAll('.icon50');

//var timedAnim = anime.timeline({
//    duration: 1000
//});
//
//timedAnim.add({
//    targets: profile,
//    translateY: [-200, 0],
//    opacity: [0, 1],
//    easing: 'easeOutElastic(1, .9)'
//});
//
//timedAnim.add({
//    targets: name,
//    translateY: [-50, 0],
//    opacity: [0, 1],
//    easing: 'easeOutElastic(1, .8)'
//});
//
//anime({
//    targets: '.icon0',
//    translateX: [-200, 0],
//    opacity: [0, 1],
//    delay: 2000,
//    easing: 'easeOutElastic(1, .8)'
//});
//
//anime({
//    targets: '.icon1',
//    translateX: [200, 0],
//    opacity: [0, 1],
//    delay: 2000,
//    easing: 'easeOutElastic(1, .8)'
//});

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


