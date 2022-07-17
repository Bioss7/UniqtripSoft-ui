// document.addEventListener('DOMContentLoaded', function() {
//     if(!document.querySelector('.js-form')) return;
//     const form = document.querySelector('.js-form');
//     const btnInner = document.querySelector('.js-loader');
//     const btn = btnInner.querySelector('button');
//     const loader = document.createElement('div');
//     loader.classList.add('loader');
    
//     form.addEventListener('submit', formSend);

//     function formSend(e) {
//         e.preventDefault();

//         let error = formValidate(form);
//         let requestURL = form.getAttribute("action");

//         let formData = new FormData(form);
//         if(document.querySelector('[data-type="value"]')) {
//             formData.append('select', document.querySelector('[data-type="value"]').innerText);
//         }

//         let body = {
//             name: formData.get("name"),
//             email: formData.get("email"),
//             message: formData.get("message"),
//             select: formData.get("select"),
//         }

//         if(error === 0) {
//             btnInner.append(loader);
//             btn.disabled = true;
//             function sendRequest(method, url, body = null) {
//                 const headers = {'Content-Type':'application/json', 'x-requested-with':'xmlhttprequest'}
//                 return fetch(url, {
//                     method: method,
//                     body: JSON.stringify(body),
//                     headers:  headers
//                 }).then(response => {
//                     if(response.ok) {
//                         loader.remove();
//                         btn.disabled = false;
//                         return response.json();
//                     }
//                     return response.json().then(error => {
//                         const e = new Error('Что-то пошло не так');
//                         e.data = error;
//                         throw e;
//                     });
//                 });
                
//             }

//             sendRequest('POST', requestURL, body)
//             .then(data => {
//                 console.log(data); 
//                 alert(data.message);
//             })
//             .catch(err => {
//                 console.log(err); 
//                 alert(err); 
//                 loader.remove(); 
//                 btn.disabled = false;
//             });
//         } else {
//             alert('Заполните обязательные поля');
//         }

//     }

//     function formValidate(form) {
//         let error = 0;
//         let formReq = document.querySelectorAll('.js-req');

//         for(let i = 0; i < formReq.length; i++) {
//             const input = formReq[i];
//             formRemoveError(input);

//             if(input.classList.contains('js-email')) {
//                 if(emailTest(input)) {
//                     formAddError(input);
//                     error++;
//                 } 
//             } else {
//               if(input.value === '') {
//                 formAddError(input);
//                 error++;
//               }  
//             }
//         }
//         return error;
//     }

//     function formAddError(input) {
//         input.parentElement.classList.add('js-error');
//         input.classList.add('js-error');
//     }

//     function formRemoveError(input) {
//         input.parentElement.classList.remove('js-error');
//         input.classList.remove('js-error');
//     }

//     function emailTest(input) {
//         return !/^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,8})+$/.test(input.value);
//     }
// });