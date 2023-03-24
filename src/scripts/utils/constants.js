const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__avatar-edit-button');
const popupUserInfo = document.querySelector('.popup_modify_user-info');
const nameInput = popupUserInfo.querySelector('.popup__input_type_name');
const jobInput = popupUserInfo.querySelector('.popup__input_type_job');
const popupFormUser = document.forms['formAboutUser'];
const popupFormPlace = document.forms['formAboutPlace'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export { buttonEdit, popupFormUser, nameInput, jobInput,
  buttonAdd, popupFormPlace, validationConfig, buttonAvatar };

