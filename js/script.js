window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        modals = require('./modules/modals'),
        timer = require('./modules/timer'),
        cards = require('./modules/cards'),
        calc = require('./modules/calc'),
        forms = require('./modules/forms'),
        sliders = require('./modules/sliders');

    tabs();
    modals();
    timer();
    cards();
    calc();
    forms();
    sliders();
});