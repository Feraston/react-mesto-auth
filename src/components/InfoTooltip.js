import React from "react";
import Close from "../images/Close.svg";

function InfoTooltip({ isOpen, onClose, title, icon }) {
  return (
    <div className={`popup popup_tool ${isOpen && "popup_open"}`} >
      <div className="popup__container">
      <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        >
          <img src={Close} alt="Закрыть" className="popup__close" />
        </button>
        <img src={icon} alt="Статус-лого" className="popup__tool-logo" />
        <h2 className="popup__title popup__title_small">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;