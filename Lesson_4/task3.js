class DataVadidator {
    constructor(form) {
        this.form = form;
        this.data = {
            name: /^[a-zа-я]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w-.]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя должно содержать только буквы',
            phone: 'Телефон должен быть в формате +7(000)000-0000',
            email: 'E-mail должен быть в формате  example@example.ru'
        };
        this.errorMessage = 'error-message';
        this.valid = false;
        this._validationForm();
    }
    _validationForm() {
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorMessage}`)];
        for (let err of errors) {
            err.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let fld of formFields) {
            this._validate(fld);
        }
        if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
            this.valid = true;
        }
    }
    _validate(field) {
        if (this.data[field.name]) {
            if (!this.data[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMessage(field);
                this._showField(field);
            }
        }
    }
    _addErrorMessage(field) {
        let error = `<div class="${this.errorMessage}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
    _showField(field) {
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorMessage}`);
            if (this.data[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (error) {
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (!error) {
                    this._addErrorMessage(field);
                }
            }
        })
    }
}