import { buttonEdit, popupFormUser, nameInput, jobInput,
  buttonAdd, popupFormPlace, validationConfig, buttonAvatar, popupFormAvatar } from '../scripts/utils/constants.js';

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
.then(([serverCards, user]) => {
  currentUserId = user._id;
  profileUserInfo.setUserInfo(user);
  defaultCardList.renderItems(serverCards); // сюда будут приходить карточки с сервера
})
.catch((err) => {
  console.log(err);
});

// Вставим карточки c сервера в DOM
const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem(createCard(item));
  },
}, '.elements__box');

const handleConfirmDelete = (card) => {
  api.deleteCard(card.getId())
  .then(() => {
    card.deleteCard();
    popupWithConfirmDelete.close();
  })
  .catch((err) => {
    console.log(err);
  });
}

const createCard = (data) => {
  const card = new Card({
    data: data,
    currentUserId: currentUserId,
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
      api.dislike(card.getId())
      .then((data) => {
        card.handleLikeClick(data);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    handleTrashClick: () => {
      popupWithConfirmDelete.open(card);
    }
  }, '.template-card');
  return card.generateCard();
};

const profileValidator = new FormValidator(validationConfig, popupFormUser);
profileValidator.enableValidation();
const сardValidator = new FormValidator(validationConfig, popupFormPlace);
сardValidator.enableValidation();
const avatarValidator = new FormValidator(validationConfig, popupFormAvatar);
avatarValidator.enableValidation();

const popupWithConfirmDelete = new PopupWithConfirmation('.popup_modify_confirm', handleConfirmDelete);
popupWithConfirmDelete.setEventListeners();
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
    popupWithFormProfile.showLoading(true);
    api.updateUserInfo(data)
    .then((data) => {
      profileUserInfo.setUserInfo(data);
      popupWithFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormProfile.showLoading(false);
    })
  }
});
popupWithFormProfile.setEventListeners();

// Клик -> открытие попапа, заполнение инпутов
buttonEdit.addEventListener('click', () => {
  const profileData = profileUserInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  profileValidator.resetValidation();
  popupWithFormProfile.open();
});

const popupWithFormCard = new PopupWithForm({
  popupSelector: '.popup_modify_new-place',
  handleFormSubmit: (data) => {
    popupWithFormCard.showLoading(true);
    api.postNewCard(data)
    .then((data) => {
      defaultCardList.addItem(createCard(data));
      // закрытие после удачного ответа от сервера
      popupWithFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormCard.showLoading(false);
    })
  }
});
popupWithFormCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  сardValidator.resetValidation();
  popupWithFormCard.open();
});

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: '.popup_modify_avatar',
  handleFormSubmit: (data) => {
    popupWithFormAvatar.showLoading(true);
    api
    .updateAvatar(data)
    .then((res) => {
      profileUserInfo.setUserInfo(res)
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

buttonAvatar.addEventListener('click', () => {
  popupWithFormAvatar.open();
  avatarValidator.resetValidation();
});
