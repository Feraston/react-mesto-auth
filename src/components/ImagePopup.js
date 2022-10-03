import React from "react";
import Close from "../images/close.svg";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_img ${props.isOpen && "popup_open"}`}
      aria-label="Просмотр фотографии"
      id="img-zoom"
      onClick={props.popupClose}
    >
      <div className="popup__img-zoom">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        >
          <img src={Close} alt="Закрыть" className="popup__close" />
        </button>
        <img
          className="popup__zoom-photo"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__title-img">{props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
