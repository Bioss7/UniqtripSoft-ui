const btn = document.querySelectorAll('.js-btn-package');

btn.forEach(item => item.addEventListener('click', function(event) {
    console.log("event", event.currentTarget);
    let $this = event.currentTarget;
    let content = $this.parentNode.querySelector('.package__content');
    content.classList.toggle('active');

    if(content.classList.contains('active')) {
        $this.innerText = "Скрыть";
    } else {
        $this.innerText = "Подробнее";
    }
}));
