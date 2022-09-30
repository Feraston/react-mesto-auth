export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  // Проверка получаения данных
  _check(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }

  // Запрос пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => this._check(res));
  }

  // Редактирование пользователя
  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: userData.name,
        about: userData.post,
      }),
    }).then((res) => this._check(res));
  }

  // Редактирование аватара
  setUserAvatar(userData) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: userData,
      }),
    }).then((res) => this._check(res));
  }

  // Запрос карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => this._check(res));
  }

  // Добавление карточек
  addCards(cardData) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => this._check(res));
  }

  // Удаление карточек
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._check(res));
  }

  // Поставить лайк
  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._check(res));
  }

  // Удалить лайк
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._check(res));
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Возникла ошибка: ${res.status}`);
    });
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "6058d091-3597-4634-88a3-a31b18eef67f",
    "Content-Type": "application/json",
  },
});
