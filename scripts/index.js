const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const editCloseButton = editPopup.querySelector('.popup__close-button');
const nameInput = editPopup.querySelector('.popup__field_type_name');
const jobInput = editPopup.querySelector('.popup__field_type_job');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const popupEditForm = document.querySelector('.popup__edit-form');

function closePopup () {
  editPopup.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', () => {
  editPopup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});

editCloseButton.addEventListener('click', closePopup);

popupEditForm.addEventListener('submit', handleFormSubmit);
