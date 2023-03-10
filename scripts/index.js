import { initialCards, buttonEdit, popupUserInfo, popupFormUser, nameInput, jobInput, userName, userJob,
  popupNewPlace, buttonAdd, cardsContainer, cardTemplate, popupFormPlace, titlePlaceInput, linkPlaceInput,
  popups, validationConfig } from './constants.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

function handleCardClick(data) {
  popupImage.open(data);
}

// Экземпляры классов:

function createCard(title, img) {
  const card = new Card({name: title, link: img}, '.template-card', handleCardClick);
  return card.generateCard();
};

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(createCard(item.name, item.link));
  },
}, '.elements__box');
defaultCardList.renderItems();

const profileValidator = new FormValidator(validationConfig, popupFormUser);
profileValidator.enableValidation();
const сardValidator = new FormValidator(validationConfig, popupFormPlace);
сardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_modify_image');
popupImage.setEventListeners();

const profileUserInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle'});

const PopupWithFormProfile = new PopupWithForm({
  popupSelector: '.popup_modify_user-info',
  // объект, который мы передадим при вызове handleFormSubmit
  // окажется на месте параметра data
  handleFormSubmit: (data) => {
    profileUserInfo.setUserInfo({
      name: data.name,
      job: data.job
    });
    PopupWithFormProfile.close();
  }
});
PopupWithFormProfile.setEventListeners();

// Профиль. Подставляем данные в инпуты
buttonEdit.addEventListener('click', () => {
  const profileData = profileUserInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  PopupWithFormProfile.open();
});

const PopupWithFormCard = new PopupWithForm({
  popupSelector: '.popup_modify_new-place',
  handleFormSubmit: (item) => {
    const newCard = createCard(item.name, item.link);
    defaultCardList.addItem(newCard);
    PopupWithFormCard.close();
  }
});
PopupWithFormCard.setEventListeners();
buttonAdd.addEventListener('.click', () => {PopupWithFormCard.open()});

// Новое место
buttonAdd.addEventListener('click', () => {
  PopupWithFormCard.open();
});
