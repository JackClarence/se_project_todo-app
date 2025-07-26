class Section{
    constructor({items, renderer, containerSelector}){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(){
        this._items.forEach((item) => {
          const itemEl = this._renderer(item);
          this._container.append(itemEl);
        });
    }

    addItem(element){
        const itemEl = this._renderer(element);
        this._container.append(itemEl);
    }
}

export default Section;