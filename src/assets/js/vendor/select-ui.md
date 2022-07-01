/* 
Разметка для селекта
<div id="select-ui"></div>

Фейковый селект, пока не выбран первый селект
<div class="select-ui select-ui-hide">
    <div class="select-ui__backdrop" data-type="backdrop"></div>
    <div class="select-ui__input" data-type="input">
        <span data-type="value">Выберите элемент</span>
    </div>
    <div class="select-ui__dropdown">
        <ul class="select-ui__list">        
        </ul>
    </div>
</div>

Вызов библиотеки
document.addEventListener("DOMContentLoaded", function(){
    const select = new SelectUI('#select-ui', {
        placeholder: 'Выберите элемент',
        // selectedId: '2',
        data: [
            {id: '1', value: 'По популярности'},
            {id: '2', value: 'По возрастанию цены'},
        ],
            onSelect(item){
            // console.log('selected Item', item)
        }
    });
})

Удаление селекта, select - переменная класса
select.destroy();
*/