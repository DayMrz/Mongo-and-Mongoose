const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');


// counter
let counter = 1;
const size = window.innerWidth;

carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

function setSlide(index, transition = true) {
    if (transition) {
        carouselSlide.style.transition = "transform 0.4s ease-in-out";
    } else {
        carouselSlide.style.transition = "none";
    }

    counter = index;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
}

// button listeners

nextBtn.addEventListener("click", () => {
    setSlide(counter + 1);
});

prevBtn.addEventListener("click", () => {
    setSlide(counter - 1);
});

carouselSlide.addEventListener("transitionend", () => {
    if (counter <= 0) {
        setSlide(carouselImages.length - 2, false);
    } else if (counter >= carouselImages.length - 1) {
        setSlide(1, false);
    }
});






























// counter
// let counter = 1;
// const size = carouselImages[0].clientWidth;

// carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// carouselSlide.style.transition = "transform 0.4s ease-in-out";
// button listeners

// nextBtn.addEventListener('click', () => {
//     counter++;
    // console.log(counter);
//     carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
// });

// prevBtn.addEventListener('click', () => {
//     counter--;
    // console.log(counter);
//     carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
// });

// carouselSlide.addEventListener('transitionend', () => {
    // console.log('fired!!');
    // console.log(carouselImages[counter]);

    // if (counter <= 0) {
    //     carouselSlide.style.transition = "none";
    //     counter = carouselImages.length - 2;
    //     carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    // }
//     else if (counter >= carouselImages.length - 1) {
//         carouselSlide.style.transition = "none"
//         counter = 1;
//         carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
//     }
// });
