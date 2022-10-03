import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile({ isOpen, onClose, onUpdateUser, isLoading, popupClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const buttonSave = isLoading ? "Сохранение..." : "Сохранить";

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      post: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      class={"edit"}
      isOpen={isOpen}
      onClose={onClose}
      label={"Редактироване профиля"}
      id={"form-edit"}
      form={"editProfile"}
      title={"Редактировать профиль"}
      buttonTitle={buttonSave}
      onSubmit={handleSubmit}
      popupClose={popupClose}
    >
      <input
        type="text"
        className="popup__form-input"
        name="name"
        placeholder="Имя"
        id="form-name"
        onChange={handleName}
        value={name || ""}
        required
      />
      <span className="popup__error" id="form-name-error"></span>
      <input
        type="text"
        className="popup__form-input"
        name="post"
        placeholder="О себе"
        id="form-post"
        onChange={handleDescription}
        value={description || ""}
        required
      />
      <span className="popup__error" id="form-post-error"></span>
    </PopupWithForm>
  );
}

export default PopupEditProfile;
