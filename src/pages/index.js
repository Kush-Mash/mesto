import { buttonEdit, popupFormUser, nameInput, jobInput,
  buttonAdd, popupFormPlace, validationConfig, buttonAvatar } from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Api from '../scripts/components/Api.js';

import './index.css';

// Без конструктора
// const api = new Api();
// api.getInitialCards().then((initialCards) => {
//   console.log(initialCards);
//   defaultCardList.renderItems(initialCards); // сюда будут приходить карточки с сервера
// });

// С конструктором
const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-61',
  '545040d2-ca8d-4af4-bb28-cd05a11607d7'
);
api.getInitialCards().then((initialCards) => {
  console.log(initialCards);
  defaultCardList.renderItems(initialCards); // сюда будут приходить карточки с сервера
});

function handleCardClick(name, link) {
  popupImage.open({name, link});
};

function handleTrashClick() {
  popupWithConfirmation.open();
};

function createCard(title, img) {
  const card = new Card({name: title, link: img}, '.template-card', handleCardClick); //handleTrashClick
  return card.generateCard();
};

// Вставим карточки из массива объектов в DOM
// const defaultCardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     defaultCardList.addItem(createCard(item.name, item.link));
//   },
// }, '.elements__box');
// defaultCardList.renderItems();

// Вставим карточки c сервера в DOM
const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem(createCard(item.name, item.link));
  },
}, '.elements__box');


const profileValidator = new FormValidator(validationConfig, popupFormUser);
profileValidator.enableValidation();
const сardValidator = new FormValidator(validationConfig, popupFormPlace);
сardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_modify_image');
popupImage.setEventListeners();

const profileUserInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle'});

const popupWithFormProfile = new PopupWithForm({
  popupSelector: '.popup_modify_user-info',
  handleFormSubmit: (data) => {
    profileUserInfo.setUserInfo({
      name: data.name,
      job: data.job
    });
    popupWithFormProfile.close();
  }
});
popupWithFormProfile.setEventListeners();

// Редактирование профиля
buttonEdit.addEventListener('click', () => {
  const profileData = profileUserInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  popupFormUser.reset();
  profileValidator.resetValidation();
  popupWithFormProfile.open();
});

const popupWithFormCard = new PopupWithForm({
  popupSelector: '.popup_modify_new-place',
  handleFormSubmit: (item) => {
    const newCard = createCard(item.name, item.link);
    defaultCardList.addItem(newCard);
    popupWithFormCard.close();
  }
});
popupWithFormCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupFormPlace.reset();
  сardValidator.resetValidation();
  popupWithFormCard.open();
});

// const popupWithConfirmation = new PopupWithConfirmation('.popup_modify_confirm');
// popupWithConfirmation.setEventListeners();



