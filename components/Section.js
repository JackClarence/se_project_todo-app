class Section{
    constructor({items, renderer, containerSelector}){
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderItems(){
        this._items.forEach((item) => {
          const itemEl = this._renderer(item);
          this._containerSelector.append(itemEl);
        });
    }

    addItem(element){
        const itemEl = this._renderer(element);
        this._containerSelector.append(itemEl);
    }
}

export default Section;