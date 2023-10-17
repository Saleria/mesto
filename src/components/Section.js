class Section {
    constructor({renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    //принимает дом-элемент и вставляет его в контейнер
    addItem(item) {
        this._containerSelector.prepend(item);
    }

    //перебираем массив данных и вызываем для каждого эл-та метод addItem
    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item); 
        });        
    }
}

export default Section; 