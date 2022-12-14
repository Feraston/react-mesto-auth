import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupEditProfile from "./PopupEditProfile";
import PopupAddMesto from "./PopupAddMesto";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupDeleteCards from "./PopupDeleteCards";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as authApi from "../utils/authApi";
import InfoTooltip from "./InfoTooltip";
import ok from "../images/ok.png";
import error from "../images/error.png";

function App() {
  // Api data
  const [currentUser, setCurrentUser] = useState({});
  const [apiCards, setApiCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [cardDelete, setCardDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [dataInfoTool, setDataInfoTool] = useState({
    title: "",
    icon: "",
  });
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.isOpen;

  //  Request processing functions
  function handleUpdateUser(userData) {
    setLoading(true);
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`????????????: ${err}`))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(userData) {
    setLoading(true);
    api
      .setUserAvatar(userData.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`????????????: ${err}`))
      .finally(() => setLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setApiCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`????????????: ${err}`);
      });
  }

  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setApiCards(apiCards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`????????????: ${err}`))
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    setLoading(true);
    api
      .addCards(cardData)
      .then((newCard) => {
        setApiCards([newCard, ...apiCards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`????????????: ${err}`))
      .finally(() => setLoading(false));
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      authApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData(res.data.email);
            history.push("/");
          } else {
            setDataInfoTool({
              title: "??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.",
              icon: error,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  // Initial launch
  useEffect(() => {
    checkToken();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([users, card]) => {
        setCurrentUser(users);
        setApiCards(card);
      })
      .catch((err) => {
        console.log(`????????????: ${err}`);
      });
  }, []);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  // Popup open
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCardDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      name: card.name,
    });
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  // Popup close
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setIsInfoTooltipOpen(false);
  }

  function handleRegister(email, password) {
    authApi
      .register(email, password)
      .then(() => {
        history.push("/sign-in");
        setDataInfoTool({ title: "???? ?????????????? ????????????????????????????????????!", icon: ok });
      })
      .catch((err) => {
        console.error(err);
        setDataInfoTool({
          title: "??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.",
          icon: error,
        });
      })
      .finally(() => handleInfoTooltipOpen());
  }

  function handleLogin(email, password) {
    authApi
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setUserData(email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setDataInfoTool({
          title: "??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.",
          icon: error,
        });
        console.error(err);
        handleInfoTooltipOpen();
      });
  }

  function signOut() {
    setLoggedIn(false);
    setUserData("");
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header headerMail={userData} signOut={signOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            apiCards={apiCards}
            selectedCards={handleCardClick}
            cardDelete={handleDeleteCardClick}
            onCardLike={handleCardLike}
          />
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {loggedIn && <Footer />}
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          popupClose={handleOverlay}
        />
        <PopupAddMesto
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          popupClose={handleOverlay}
        />
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          popupClose={handleOverlay}
        />
        <PopupDeleteCards
          card={cardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
          popupClose={handleOverlay}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
          popupClose={handleOverlay}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={dataInfoTool.title}
          icon={dataInfoTool.icon}
          popupClose={handleOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
