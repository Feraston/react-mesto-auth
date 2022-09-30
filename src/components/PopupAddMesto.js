import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddMesto({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const buttonSave = isLoading ? "Создание..." : "Создать";

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      class={"add"}
      isOpen={isOpen}
      onClose={onClose}
      label={"Добавить место"}
      id={"form-add"}
      form={"addMesto"}
      title={"Новое место"}
      buttonTitle={buttonSave}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__form-input"
        name="name"
        placeholder="Название"
        id="card-name"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="popup__error" id="card-name-error"></span>
      <input
        type="url"
        className="popup__form-input"
        name="link"
        placeholder="Ссылка на картинку"
        id="card-link"
        value={link || ""}
        onChange={handleLinkChange}
        required
      />
      <span className="popup__error" id="card-link-error"></span>
    </PopupWithForm>
  );
}

export default PopupAddMesto;
