class Form {
    constructor(selector, options) {
        this.form = selector;
        if(!this.form) return;
        this.btn = this.form.querySelector('.js-loader');
        this.loader = document.createElement('div');
        this.loader.classList.add('loader');
        this.setup();
    }

    setup() {
        this.form.addEventListener('submit', this.formSend);
    }

    formSend = (e) => {
        e.preventDefault();
        let error = this.formValidate(this.form);
        let requestURL = this.form.getAttribute("action");
        let formData = new FormData(this.form);

        if(this.form.querySelector('[data-type="value"]')) {
            formData.append('select', this.form.querySelector('[data-type="value"]').innerText);
        }

        if(this.form.querySelector('input[name=phone]')) {
            formData.append('phone', this.form.querySelector('input[name=phone]').value.trim().replace(/[^0-9]/g, ''));
        }

        let body = new Object;
        for(let element of formData) {
            let name = element[0];
            let value = element[1];
            body[name] = value;
        }

        console.log("body: ", body)

        if(error === 0) {
            const that = this;
            this.btn.append(this.loader);
            this.btn.disabled = true;

            function sendRequest(method, url, body = null) {
                const headers = {'Content-Type':'application/json', 'x-requested-with':'xmlhttprequest'}
                return fetch(url, {
                    method: method,
                    body: JSON.stringify(body),
                    headers:  headers
                }).then(response => {
                    if(response.ok) {
                        that.loader.remove();
                        that.btn.disabled = false;
                        return response.json();
                    }
                    return response.json().then(error => {
                        const e = new Error('Что-то пошло не так');
                        e.data = error;
                        throw e;
                    });
                });
                
            }

            sendRequest('POST', requestURL, body)
                .then(data => {
                    console.log(data); 
                    alert(data.message);
                })
                .catch(err => {
                    console.log(err); 
                    alert(err); 
                    this.loader.remove(); 
                    this.btn.disabled = false;
                });
        } else {
            alert('Заполните обязательные поля');
        }

    }

    formValidate(form) {
        let error = 0;
        let formReq = form.querySelectorAll('.js-req');

        for(let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            this.formRemoveError(input);

            // if(this.phoneTest(input)) {
            //     this.formAddError(input);
            //     error++;
            // } 


            if(input.classList.contains('js-email')) {
                if(this.emailTest(input)) {
                    this.formAddError(input);
                    error++;
                } 
            } else if(input.classList.contains('js-phone')) { 
                if(this.phoneTest(input)) {
                    this.formAddError(input);
                    error++;
                }
            } else {
              if(input.value === '') {
                this.formAddError(input);
                error++;
              } 
            }
        }
        return error;
    }

    formAddError(input) {
        input.parentElement.classList.add('js-error');
        input.classList.add('js-error');
    }

    formRemoveError(input) {
        input.parentElement.classList.remove('js-error');
        input.classList.remove('js-error');
    }

    emailTest(input) {
        return !/^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,8})+$/.test(input.value);
    }

    phoneTest(input) {
        return input.value.trim().replace(/[^0-9]/g, '').length < 11;
    }

}

document.addEventListener("DOMContentLoaded", function() {

    let getFormsAtr = document.querySelectorAll('.js-form');
    getFormsAtr.forEach(element => {
        new Form(element, {});
    });
   
});
