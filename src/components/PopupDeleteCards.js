import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteCards({
  card,
  isOpen,
  onClose,
  onCardDelete,
  isLoading,
  popupClose,
}) {
  const buttonSave = isLoading ? "Удаление..." : "Да";

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  return (
    <PopupWithForm
      class={"delete"}
      isOpen={isOpen}
      onClose={onClose}
      label={"Удалить карточку"}
      id={"delete-card"}
      form={"deleteCard"}
      title={"Вы уверены?"}
      buttonTitle={buttonSave}
      onSubmit={handleSubmit}
      popupClose={popupClose}
    />
  );
}

export default PopupDeleteCards;
