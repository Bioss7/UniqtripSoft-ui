document.addEventListener("DOMContentLoaded", function() {

    const requestURL =  'https://uniqtrip.tmweb.ru/search';
    const searchInput = document.querySelector('.js-search-input');
    const searchList = document.querySelector('.js-search-list');
    const loader = document.createElement('div');
    loader.classList.add('loader', 'loader--search');

    function sendRequest(method, url, body = null) {
        return fetch(url).then(response => {
            return response.json();
        });
    }
   
    function onChange() {
        let val = this.value.trim();
        let emptyArray = [];

        if(val != '' & val.length >= 3) {
            searchInput.after(loader);
        
            sendRequest('GET', requestURL, val)
                .then(data => {
                    
                    emptyArray = data.filter(item => {
                        if(item.label.search(RegExp(val,"gi")) !== -1 || item.text.search(RegExp(val,"gi")) !== -1 || item.keywords.search(RegExp(val,"gi")) !== -1) {
                            return item;
                        }
                    });

                    if(emptyArray.length >= 1) {
                        for(let i = 0; i < emptyArray.length; i++) {
                            searchList.innerHTML = "";
                            searchList.innerHTML += `<li class="search__item"><a href="${emptyArray[i].url}">${emptyArray[i].label}</a></li>`;
                            loader.remove();
                        }
                    } else {
                        searchList.innerHTML = `<li class="search__item">По вашему запросу ничего не найдено</li>`;
                        loader.remove();
                    }
                        
                })
                .catch(err => console.log(err));
        } else {
            searchList.innerHTML = "";
        }
    } 

    onChange = debounce(onChange, 500);

    searchInput.addEventListener('input', onChange);

});

const debounce = (fn, ms) => {
    let timeout;
    return function () {
        const fnCall = () => { fn.apply(this, arguments) }

        clearTimeout(timeout);

        timeout = setTimeout(fnCall, ms)
    };
}