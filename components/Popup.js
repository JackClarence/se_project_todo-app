class Popup{
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    }

    open(){
        this._popupElement.classList.add("popup_visible");
        document.addEventListener("keydown", this._handleEscapeClose);
    }

    close(){
        this._popupElement.classList.remove("popup_visible");
        document.removeEventListener("keydown", this._handleEscapeClose);
    }

    _handleEscapeClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.addEventListener("mousedown", (evt) => {
            if(evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup")){
                this.close();
            }
        });
    }
}

export default Popup;