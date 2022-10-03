import React from "react";
import close from "../images/close.svg";
 
function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_${props.class} ${props.isOpen && "popup_open"}`}
      aria-label={`${props.label}`}
      id={`${props.id}`}
      onClick={props.popupClose}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        >
          <img src={close} alt="Закрыть" className="popup__close" />
        </button>
        <form
          className={`popup__forms popup__${props.id}`}
          name={`${props.form}`}
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__label">
            <legend className="popup__form">{props.title}</legend>
            {props.children}
            <button type="submit" className="popup__form-button">
              {props.buttonTitle}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
