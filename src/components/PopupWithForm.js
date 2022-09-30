import React from "react";
import Close from "../images/Close.svg";
 
function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_${props.class} ${props.isOpen && "popup_open"}`}
      aria-label={`${props.label}`}
      id={`${props.id}`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        >
          <img src={Close} alt="Закрыть" className="popup__close" />
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
