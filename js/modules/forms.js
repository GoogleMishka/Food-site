function forms() {
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

}

module.exports = forms;