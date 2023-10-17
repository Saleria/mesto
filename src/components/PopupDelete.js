import { Popup } from "./Popup";

export class PopupDelete extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }
    
}