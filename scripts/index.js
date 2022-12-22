const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const editCloseButton = editPopup.querySelector('.popup__close-button');
const submitButtonPopup = editPopup.querySelector('.popup__submit-button');
const nameInput = editPopup.querySelector('.popup__field_name');
const jobInput = editPopup.querySelector('.popup__field_job');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const popupEditForm = document.querySelector('.popup__edit-form');

editButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  editPopup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});

function closePopup () {
  editPopup.classList.remove('popup_opened');
};

editCloseButton.addEventListener('click', closePopup);

editPopup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget){
    closePopup();
  };
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
}

popupEditForm.addEventListener('submit', handleFormSubmit);





// editCloseButton.addEventListener('click', () => {
  // editPopup.classList.remove('popup_opened');
// });
