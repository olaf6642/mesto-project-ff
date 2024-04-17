import './pages/index.css';
import './scripts/cards.js';
import { openModal, closeModal } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js';
import { createCard } from './components/card.js'
import { initialCards } from './scripts/cards.js'

//константы
const mainContent = document.querySelector('.content');
const placesList = mainContent.querySelector('.places__list');
const buttonOpenAddCardForm = mainContent.querySelector('.profile__add-button');
const buttonProfileEditForm = mainContent.querySelector('.profile__edit-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const closeEditPopup = popupEdit.querySelector('.popup__close');
const closeAddPopup = popupAdd.querySelector('.popup__close');
const closeImagePopup = popupImage.querySelector('.popup__close');

const profile = document.querySelector('.profile__info')
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

const img = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

//формы
const profileForm = document.forms.editProfile;
const inputUserName = profileForm.elements.name;
const inputUserDescription = profileForm.elements.description;

const placeForm = document.forms.newPlace;
const placeName = placeForm.elements.placeName;
const link = placeForm.elements.link;

//слушатели
buttonProfileEditForm.addEventListener('click', function () {
	openModal(popupEdit);
	clearValidation(popupEdit);
	const buttonElement = popupEdit.querySelector('.popup__button');
	buttonElement.classList.remove('popup__button-disabled');
	inputUserName.value = profileTitle.textContent;
	inputUserDescription.value = profileDescription.textContent;
});

buttonOpenAddCardForm.addEventListener('click', function () {
	openModal(popupAdd);
	clearValidation(popupAdd);
	placeForm.reset();
	enableValidation();
});

placeForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	const saveCard = createCard(placeName.value, link.value, openCard);
	placesList.prepend(saveCard);
	closeModal(popupAdd);
	
});

profileForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	editProfile();
	closeModal(popupEdit);
});

closeEditPopup.addEventListener('click', () => { closeModal(popupEdit) });
closeAddPopup.addEventListener('click', () => { closeModal(popupAdd) });
closeImagePopup.addEventListener('click', () => { closeModal(popupImage) });

//функции
function editProfile() {
	profileTitle.textContent = inputUserName.value;
	profileDescription.textContent = inputUserDescription.value;
}

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

//цикл предзаполнения
for (let i = 0; i < initialCards.length; i++) {
	const createdCard = createCard(initialCards[i].name, initialCards[i].link, openCard);
	placesList.append(createdCard);
}


enableValidation();
