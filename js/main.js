(function ($) {

    'use strict';

	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000)
	});

	gsap.ticker.lagSmoothing(0);

}(jQuery));


//Button
(function ($) {

    'use strict';

	$('.iBtn')
	.on('mouseenter', function(e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
	})
	.on('mouseout', function(e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;
		$(this).find('span').css({top:relY, left:relX})
	});

}(jQuery));


//Stack Cards
(function ($) {

    'use strict';

	  let cards = gsap.utils.toArray(".stack_item");

    let stickDistance = 0;

    let firstCardST = ScrollTrigger.create({
        trigger: cards[0],
        start: "center center"
    });

    let lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "bottom bottom"
    });

    cards.forEach((card, index) => {
        var scale = 1 - (cards.length - index) * 0.025;
        let scaleDown = gsap.to(card, {
        scale: scale,
        "transform-origin": '"50% ' + (lastCardST.start + stickDistance) + '"'
        });

        ScrollTrigger.create({
        trigger: card,
        start: "center center",
        end: () => lastCardST.start + stickDistance,
        pin: true,
        pinSpacing: false,
        ease: "none",
        animation: scaleDown,
        toggleActions: "restart none none reverse"
        });
    });

}(jQuery));


//Horizontal Scroll
const listPrj = document.querySelector('.project_list');
function getScrollAmount() {
    let listWidth = listPrj.scrollWidth;
    return -(listWidth - window.innerWidth + 78);
}

const tween = gsap.to(listPrj, {
    x: getScrollAmount(),
    duration: 3,
    ease: 'none',
});

ScrollTrigger.create({
    trigger: '.project',
    start: 'top top',
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    markers: false
});

// function applySkew() {
//     let proxy = { skew: 0 };
//     const skewSetter = gsap.quickSetter('.project_list-item', 'skewX', 'deg');
//     const clamp = gsap.utils.clamp(-20, 20);

//     ScrollTrigger.create ({
//         trigger: '.project',
//         start: 'top top',
//         end: () => `+=${getScrollAmount() * -1}`,
//         onUpdate: (self) => {
//             const skew = clamp(self.getVelocity() / -300);

//             if (Math.abs(skew) > Math.abs(proxy.skew)) {
//                 proxy.skew = skew;

//                 gsap.to(proxy, {
//                     skew: 0,
//                     duration: 0.8,
//                     ease: 'power3',
//                     overwrite: true,
//                     onUpdate: () => skewSetter(proxy.skew),
//                 });
//             }
//         },
//     });
// }

// applySkew()



//Cursor
const TAIL_LENGTH = 20;

const cursor = document.getElementById('cursor');
const cursorSpan = cursor.querySelector('span');

let mouseX = 0;
let mouseY = 0;

let cursorCircles;
let cursorHistory = Array(TAIL_LENGTH).fill({x: 0, y: 0});

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let div = document.createElement('div');
    div.classList.add('cursor-circle') ;
    cursor.append(div);
  }
  cursorCircles = Array.from(document.querySelectorAll('.cursor-circle'));
}

function updateCursor() {  
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });
    
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];
    
    let xDiff = next.x - current.x;
    let yDiff = next.y - current.y;
    
    current.x += xDiff * 0.35;
    current.y += yDiff * 0.35;
    cursorCircles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i/TAIL_LENGTH})`;  
  }

  cursorSpan.style.transform = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`;
  
  requestAnimationFrame(updateCursor)
}

document.addEventListener('mousemove', onMouseMove, false);

const cursorViewElement = document.querySelectorAll('.cursor-view');

cursorViewElement.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('view');
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('view');
  });
});


initCursor();
updateCursor();