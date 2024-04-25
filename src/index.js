import './pages/index.css';
import './scripts/cards.js';
import { openModal, closeModal } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js';
import { createCard, deleteCard, cardToDeleteId, cardToDelete } from './components/card.js'
import { getInitialCards, getCurrentUser, editUser, editUserAvatar, addNewCard, removeCard } 
	from './components/api.js'

//константы
const mainContent = document.querySelector('.content');
const placesList = mainContent.querySelector('.places__list');
const buttonOpenAddCardForm = mainContent.querySelector('.profile__add-button');
const buttonProfileEditForm = mainContent.querySelector('.profile__edit-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupDelete = document.querySelector('.popup_delete');
const popupAvatar = document.querySelector('.popup_avatar_edit');

const closeEditPopup = popupEdit.querySelector('.popup__close');
const closeAddPopup = popupAdd.querySelector('.popup__close');
const closeImagePopup = popupImage.querySelector('.popup__close');
const closeDeletePopup = popupDelete.querySelector('.popup__close');
const closeAvatarPopup = popupAvatar.querySelector('.popup__close');

const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileAvatar = profile.querySelector('.profile__image');

const img = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

const confirmDeleteButton = popupDelete.querySelector('.popup__button');

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button'
}		

let currentUserId, cardData;

//формы
const profileForm = document.forms.editProfile;
const inputUserName = profileForm.elements.name;
const inputUserDescription = profileForm.elements.description;

const placeForm = document.forms.newPlace;
const placeName = placeForm.elements.placeName;
const link = placeForm.elements.link;

const avatarForm = document.forms.editAvatar;
const avatarLink = avatarForm.elements.avatar;

//слушатели
buttonProfileEditForm.addEventListener('click', function () {
	openModal(popupEdit);
	clearValidation(popupEdit, validationConfig);
	inputUserName.value = profileTitle.textContent;
	inputUserDescription.value = profileDescription.textContent;
});

buttonOpenAddCardForm.addEventListener('click', function () {
	openModal(popupAdd);
	clearValidation(popupAdd, validationConfig);
	placeForm.reset();
});

profileAvatar.addEventListener('click', function () {
	openModal(popupAvatar);
	clearValidation(popupAvatar, validationConfig);
	avatarForm.reset();

});

placeForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	addNewCard(placeName.value, link.value)
		.then((res) => {
			const createdCard = createCard(currentUserId, res, openModal, popupDelete, openCard);
			placesList.prepend(createdCard);
			closeModal(popupAdd);
		})
		.catch(error => console.log(error))
});

profileForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	editUser(inputUserName.value, inputUserDescription.value)
		.then((res) => {
			profileTitle.textContent = res.name;
			profileDescription.textContent = res.about;
			closeModal(popupEdit);
		})
		.catch(error => console.log(error))
});

avatarForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	editUserAvatar(avatarLink.value)
		.then((res) => {
			profileAvatar.style.backgroundImage = `url(${res.avatar})`;
			closeModal(popupAvatar);
		})
		.catch(error => console.log(error))
});

confirmDeleteButton.addEventListener('click', function () {
	removeCard(cardToDeleteId)
		.then(() => { 
			deleteCard(cardToDelete);
			closeModal(popupDelete);
		 })
		.catch(error => console.log(error))
});

closeEditPopup.addEventListener('click', () => { closeModal(popupEdit) });
closeAddPopup.addEventListener('click', () => { closeModal(popupAdd) });
closeImagePopup.addEventListener('click', () => { closeModal(popupImage) });
closeDeletePopup.addEventListener('click', () => { closeModal(popupDelete) });
closeAvatarPopup.addEventListener('click', () => { closeModal(popupAvatar) });

function openCard(evt) {
	const isImage = evt.target.classList.contains('card__image');
	if (isImage) { 
		const imgAlt = evt.target.alt;
		const imgSrc = evt.target.src;
		img.src = imgSrc;
		img.alt = imgAlt;
		caption.textContent = imgAlt;
		openModal(popupImage);
	}
}

//API
	Promise.all([getCurrentUser(), getInitialCards()])
		.then(([user, cards]) => {
				currentUserId = user._id;
				profileTitle.textContent = user.name;
				profileDescription.textContent = user.about;
				profileAvatar.style.backgroundImage = `url(${user.avatar})`;
				cardData = cards;
				for (let i = 0; i < cards.length; i++) {
					const createdCard = createCard(currentUserId, cardData[i], openModal, popupDelete, openCard);
					placesList.append(createdCard);
				}
		})
		.catch((err) => { 
						console.log(err);  
				})

enableValidation(validationConfig);
