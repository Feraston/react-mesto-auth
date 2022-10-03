import React from "react";
import edit from "../images/edit.svg";
import add from "../images/add.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page__main">
      <section className="profile">
        <div className="profile__content">
          <button
            className="profile__content-edit"
            type="button"
            onClick={props.onEditAvatar}
          />
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              onClick={props.onEditProfile}
            >
              <img
                src={edit}
                alt="Редактирование"
                className="profile__edit-img"
              />
            </button>
            <p className="profile__post">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={props.onAddPlace}
        >
          <img src={add} alt="Добавить" className="profile__add-file" />
        </button>
      </section>
      <section className="content" aria-label="Контент пользователя">
        <ul className="content__cards">
          {props.apiCards.map((data) => (
            <Card
              key={data._id}
              _id={data._id}
              card={data}
              selectedCard={props.selectedCards}
              cardDelete={props.cardDelete}
              onCardLike={props.onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
