document.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContetnt = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContetnt.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContetnt[i].classList.add('show', 'fade');
        tabsContetnt[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    let deadline = '2022-1-1'; //Set timer

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                const newTimer = `${new Date().getFullYear() + 1}-${new Date().getMonth()}-${new Date().getDate()}`;
                setClock('.timer', newTimer);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigers = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal');


    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerID);
    }

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigers.forEach(triger => {
        triger.addEventListener('click', openModal);
    });

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            console.log('asdasd');
            closeModal();
        }
    });

    // Updating Modal

    const modalTimerID = setTimeout(openModal, 50000);



    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Use classes for cards

    class MenuCard {
        constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    //Aналогичная функция только без шаблонизации.

    // getResource('http://localhost:3000/menu')
    //     .then(data => createMenuCard(data));

    // function createMenuCard(data) {
    //     data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // Forms

    const forms = document.querySelectorAll('form');

    const massage = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро свяжемся с Вами',
        failure: 'Что-то пошло не так...',
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMassage = document.createElement('img');
            statusMassage.src = massage.loading;
            statusMassage.style.cssText = `display: block; margin: 0 auto;`;

            form.insertAdjacentElement('afterend', statusMassage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(massage.success);
                    statusMassage.remove();
                })
                .catch(() => {
                    showThanksModal(massage.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(massage) {
        const pervModalDialog = document.querySelector('.modal__dialog');

        pervModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${massage}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            pervModalDialog.classList.remove('hide');
            pervModalDialog.classList.add('show');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        totalSlidesCounter = document.querySelector('#total'),
        currentSlideCounter = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slide-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        dots = [];
    let slideIndex = 1,
        offset = 0;

    //Update slider

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

    //Calculator

    const result = document.querySelector('.calculating__result span');
    let sex, ratio, height, weight, age;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    function initLocalSettings(selector, activClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = `____`;
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticInformation(selector, activClass) {
        const elements = document.querySelectorAll(selector);


        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activClass);
                });

                e.target.classList.add(activClass);

                calcTotal();
            });
        });
    }

    function getDynamicInfromation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getDynamicInfromation('#height');
    getDynamicInfromation('#weight');
    getDynamicInfromation('#age');

});