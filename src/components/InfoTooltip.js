import React from "react";
import close from "../images/close.svg";

function InfoTooltip({ isOpen, onClose, title, icon, popupClose }) {
  return (
    <div className={`popup popup_tool ${isOpen && "popup_open"}`} onClick={popupClose}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={onClose}>
          <img src={close} alt="Закрыть" className="popup__close" />
        </button>
        <img src={icon} alt="Статус-лого" className="popup__tool-logo" />
        <h2 className="popup__title popup__title_small">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
