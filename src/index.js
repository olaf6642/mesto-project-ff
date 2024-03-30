import './pages/index.css';
import './scripts/cards.js';
import { openModal, closeModal } from './components/modal.js'
import { createCard, likeCard } from './components/card.js'
import { initialCards } from './scripts/cards.js'

//константы
const mainContent = document.querySelector('.content');
const placesList = mainContent.querySelector('.places__list');
const addButton = mainContent.querySelector('.profile__add-button');
const editButton = mainContent.querySelector('.profile__edit-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profile = document.querySelector('.profile__info')
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

const img = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

//формы
const profileForm = document.forms.editProfile;
const prName = profileForm.elements.name;
const prDescription = profileForm.elements.description;

const placeForm = document.forms.newPlace;
const placeName = placeForm.elements.placeName;
const link = placeForm.elements.link;

//слушатели
editButton.addEventListener('click', function () {
	openModal(popupEdit)
	prName.value = profileTitle.textContent;
	prDescription.value = profileDescription.textContent;
});

addButton.addEventListener('click', function () {
	openModal(popupAdd);
	placeForm.reset();
});

placeForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	const saveCard = createCard(placeName.value, link.value);
	placesList.prepend(saveCard);
	closeModal(popupAdd);
	
});

profileForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	editProfile();
	closeModal(popupEdit);
});

function editProfile() {
	profileTitle.textContent = prName.value;
	profileDescription.textContent = prDescription.value;
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
	const createdCard = createCard(initialCards[i].name, initialCards[i].link);
	placesList.append(createdCard);
}

export { openCard }