function sliders({ container, slide, nextArrow, prevArrow, totalCounter, currenCounter, wrapper, field }) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prevSlide = document.querySelector(prevArrow),
        nextSlide = document.querySelector(nextArrow),
        totalSlidesCounter = document.querySelector(totalCounter),
        currentSlideCounter = document.querySelector(currenCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        dots = [];
    let slideIndex = 1,
        offset = 0;

    function dotsOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function currentSlideNumb() {
        if (slides.length < 10) {
            currentSlideCounter.textContent = `0${slideIndex}`;
        } else {
            currentSlideCounter.textContent = slideIndex;
        }
    }

    function moveSlide() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function maxSlideNumb() {
        if (slides.length < 10) {
            totalSlidesCounter.textContent = `0${slides.length}`;
            currentSlideCounter.textContent = `0${slideIndex}`;
        } else {
            totalSlidesCounter.textContent = slides.length;
            currentSlideCounter.textContent = slideIndex;
        }
    }

    maxSlideNumb();

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            moveSlide();
            currentSlideNumb();
            dotsOpacity();
        });
    });

    nextSlide.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        moveSlide();
        currentSlideNumb();
        dotsOpacity();
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        moveSlide();
        currentSlideNumb();
        dotsOpacity();
    });


    //Simple slider

    // showSlide(slideIndex);
    // maxSlideNumb();

    // function showSlide(index) {
    //     if (index > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (index < 1) {
    //         slideIndex = slides.length;
    //     }
    //     currentSlideNumb();
    //     slides.forEach(slide => {
    //         slide.classList.add('hide');
    //     });
    //     slides[slideIndex - 1].classList.add('show');
    //     slides[slideIndex - 1].classList.remove('hide');
    // }

    // function plusSlides(index) {
    //     showSlide(slideIndex += index);
    // }

    // prevSlide.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // nextSlide.addEventListener('click', () => {
    //     plusSlides(1);
    // });

}

export default sliders;