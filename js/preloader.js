function startLoader() {
    let counterElement = document.querySelector('.count p');
    let currentValue = 0;

    document.body.classList.add('loading');

    function updateCounter() {
        if (currentValue < 100) {
            let increment = Math.floor(Math.random() * 10) + 1;
            currentValue =Math.min(currentValue + increment, 100);
            counterElement.textContent = currentValue;

            let delay = Math.floor(Math.random() * 200) + 25;
            setTimeout(updateCounter, delay);
        }
    }

    updateCounter();
}

startLoader();
gsap.to('.count', {opacity: 0, delay: 3.5, duration: 0.5});

let textWrapper = document.querySelector('.txt_main');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, '<span class="letter">$&</span>');

anime.timeline({ loop: false })
    .add ({
        targets: '.txt_main .letter',
        translateY: [-100, 0],
        easing: 'easeOutExpo',
        duration: 1500,
        delay: (el, i) => 30 * i
    })
    .add ({
        targets: '.txt_main .letter',
        translateY: [0, 100],
        easing: 'easeOutExpo',
        duration: 3000,
        delay: (el, i) => 2000 + 30 * i
    });

    gsap.to('.pre-loader', {
        scale: 0.5,
        ease: 'power4.inOut',
        duration: 2,
        delay: 3
    })

    gsap.to('.loader', {
        height: '0',
        ease: 'power4.inOut',
        duration: 1.5,
        delay: 3.75
    })

    gsap.to('.loader-bg', {
        height: '0',
        ease: 'power4.inOut',
        duration: 1.5,
        delay: 4,
        onComplete: function() {
            document.body.classList.remove('loading');
        }
    })

    gsap.to('.loader-2', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        ease: 'power4.inOut',
        duration: 1.5,
        delay: 3.5
    })