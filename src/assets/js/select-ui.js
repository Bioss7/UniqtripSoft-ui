const selectItem = (data, selectedId, selectedDataProp) => {
    const items = data.map(item => {
        let cls = '';

        if(selectedDataProp === undefined) {
            if(item.id === selectedId){                
                text = item.value;
                cls = 'selected';
            }
        } else {
            if(item.dataProp === selectedDataProp){
                text = item.value;
                cls = 'selected';
            }
        }

        return `
            <li class="select-ui__item ${cls}" data-type="item" data-id=${item.id} data-prop="${item.dataProp}">${item.value}</li>
        `
    });

    return `
    <div class="select-ui__backdrop" data-type="backdrop"></div>
    <div class="select-ui__input" data-type="input">
        <span data-type="value">${text}</span>
    </div>
    <div class="select-ui__dropdown">
        <ul class="select-ui__list">
           ${items.join('')}
        </ul>
    </div>
    `
}

class SelectUI{
    constructor(selector, options){
        this.$el = selector;
        this.options = options;
        this.selectedId = options.selectedId;
        this.selectedDataProp = options.selectedDataProp;
        this.fakeSelect = document.querySelector('.select-ui-hide');       

        this.render();
        this.setup();
    }

    render(){
        const {placeholder, data} = this.options;
        this.$el.classList.add('select-ui');
        this.$el.innerHTML = selectItem(this.getData(), this.selectedId);
    }

    getData() {
        let data = [];
        let selectList = this.$el.querySelector('.select-ui__list').querySelectorAll('.select-ui__item');
        selectList.forEach((item) => {
            data.push({id: item.dataset.id, dataProp: item.dataset.prop, value: item.innerText});
        });
        return data;
    }

    setup(){
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$arrow = this.$el.querySelector('[data-type="arrow"]');
        this.$value = this.$el.querySelector('[data-type="value"]');
    }

    clickHandler(event){
        const {type} = event.target.dataset;
        if(type === 'input') {
            this.toggle();
        } else if (type === 'item'){
            const id = event.target.dataset.id;
            this.select(id);
        } else if(type === 'backdrop'){
            this.close();
        } else if(type === 'item'){
            const dataProp = event.target.dataset.prop;
            console.log("dataProp", dataProp);
            this.select(dataProp);
        } 
    }

    get isOpen(){
        return this.$el.classList.contains('open');
    }

    get current(){
        return this.getData().find(item => item.id === this.selectedId);
    }

    select(id, dataProp){
        this.selectedId = id;
        this.selectedDataProp = dataProp;
        this.$value.innerHTML = this.current.value;

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected'); 
        });
        
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');
        this.options.onSelect ? this.options.onSelect(this.current) : null;
        this.close();
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }

    open(){
        this.$el.classList.add('open');
    }

    close(){
        this.$el.classList.remove('open');
    }

    destroy(){
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }

    hideFakeSelect(){
        if(this.fakeSelect !== null)
        this.fakeSelect.remove();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let getSelector = document.querySelectorAll('.js-select');
        getSelector.forEach(element => {
            new SelectUI(element, {
                selectedId: '1',
                onSelect(item) {
                    console.log('selected Item', item);
                }
            });
        })
});



