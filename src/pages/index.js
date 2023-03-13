import { initialCards, buttonEdit, popupFormUser, nameInput, jobInput,
  buttonAdd, popupFormPlace, validationConfig } from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

import './index.css';

function handleCardClick(name, link) {
  popupImage.open({name, link});
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

const popupWithFormProfile = new PopupWithForm({
  popupSelector: '.popup_modify_user-info',
  // объект, который мы передадим при вызове handleFormSubmit
  // окажется на месте параметра data
  handleFormSubmit: (data) => {
    profileUserInfo.setUserInfo({
      name: data.name,
      job: data.job
    });
    popupWithFormProfile.close();
  }
});
popupWithFormProfile.setEventListeners();

// Профиль. Открываем, подставляем данные в инпуты
buttonEdit.addEventListener('click', () => {
  const profileData = profileUserInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
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

buttonAdd.addEventListener('.click', () => {
  сardValidator.resetValidation();
  popupWithFormCard.open();
});

