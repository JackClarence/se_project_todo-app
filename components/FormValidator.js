class FormValidator{
    constructor(settingsObj, formEl){
        this._formEl = formEl;
        this._inputSelector = settingsObj.inputSelector;
        this._submitButtonSelector = settingsObj.submitButtonSelector;
        this._errorClass = settingsObj.errorClass;
        this._inputErrorClass = settingsObj.inputErrorClass;
        this._inactiveButtonClass = settingsObj.inactiveButtonClass;
    }

    _showInputError (inputElement, errorMessage) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formEl.querySelector(errorElementId);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError (inputElement) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formEl.querySelector(errorElementId);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(
                inputElement,
                inputElement.validationMessage,
            );
        } else {
            this._hideInputError(inputElement);
        }
    };

    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
        });
    };

    resetValidation(){
        this._formEl.reset();
        this._hideInputError();
        this._toggleButtonState();
    }

    _setEventListeners(){
        this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector)
        );
        const buttonElement = this._formEl.querySelector(this._submitButtonSelector);

        this._toggleButtonState(this._inputList, buttonElement, this.settingsObj);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, buttonElement, this.settingsObj);
            });
        });
    }
    
    enableValidation(){
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}

export default FormValidator;