document.addEventListener("DOMContentLoaded", function(){
    const selectInit = document.querySelector('.js-select');
    if(selectInit) {
        const select = new SelectUI('.js-select', {
            placeholder: 'Выберите элемент',
            // selectedId: '2',
            data: [
                {id: '1', value: 'По популярности'},
                {id: '2', value: 'По возрастанию цены'},
                {id: '3', value: 'По возрастанию цены'},
                {id: '4', value: 'По возрастанию цены'},
                {id: '5', value: 'По возрастанию цены'},
                {id: '6', value: 'По возрастанию цены'},
                {id: '7', value: 'По возрастанию цены'},
                {id: '8', value: 'По возрастанию цены'},
            ],
                onSelect(item){
                // console.log('selected Item', item)
            }
        });
    }
});