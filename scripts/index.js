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

export function handleCardClick(data) {
  popupImage.open(data);
}

// Экземпляры классов:

function createCard(item) {
  const card = new Card(item, '.template-card', handleCardClick);
  return card.generateCard();
};

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItems(createCard(item));
  },
}, '.elements__box');

defaultCardList.renderItems();

const profileValidator = new FormValidator(validationConfig, popupFormUser);
profileValidator.enableValidation();
const сardValidator = new FormValidator(validationConfig, popupFormPlace);
сardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_modify_image');
popupImage.setEventListeners();

// function addUserInfo()

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
    console.log(data);
    PopupWithFormProfile.close();
  }
});
PopupWithFormProfile.setEventListeners();

// Профиль. Подставляем данные в инпуты get
buttonEdit.addEventListener('click', () => {
  const profileData = profileUserInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  PopupWithFormProfile.open();
});

// Забираем из формы данные профиля set
function handleFormSubmitProfile () {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  PopupWithFormProfile.close();
};

const PopupWithFormCard = new PopupWithForm({
  popupSelector: '.popup_modify_new-place',
  handleFormSubmit: (data) => {

    // handleFormSubmitCard();
  }
});
PopupWithFormCard.setEventListeners();

// Забираем из формы данные новой карточки
function handleFormSubmitCard () {
  const objNewPlace = {name: titlePlaceInput.value, link: linkPlaceInput.value}
  cardsContainer.prepend(createCard(objNewPlace));
  PopupWithFormCard.close();
  popupFormPlace.reset();
};

// Новое место
buttonAdd.addEventListener('click', () => {
  PopupWithFormCard.open();
});


// popupFormUser.addEventListener('submit', handleFormSubmitProfile);
// popupFormPlace.addEventListener('submit', submitCard);


