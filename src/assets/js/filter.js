const btn = document.querySelectorAll('[data-filter]');
const projectItems = document.querySelectorAll('.projects__item');

btn.forEach(elem => elem.addEventListener('click', event => {
    let $this = event.currentTarget;
    let filterClass = $this.getAttribute('data-filter');
    
    projectItems.forEach(elem => {
        elem.classList.remove('hide');
        if(elem.getAttribute('data-tag') !== filterClass && filterClass !== 'Все') {
            elem.classList.add('hide');
        }
    });
}));
