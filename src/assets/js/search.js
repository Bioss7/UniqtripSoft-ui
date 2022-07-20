document.addEventListener("DOMContentLoaded", function() {

    const requestURL = 'https://uniqtrip.tmweb.ru/search?term=';
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
        window.searchString = '';
        let getArray = [];
        let fakeArray = [
            {keywords: '', label: 'Главная', text: '', url: '/'},
            {keywords: '', label: 'создание сайтов', text: 'разработка сайтов', url: '/ra'}
        ];

        if(val != '' & val.length >= 3) {
            searchInput.after(loader);

            searchString = requestURL + val;
            searchString = searchString.replace(/\s/g, "+");
            console.log("searchString:", searchString);
        
            sendRequest('GET', searchString, val)
                .then(data => {
                    getArray = data.map(item => {
                        return item;
                    });
                    
                    if(getArray.length >= 1) {
                        searchList.innerHTML = "";
                        for(let i = 0; i < getArray.length; i++) {
                            searchList.innerHTML += `<li class="search__item"><a href="${getArray[i].url}">${getArray[i].label}</a></li>`;
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