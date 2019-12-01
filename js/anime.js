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

icons[5].addEventListener('mouseenter', function(){ animateButton(icons[4], hoverEnd);}, false);
icons[5].addEventListener('mouseleave', function(){ animateButton(icons[4], 1);}, false);
