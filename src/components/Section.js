class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    //принимает дом-элемент и вставляет его в контейнер
    addItem(item) {
        this._containerSelector.prepend(item);
    }

    //перебираем массив данных и вызываем для каждого эл-та метод addItem
    renderItems() {
        this._initialArray.forEach(this._renderer);        
    }
}

export default Section; 