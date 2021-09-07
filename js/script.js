import tabs from './modules/tabs';
import modals from './modules/modals';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import sliders from './modules/sliders';
import { openModal } from './modules/modals';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 50000),
        deadline = '2022-1-1'; //Set timer

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modals('[data-modal]', '.modal', modalTimerID);
    timer('.timer', deadline);
    cards();
    calc();
    forms('form', modalTimerID);
    sliders({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currenCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slide-inner'
    });
});