import { buttonEdit, popupFormUser, nameInput, jobInput,
  buttonAdd, popupFormPlace, validationConfig, buttonAvatar } from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';


import './index.css';

const api = new Api({
  basePath: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '545040d2-ca8d-4af4-bb28-cd05a11607d7',
    'Content-Type': 'application/json'
  }
});

let currentUserId;

Promise.all([
  api.getServerCards(),
  api.getCurrentUser()
])
.then(([ServerCards, user]) => {
  console.log(ServerCards);
  console.log(user);
  currentUserId = user._id;
  userInfo.setUserInfo(user);
  defaultCardList.renderItems(ServerCards); // сюда будут приходить карточки с сервера
})
.catch((err) => {
  console.log(err);
});

// api.getInitialCards().then((initialCards) => {
//   console.log(initialCards);
//   defaultCardList.renderItems(initialCards); // сюда будут приходить карточки с сервера
// });

function createCard(data) {
  const card = new Card({
    data: data,
    currentUserId: profileUserInfo.getUserId(),
    handleCardClick: () => {
      popupImage.open(data);
    },
    handleAddLike: () => {
      api.like(card.getId())
      .then((data) => {
        card.handleLikeClick(data);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    handleDelLike: () => {
      api.disLike(card.getId())
      .then((data) => {
        card.handleLikeClick(data);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    handleTrashClick: () => {

    }
  }, '.template-card');
  return card.generateCard();
};

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
  userJobSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});

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

// Клик -> открытие попапа, заполнение инпутов
buttonEdit.addEventListener('click', () => {
  const profileData = profileUserInfo.getCurrentUser();
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

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: '.popup_modify_avatar',
  handleFormSubmit: (data) => {
    popupWithFormAvatar.showLoading(true);
    api
    .updateAvatar(data)
    .then((data) => {
      avatar.src = data.avatar;
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAvatar.showLoading(false);
    });
  }
})
popupWithFormAvatar.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation('.popup_modify_confirm');
popupWithConfirmation.setEventListeners();



