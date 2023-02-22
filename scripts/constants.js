const buttonEdit = document.querySelector('.profile__edit-button');
const popupUserInfo = document.querySelector('.popup_modify_user-info');
const popupFormUser = document.forms['formAboutUser'];
const nameInput = popupUserInfo.querySelector('.popup__input_type_name');
const jobInput = popupUserInfo.querySelector('.popup__input_type_job');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const popupNewPlace = document.querySelector('.popup_modify_new-place');
const buttonAdd = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__box');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.element');
const popupFormPlace = document.forms['formAboutPlace'];
const titlePlaceInput = popupNewPlace.querySelector('.popup__input_type_title-place');
const linkPlaceInput = popupNewPlace.querySelector('.popup__input_type_link-place');
const popupImage = document.querySelector('.popup_modify_image');
const picture = popupImage.querySelector('.popup__picture');
const pictureName = popupImage.querySelector('.popup__picture-name');
const popups = document.querySelectorAll('.popup')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export { popupImage, initialCards, buttonEdit, popupUserInfo, popupFormUser, nameInput, jobInput, userName,
  userJob, popupNewPlace, buttonAdd, cardsContainer, cardTemplate, popupFormPlace, titlePlaceInput,
  linkPlaceInput, picture, pictureName, popups, validationConfig };
