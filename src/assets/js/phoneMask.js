document.addEventListener('DOMContentLoaded', function() {
    let input = new Inputmask("+7 (999) 999 99 99");
    input.mask(document.querySelector("input[name=phone]"));
})