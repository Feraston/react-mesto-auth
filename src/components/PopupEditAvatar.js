import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();
  const buttonSave = isLoading ? "Сохранение..." : "Сохранить";

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      class={"avatar"}
      isOpen={isOpen}
      onClose={onClose}
      label={"Изменить аватар"}
      id={"edit-avatar"}
      form={"addAvatar"}
      title={"Обновить аватар"}
      buttonTitle={buttonSave}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__form-input"
        name="avatar"
        placeholder="Ссылка на аватар"
        id="editAvatar"
        ref={avatarRef}
        required
      />
      <span className="popup__error" id="editAvatar-error"></span>
    </PopupWithForm>
  );
}

export default PopupEditAvatar;
