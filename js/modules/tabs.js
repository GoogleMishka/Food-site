function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContetnt = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContetnt.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(activClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContetnt[i].classList.add('show', 'fade');
        tabsContetnt[i].classList.remove('hide');
        tabs[i].classList.add(activClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;