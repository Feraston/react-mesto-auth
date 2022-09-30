import React from "react";
import deleteCard from "../images/delete.svg";
import like from "../images/like.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isDeleteCard = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `content__button-like ${
    isLiked ? "content__like_active" : ""
  }`;

  function handleClick() {
    props.selectedCard({
      link: props.card.link,
      name: props.card.name,
    });
  }

  function handleDelete() {
    props.cardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="content__card">
      <img
        className="content__scenery"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="content__description">
        <h2 className="content__place">{props.card.name}</h2>
        <div className="content__contain">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          >
            <img src={like} alt="Лайк" className="content__like" />
          </button>
          <p className="content__like-number">{props.card.likes.length}</p>
        </div>
      </div>
      {isDeleteCard && (
        <button
          className="content__button-delete"
          type="button"
          onClick={handleDelete}
        >
          <img src={deleteCard} alt="Удалить" className="content__delete" />
        </button>
      )}
    </li>
  );
}

export default Card;
